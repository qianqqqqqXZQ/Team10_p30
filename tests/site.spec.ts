import { test, expect } from '@playwright/test';
import source from '../src/data/bid.generated.json' with { type: 'json' };
import { prototypeDefaults, prototypeExample, prototypeShots } from '../src/data/prototype';

test('prototype supports sample review, settings, export summary and reset', async ({ page }) => {
  await page.goto('/');
  const studio = page.locator('#prototype');
  const view = (name: string) => studio.getByRole('button', { name, exact: true });
  await expect(view('02 Storyboard')).toHaveAttribute('aria-pressed', 'true');
  await expect(studio.getByRole('group', { name: 'Storyboard shots' }).getByRole('button')).toHaveCount(6);
  for (let i = 0; i < prototypeShots.length; i++) {
    const shot = prototypeShots[i];
    const button = studio.getByRole('button', { name: `Shot ${shot.id}: ${shot.title}`, exact: true });
    await button.focus();
    await page.keyboard.press('Enter');
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(studio.locator('.studio-shot-detail')).toContainText(shot.action);
    await expect(studio.locator('.studio-preview')).toContainText(shot.subtitle);
    await expect(studio.locator('.studio-preview')).toContainText(`Shot ${shot.id} / 06`);
    await expect(studio.locator('.studio-preview svg')).toHaveAccessibleName(/traveller/);
  }
  const artwork = await studio.locator('.studio-preview svg').innerHTML();
  await studio.getByLabel('Story premise', { exact: true }).fill('A different story for a later film.');
  await studio.getByLabel('Genre', { exact: true }).selectOption('Sci-fi');
  await studio.getByLabel('Visual style', { exact: true }).selectOption('Graphic silhouette');
  await studio.getByLabel('Voiceover language').selectOption('Mandarin');
  expect(await studio.locator('.studio-preview svg').innerHTML()).toBe(artwork);
  await expect(studio.locator('.studio-audio')).toContainText('Mandarin');
  await view('01 Story').click();
  await expect(studio.locator('.studio-story-view')).toContainText(prototypeExample.premise);
  await expect(studio.locator('.studio-story-view li')).toHaveCount(6);
  await view('03 Export').focus();
  await page.keyboard.press('Space');
  const output = studio.locator('.studio-export-view');
  for (const text of ['48 seconds', '6 × 8 seconds', 'Sci-fi', 'Graphic silhouette', 'Mandarin', 'Embedded · English', 'Always on · AI-generated']) await expect(output).toContainText(text);
  await expect(studio.getByRole('button', { name: 'Download MP4' })).toBeDisabled();
  await expect(output).toContainText('Available in the proposed application');
  await studio.getByRole('button', { name: 'Reset example' }).click();
  await expect(view('02 Storyboard')).toHaveAttribute('aria-pressed', 'true');
  await expect(studio.getByRole('button', { name: 'Shot 01: Arrival' })).toHaveAttribute('aria-pressed', 'true');
  await expect(studio.getByLabel('Story premise', { exact: true })).toHaveValue(prototypeExample.premise);
  await expect(studio.getByLabel('Genre', { exact: true })).toHaveValue(prototypeDefaults.genre);
  await expect(studio.getByLabel('Visual style', { exact: true })).toHaveValue(prototypeDefaults.style);
  await expect(studio.getByLabel('Voiceover language')).toHaveValue(prototypeDefaults.language);
  await expect(studio.locator('.studio-audio')).toContainText('English');
});

test('all seven complete profiles, links and keyboard focus return', async ({ page }) => {
  await page.goto('/');
  for (let i = 0; i < source.members.length; i++) {
    const member = source.members[i];
    const selector = page.getByRole('button', { name: `${String(i + 1).padStart(2, '0')} ${member.name}`, exact: true });
    await selector.click();
    const trigger = page.getByRole('button', { name: `${member.name}, ${member.role}. Read full profile`, exact: true });
    await trigger.click();
    const dialog = page.getByRole('dialog');
    await expect(dialog.getByRole('heading', { name: member.name, exact: true })).toBeVisible();
    await expect(dialog).toContainText(member.email);
    if (member.studentId) await expect(dialog).toContainText(member.studentId);
    await expect(dialog).toContainText(member.responsibility);
    if (i === 0) {
      await expect(dialog.getByRole('link', { name: 'Project repository' })).toHaveCount(2);
      await expect(dialog).toContainText('under submission to CVIU');
      await expect(dialog).toContainText('remain under evaluation');
    }
    if (i === 2) await expect(dialog).toContainText('accepted by an international journal');
    await page.keyboard.press('Shift+Tab');
    expect(await page.evaluate(() => document.activeElement?.closest('dialog') !== null)).toBeTruthy();
    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
    await expect(trigger).toBeFocused();
  }
});

test('Vue timeline exposes all nine date ranges and correct low-workload plan', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('[data-framework="vue"]')).toHaveCount(1);
  const tabs = page.getByRole('tab');
  await expect(tabs).toHaveCount(9);
  for (let i = 0; i < 9; i++) {
    await tabs.nth(i).click();
    await expect(tabs.nth(i)).toHaveAttribute('aria-selected', 'true');
    await expect(page.getByRole('tabpanel')).toContainText(source.phases[i].date);
    for (const task of source.phases[i].tasks) await expect(page.getByRole('tabpanel')).toContainText(task);
  }
  await tabs.nth(4).click();
  await expect(page.getByRole('tabpanel')).toContainText('At most one small asynchronous task per member per week');
  await page.keyboard.press('Home');
  await expect(tabs.nth(0)).toBeFocused();
  await expect(tabs.nth(0)).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('ArrowDown');
  await expect(tabs.nth(1)).toBeFocused();
  await expect(tabs.nth(1)).toHaveAttribute('aria-selected', 'true');
});

