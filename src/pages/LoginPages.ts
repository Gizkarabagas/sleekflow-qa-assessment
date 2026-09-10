import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly loginLink: Locator;
  readonly emailInput: Locator;
  readonly continueButton: Locator;
  readonly passwordInput: Locator;
  readonly signInButton: Locator;
  readonly errormessage: Locator;
  readonly wrongPasswordError: Locator;
  readonly captchaInput: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginLink = page.getByRole('link', { name: 'Log In' });
    this.emailInput = page.getByRole('textbox', { name: 'Email or username' });
    this.continueButton = page.getByRole('button', { name: 'Continue', exact: true });
    this.passwordInput = page.getByRole('textbox', { name: 'Password' });
    this.signInButton = page.getByRole('button', { name: 'Sign in' });
    this.errormessage = page.locator('#error-cs-password-required');
    this.wrongPasswordError = page.getByText('Wrong username or password');
    this.captchaInput = page.getByRole('textbox', {
      name: 'Enter the code shown above',
    });
  }

  async openLoginPage() {
    await this.page.goto('/');
    await this.loginLink.click();
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
    await this.continueButton.click();
  }

  async enterPassword(password: string) {
    await this.passwordInput.or(this.captchaInput).waitFor({ state: 'visible' });

    if (await this.captchaInput.isVisible()) {
      throw new Error(
        'Login was blocked by Auth0 CAPTCHA. Retry after a cooldown period.'
      );
    }

    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  async login(email: string, password: string) {
    await this.enterEmail(email);
    await this.enterPassword(password);
  }
}
