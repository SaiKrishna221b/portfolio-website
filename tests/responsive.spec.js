import { test, expect } from '@playwright/test';

test('all sections fit the screen without clipping their content', async ({ page }) => {
  test.setTimeout(90000);
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByRole('heading', { name: 'G Sai Krishna', exact: true })).toBeVisible();
  const targets = page.locator('.card-section, .section-content, .hero-container, .nav-link, .card, .education-card, .tab, .tab-content, .radar-chart, .info-card, .mobile-skills li');
  for (const target of await targets.all()) {
    if (!await target.isVisible()) continue;
    await target.evaluate(el => el.scrollIntoView({ block: 'center', behavior: 'instant' }));
    // Each card animates on entering the viewport; measure its settled layout.
    await expect.poll(() => target.evaluate(el => {
      const rect = el.getBoundingClientRect();
      const hasTextContent = el.matches('.nav-link, .card, .education-card, .tab, .tab-content, .info-card, .mobile-skills li');
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

test('skills remain readable on phones and chart scales on larger screens', async ({ page }) => {
  await page.goto('/', { waitUntil: 'domcontentloaded' });
  if (page.viewportSize().width <= 600) {
    await expect(page.getByRole('list', { name: 'Technical skills' })).toBeVisible();
    await expect(page.locator('.mobile-skills li')).toHaveCount(6);
    await expect(page.locator('.radar-chart')).toBeHidden();
  } else {
    await expect(page.locator('.radar-chart')).toBeVisible();
    await expect(page.locator('.mobile-skills')).toBeHidden();
  }
});
