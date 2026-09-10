import { test, expect } from '@playwright/test';

import { SignupPage } from '../../src/pages/SignupPages';
import { generateSignupUser } from '../../src/data/userFactory';

test.describe('Signup', () => {

  test('Signup successfully until email verification', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const user = generateSignupUser();

    await signupPage.openSignupPage();

    await signupPage.submitEmail(user.email);

    await signupPage.createAccount(user.password);

    await expect(
      signupPage.verificationCodeText.or(signupPage.captchaInput)
    ).toBeVisible();

    if (await signupPage.captchaInput.isVisible()) {
      throw new Error(
        'Signup was blocked by Auth0 CAPTCHA. Retry after a cooldown period.'
      );
    }

    await expect(signupPage.verificationCodeText).toBeVisible();
  });

  test('Show validation when email format is invalid', async ({ page }) => {
    const signupPage = new SignupPage(page);

    await signupPage.openSignupPage();
    await signupPage.submitEmail('invalid-email');

    await expect(signupPage.invalidEmailError).toBeVisible();
    await expect(signupPage.emailInput).toBeVisible();
  });

  test('Show validation when consent is not checked', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const user = generateSignupUser();

    await signupPage.openSignupPage();
    await signupPage.fillEmail(user.email);
    await signupPage.clickSignUp();

    await expect(signupPage.requiredError).toBeVisible();
    await expect(signupPage.emailInput).toBeVisible();
  });

  test('Show validation when password does not meet requirements', async ({ page }) => {
    const signupPage = new SignupPage(page);
    const user = generateSignupUser();

    await signupPage.openSignupPage();
    await signupPage.submitEmail(user.email);
    await signupPage.createAccount('weak');

    await expect(signupPage.weakPasswordError).toBeVisible();
    await expect(signupPage.passwordInput).toBeVisible();
    await expect(signupPage.verificationCodeText).toBeHidden();
  });

});
