import { test, expect } from '@playwright/test';

test('all sections fit the screen without clipping their content', async ({ page }) => {
  test.setTimeout(90000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { name: 'G Sai Krishna', exact: true })).toBeVisible();
  const targets = page.locator('.card-section, .section-content, .hero-container, .nav-link, .card, .education-card, .tab, .tab-content, .radar-chart, .info-card, .radar-skill-details li');
  for (const target of await targets.all()) {
    if (!await target.isVisible()) continue;
    await target.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
    // Each card animates on entering the viewport; measure its settled layout.
    await expect.poll(() => target.evaluate(el => {
      const rect = el.getBoundingClientRect();
      const hasTextContent = el.matches('.nav-link, .card, .education-card, .tab, .tab-content, .info-card, .radar-skill-details li');
      return rect.left >= -1 && rect.right <= innerWidth + 1 && (!hasTextContent || el.scrollWidth <= el.clientWidth + 1);
    }), { message: `Content fits: ${await target.getAttribute('class')}`, timeout: 5000 }).toBe(true);
  }
  expect(errors).toEqual([]);
});

test('section navigation and experience controls work', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await page.getByRole('link', { name: 'About Me', exact: true }).click();
  await expect(page.locator('#about')).toBeInViewport();
  await page.locator('.hero').scrollIntoViewIfNeeded();
  await page.getByRole('link', { name: 'Experience', exact: true }).click();
  await expect(page.locator('#experience')).toBeInViewport();
  await page.locator('.tab').filter({ hasText: 'Software Engineer – Nike EU' }).click();
  await expect(page.locator('.experience-details h3')).toHaveText('Software Engineer – Nike EU');
  await page.getByRole('button', { name: 'Non-Tech', exact: true }).click();
  await expect(page.locator('.achievements')).toContainText('90,000+');
  await page.getByRole('button', { name: 'Tech Savvy', exact: true }).click();
  await expect(page.locator('.achievements')).toContainText('GraphQL');
});

test('contact menu opens and closes with taps and keyboard', async ({ page, hasTouch }) => {
  const activate = locator => hasTouch ? locator.tap() : locator.click();
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const trigger = page.getByRole('button', { name: "Let's Connect" });
  await activate(trigger);
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('link', { name: 'Email', exact: false })).toBeVisible();
  await activate(trigger);
  await expect(page.getByRole('link', { name: 'Email', exact: false })).toBeHidden();
  await activate(trigger);
  // Tap the left edge, outside the right-aligned dropdown (which covers the hero title).
  if (hasTouch) await page.touchscreen.tap(5, page.viewportSize().height - 10);
  else await page.mouse.click(5, page.viewportSize().height - 10);
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await trigger.focus();
  await page.keyboard.press('Enter');
  await expect(trigger).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
});

test('radar graph preserves all six skills on phones and larger screens', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const chart = page.getByRole('img', { name: 'Technical skills radar chart' });
  await expect(chart).toBeVisible();
  await expect(chart.locator('circle')).toHaveCount(6);
  await expect(chart.locator('line')).toHaveCount(6);
  await expect(chart.locator('path')).toHaveCount(6);
  await expect(page.getByRole('meter')).toHaveCount(0);
  const names = ['Backend Engineering', 'DevOps and CI/CD', 'Cloud Services', 'Machine Learning', 'Databases', 'Product Sense'];
  if (page.viewportSize().width <= 600) {
    await expect(page.locator('.radar-chart-compact')).toBeVisible();
    await expect(page.locator('.radar-skill-details h3')).toHaveText(names);
    const labels = await chart.locator('text').evaluateAll(nodes => nodes.map(el => [...el.querySelectorAll('tspan')].map(tspan => tspan.textContent).join(' ')));
    expect(labels).toEqual(names);
    const clippedLabels = await chart.evaluate(svg => {
      const bounds = svg.getBoundingClientRect();
      return [...svg.querySelectorAll('text')].filter(el => {
        const rect = el.getBoundingClientRect();
        return rect.left < bounds.left - 1 || rect.right > bounds.right + 1 || rect.top < bounds.top - 1 || rect.bottom > bounds.bottom + 1;
      }).map(el => el.textContent);
    });
    expect(clippedLabels).toEqual([]);
  } else {
    await expect(page.locator('.radar-chart-full')).toBeVisible();
    const labels = await chart.locator('g').evaluateAll(nodes => nodes.map(el => el.querySelector('text').textContent));
    expect(labels).toEqual(names);
  }
  await expect(page.locator('.info-card').first()).toContainText('Learning experience at Cognizant Technology Solutions');
  await expect(page.locator('.info-card').first()).not.toContainText('2+ years');
});

test('starfield is visible behind the hero and keeps animating', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  const canvas = page.locator('canvas.space-background');
  await expect(canvas).toHaveCount(1);
  await expect(canvas).toBeVisible();
  const firstFrame = await canvas.evaluate(el => el.toDataURL());
  await expect.poll(() => canvas.evaluate(el => el.toDataURL())).not.toBe(firstFrame);
  // Remove text from this screenshot so bright pixels must come from the starfield,
  // not headings. This checks the composited page, catching a canvas hidden behind it.
  await page.addStyleTag({ content: '.hero-container, .connect-container { visibility: hidden !important; }' });
  const viewport = page.viewportSize();
  const screenshot = await page.screenshot({ clip: { x: 0, y: 80, width: viewport.width, height: Math.min(viewport.height - 100, 500) } });
  const brightPixels = await page.evaluate(async data => {
    const image = new Image();
    image.src = `data:image/png;base64,${data}`;
    await image.decode();
    const sample = document.createElement('canvas');
    sample.width = image.width;
    sample.height = image.height;
    const ctx = sample.getContext('2d');
    ctx.drawImage(image, 0, 0);
    const pixels = ctx.getImageData(0, 0, sample.width, sample.height).data;
    let bright = 0;
    for (let i = 0; i < pixels.length; i += 4) {
      if (Math.max(pixels[i], pixels[i + 1], pixels[i + 2]) > 100) bright++;
    }
    return bright;
  }, screenshot.toString('base64'));
  expect(brightPixels).toBeGreaterThan(100);
});
