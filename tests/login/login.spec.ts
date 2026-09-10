import { test, expect } from '@playwright/test';
import { LoginPage } from '../../src/pages/LoginPages';
import { credentials } from '../../src/data/credentials';

test.describe('Login', () => {
  test('Login successfully with valid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();

    await loginPage.login(
      credentials.validUser.email,
      credentials.validUser.password
    );

    await expect(page).toHaveURL(/app\.sleekflow\.io\/en\/inbox/);
  });

  test('Show error message when login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();

    await loginPage.login(
      credentials.invalidUser.email,
      credentials.invalidUser.password
    );

    await expect(loginPage.wrongPasswordError).toBeVisible();
  });

  test('show error message when login with wrong credential', async ({page}) => {
    const loginPage = new LoginPage(page);

    await loginPage.openLoginPage();

    await loginPage.login(
        credentials.validUser.email,
        credentials.invalidUser.password
    );

    await expect(loginPage.wrongPasswordError).toBeVisible();
  })
});