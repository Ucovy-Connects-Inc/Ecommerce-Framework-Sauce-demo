import { Page, Locator } from '@playwright/test';
import { config } from '../Utils/config';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
      this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigate() {
    await this.page.goto(config.baseURL);
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
   async isErrorMessageVisible() {
    return await this.errorMessage.isVisible();
  }

  async getErrorMessageText() {
    return await this.errorMessage.textContent();
  }
}
