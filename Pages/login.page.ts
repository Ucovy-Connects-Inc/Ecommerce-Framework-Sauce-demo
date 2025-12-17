import { Page, Locator } from '@playwright/test';
import { WaitUtils } from '../utils/waitUtils';

export class LoginPage {
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  private wait: WaitUtils;

  constructor(private page: Page) {
    this.wait = new WaitUtils(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.wait.fill(this.usernameInput, username);
    await this.wait.fill(this.passwordInput, password);
    await this.wait.click(this.loginButton);
  }
}