test('full bid and expandable proposal retain source content', async ({ page }) => {
  await page.goto('/');
  await page.locator('.header-bid').click();
  const dialog = page.getByRole('dialog');
  await expect(dialog.locator('.full-bid h2')).toHaveCount(5);
  for (const member of source.members) await expect(dialog).toContainText(member.intro);
  for (const phase of source.phases) for (const task of phase.tasks) await expect(dialog).toContainText(task);
  await dialog.getByRole('button', { name: '04 Timeline & Workflow ↗' }).click();
  await expect(dialog.getByRole('heading', { name: 'Timeline & Workflow and Work Distribution', exact: true })).toBeInViewport();
  await page.keyboard.press('Escape');
  const summary = page.locator('summary').filter({ hasText: 'Technology stack, evaluation & delivery' });
  await summary.click();
  await expect(summary.locator('..')).toContainText('Neither visual metric alone will establish film quality.');
});

for (const width of [1440, 1024, 768, 390]) {
  test(`layout and visual QA at ${width}px`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
    page.on('response', (response) => { if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`); });
    await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
    await page.goto('/');
    await page.evaluate(() => document.fonts.ready);
    for (const id of ['team', 'design', 'timeline', 'why-us', 'prototype']) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await page.waitForTimeout(100);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await expect.poll(() => page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const imageStates = await page.locator('img').evaluateAll((images) => images.map((element) => { const img = element as HTMLImageElement; return { src: img.src, complete: img.complete, width: img.naturalWidth }; }));
    expect(imageStates.filter((img) => img.complete && img.width === 0)).toEqual([]);
    await page.screenshot({ path: `qa/site-${width}.png`, fullPage: true });
    await page.screenshot({ path: `qa/hero-${width}.png` });
    await page.locator('#team').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `qa/team-${width}.png` });
    await page.locator('.scope-heading').evaluate((element) => element.scrollIntoView({ block: 'start', behavior: 'instant' }));
    await page.screenshot({ path: `qa/design-${width}.png` });
    await page.locator('#timeline').scrollIntoViewIfNeeded();
    await page.screenshot({ path: `qa/timeline-${width}.png` });
    const studio = page.locator('#prototype');
    await studio.scrollIntoViewIfNeeded();
    await studio.screenshot({ path: `qa/prototype-${width}.png` });
    for (const viewName of ['01 Story', '03 Export']) {
      await studio.getByRole('button', { name: viewName, exact: true }).click();
      expect(await studio.locator('.prototype-shell').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
      await studio.screenshot({ path: `qa/prototype-${viewName === '01 Story' ? 'story' : 'export'}-${width}.png` });
    }
    await studio.getByRole('button', { name: 'Reset example' }).click();
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
    const profile = page.getByRole('button', { name: `${source.members[0].name}, ${source.members[0].role}. Read full profile`, exact: true });
    for (const kind of ['profile', 'bid'] as const) {
      await (kind === 'profile' ? profile : page.locator('.header-bid')).click();
      const dialog = page.getByRole('dialog');
      await expect(dialog).toBeVisible();
      const bounds = (await dialog.boundingBox())!;
      const viewport = page.viewportSize()!;
      expect(Math.abs(bounds.x + bounds.width / 2 - viewport.width / 2)).toBeLessThan(2);
      expect(Math.abs(bounds.y + bounds.height / 2 - viewport.height / 2)).toBeLessThan(2);
      expect(bounds.x).toBeGreaterThan(0);
      expect(bounds.y).toBeGreaterThan(0);
      expect(await dialog.locator('.reading-shell').evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true);
      await page.screenshot({ path: `qa/reading-${kind}-${width}.png` });
      await dialog.getByRole('button', { name: 'Close reading panel' }).click();
      await expect(dialog).toHaveCount(0);
    }
    if (width < 768) {
      await page.evaluate(() => window.scrollTo(0, 0));
      const menu = page.getByRole('button', { name: 'Menu +' });
      await menu.click();
      await expect(page.getByRole('navigation', { name: 'Mobile navigation' })).toBeVisible();
      await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: '05 Prototype ↗' }).click();
      await expect(menu).toHaveAttribute('aria-expanded', 'false');
      await expect(studio.getByRole('heading', { name: 'PROTOTYPE.' })).toBeInViewport();
    }
    expect(errors).toEqual([]);
  });
}

test('animated desktop scroll and failed-image fallback remain usable', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.route('**/images/cinema-01.jpg', (route) => route.abort());
  await page.goto('/');
  await page.waitForTimeout(1600);
  await expect(page.locator('.image-unavailable')).toHaveCount(1);
  await page.screenshot({ path: 'qa/hero-animated.png' });
  await page.locator('.desktop-nav a[href="#timeline"]').click();
  await expect(page.locator('#timeline h2')).toBeInViewport({ timeout: 15_000 });
  await page.getByRole('tab').nth(8).click();
  await expect(page.getByRole('tabpanel')).toContainText('1 April 2027');
  await page.locator('.desktop-nav a[href="#prototype"]').click();
  await expect(page.locator('#prototype h2')).toBeInViewport({ timeout: 15_000 });
  await expect(page.locator('.desktop-nav a[href="#prototype"]')).toHaveAttribute('aria-current', 'location');
  await page.getByRole('button', { name: 'Shot 03: A small light' }).click();
  await expect(page.locator('.studio-preview')).toContainText('One small light was enough to begin.');
  await page.locator('.footer-read').click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  expect(errors).toEqual([]);
});
