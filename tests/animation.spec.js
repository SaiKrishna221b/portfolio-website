import { test, expect } from '@playwright/test';

async function trackCanvasWork(page) {
  await page.addInitScript(() => {
    window.__canvasWork = { gradients: 0, frames: 0 };
    const gradient = CanvasRenderingContext2D.prototype.createRadialGradient;
    CanvasRenderingContext2D.prototype.createRadialGradient = function (...args) {
      window.__canvasWork.gradients++;
      return gradient.apply(this, args);
    };
    const fill = CanvasRenderingContext2D.prototype.fillRect;
    CanvasRenderingContext2D.prototype.fillRect = function (...args) {
      if (this.canvas.classList.contains('space-background')) window.__canvasWork.frames++;
      return fill.apply(this, args);
    };
  });
}

async function nextFrames(page, count = 5) {
  await page.evaluate(count => new Promise(resolve => {
    const step = () => { if (--count === 0) resolve(); else requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }), count);
}

test('navigation appears promptly and animated stars reuse their gradients', async ({ page }) => {
  await trackCanvasWork(page);
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('.nav-links')).toBeVisible();
  await expect.poll(() => page.locator('.nav-links').evaluate(el => Number(getComputedStyle(el).opacity)), { timeout: 1200 }).toBeGreaterThan(0.99);
  await expect.poll(() => page.evaluate(() => window.__canvasWork.frames)).toBeGreaterThan(5);
  const before = await page.evaluate(() => ({ ...window.__canvasWork }));
  await expect.poll(() => page.evaluate(() => window.__canvasWork.frames)).toBeGreaterThan(before.frames + 5);
  // Rendering must continue without allocating a fresh gradient for every star.
  expect(await page.evaluate(() => window.__canvasWork.gradients)).toBe(before.gradients);
});

test('hidden backgrounds stop repainting and reduced motion keeps a static starfield', async ({ page }) => {
  await trackCanvasWork(page);
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect.poll(() => page.evaluate(() => window.__canvasWork.frames)).toBeGreaterThan(5);
  await page.locator('.info-card').last().evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
  await nextFrames(page);
  const away = await page.evaluate(() => window.__canvasWork.frames);
  await nextFrames(page);
  expect(await page.evaluate(() => window.__canvasWork.frames)).toBe(away);

  await page.locator('.hero').evaluate(el => el.scrollIntoView({ block: 'start', behavior: 'instant' }));
  await expect.poll(() => page.evaluate(() => window.__canvasWork.frames)).toBeGreaterThan(away + 3);
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await nextFrames(page);
  const still = await page.evaluate(() => window.__canvasWork.frames);
  const image = await page.locator('canvas.space-background').evaluate(el => el.toDataURL());
  await nextFrames(page);
  expect(await page.evaluate(() => window.__canvasWork.frames)).toBe(still);
  expect(await page.locator('canvas.space-background').evaluate(el => el.toDataURL())).toBe(image);
  await expect(page.getByRole('button', { name: "Let's Connect" })).toBeVisible();
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await expect.poll(() => page.evaluate(() => window.__canvasWork.frames)).toBeGreaterThan(still + 3);
});

test('phone density survives rotation without resetting the stars', async ({ page, hasTouch }, testInfo) => {
  await page.addInitScript(() => {
    // Place every star inside the viewport so drawing counts reflect the full
    // population, including both cached sprites and batched subpixel points.
    Math.random = () => 0.5;
    const fill = CanvasRenderingContext2D.prototype.fillRect;
    CanvasRenderingContext2D.prototype.fillRect = function (...args) {
      if (this.canvas.classList.contains('space-background')) {
        window.__starFrame = { count: 0, firstX: null, width: this.canvas.width };
      }
      return fill.apply(this, args);
    };
    const record = (x, width) => {
      const frame = window.__starFrame;
      if (!frame) return;
      frame.count++;
      if (frame.firstX === null) frame.firstX = (x + width / 2) / frame.width;
    };
    const draw = CanvasRenderingContext2D.prototype.drawImage;
    CanvasRenderingContext2D.prototype.drawImage = function (...args) {
      if (this.canvas.classList.contains('space-background')) record(args[1], args[3]);
      return draw.apply(this, args);
    };
    const rect = Path2D.prototype.rect;
    Path2D.prototype.rect = function (...args) {
      record(args[0], args[2]);
      return rect.apply(this, args);
    };
  });
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const expected = ['desktop', 'tablet'].includes(testInfo.project.name) ? 900 : 300;
  await expect.poll(() => page.evaluate(() => window.__starFrame?.count)).toBe(expected);
  await nextFrames(page, 12);
  const before = await page.evaluate(() => ({ ...window.__starFrame }));
  const viewport = page.viewportSize();
  await page.setViewportSize({ width: viewport.height, height: viewport.width });
  await expect.poll(() => page.evaluate(() => window.__starFrame?.width)).toBe(viewport.height);
  await expect.poll(() => page.evaluate(() => window.__starFrame?.count)).toBe(expected);
  // These stars move left as they approach. Resetting their depth would make
  // their normalized position jump right to the initial value after rotation.
  await expect.poll(() => page.evaluate(() => window.__starFrame.firstX)).toBeLessThan(before.firstX);
  if (!hasTouch) {
    await page.setViewportSize({ width: 430, height: 932 });
    await expect.poll(() => page.evaluate(() => window.__starFrame?.width)).toBe(430);
    expect(await page.evaluate(() => window.__starFrame.count)).toBe(900);
  }
});
