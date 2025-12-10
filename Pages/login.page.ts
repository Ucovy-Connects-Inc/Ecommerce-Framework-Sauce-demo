// pages/login.page.ts
import { Page, Locator } from '@playwright/test';
import { WaitUtils } from '../Utils/WaitUtils';

export class LoginPage {
  private waitUtils: WaitUtils;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(private page: Page) {
    this.waitUtils = new WaitUtils(page);
    this.usernameInput = page.locator('#user-name');
    this.passwordInput = page.locator('#password');
    this.loginButton = page.locator('#login-button');
  }

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.waitUtils.fillWithWait(this.usernameInput, username);
    await this.waitUtils.fillWithWait(this.passwordInput, password);
    await this.waitUtils.clickWithWait(this.loginButton);
  }
}
