import { Page, Locator } from '@playwright/test';

export class SignupPage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly signUpLink: Locator;
  readonly emailInput: Locator;
  readonly consentCheckbox: Locator;
  readonly signUpButton: Locator;
  readonly passwordInput: Locator;
  readonly verificationCodeText: Locator;
  readonly requiredError: Locator;
  readonly invalidEmailError: Locator;
  readonly weakPasswordError: Locator;
  readonly captchaInput: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginLink = page.getByRole('link', { name: 'Log In' });
    this.signUpLink = page.getByRole('link', { name: 'Sign up' });
    this.emailInput = page.getByRole('textbox', { name: 'Email address' });

    this.consentCheckbox = page.getByRole('checkbox', {
      name: 'By checking this box, I/We',
    });

    this.signUpButton = page.getByRole('button', { name: 'Sign up' });
    this.passwordInput = page.getByLabel('Password *');

    this.verificationCodeText = page.getByText('Enter verification code');
    this.requiredError = page
      .getByText('This is required', { exact: true })
      .filter({ visible: true });
    this.invalidEmailError = page
      .getByText('Email is not valid.', { exact: true })
      .filter({ visible: true });
    this.weakPasswordError = page
      .getByText('The password is too weak', { exact: true })
      .filter({ visible: true });
    this.captchaInput = page.getByRole('textbox', {
      name: 'Enter the code shown above',
    });
  }

  async openSignupPage() {
    await this.page.goto('/');
    await this.loginLink.click();
    await this.signUpLink.click();
  }

  async submitEmail(email: string) {
    await this.fillEmail(email);
    await this.acceptConsent();
    await this.clickSignUp();
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async acceptConsent() {
    await this.consentCheckbox.focus();
    await this.consentCheckbox.press('Space');
  }

  async clickSignUp() {
    await this.signUpButton.click();
  }

  async createAccount(password: string) {
    await this.passwordInput.or(this.captchaInput).waitFor({ state: 'visible' });

    if (await this.captchaInput.isVisible()) {
      throw new Error(
        'Signup was blocked by Auth0 CAPTCHA. Retry after a cooldown period.'
      );
    }

    await this.passwordInput.fill(password);
    await this.clickSignUp();
  }
}
