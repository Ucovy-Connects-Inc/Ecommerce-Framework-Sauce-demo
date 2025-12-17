import { Page, Locator } from '@playwright/test';
import { WaitUtils } from '../utils/waitUtils';

export class CheckoutPage {
  readonly checkoutButton: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly confirmationMessage: Locator;
  private wait: WaitUtils;

  constructor(private page: Page) {
    this.wait = new WaitUtils(page);

    this.checkoutButton = page.locator('#checkout');
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.confirmationMessage = page.locator('.complete-header');
  }

  async startCheckout() {
    await this.wait.click(this.checkoutButton);
  }

  async fillCheckoutInformation(data: {
    firstName: string;
    lastName: string;
    postalCode: string;
  }) {
    await this.wait.fill(this.firstNameInput, data.firstName);
    await this.wait.fill(this.lastNameInput, data.lastName);
    await this.wait.fill(this.postalCodeInput, data.postalCode);
    await this.wait.click(this.continueButton);
  }

  async finishCheckout() {
    await this.wait.click(this.finishButton);
  }

  async waitForConfirmation() {
    await this.wait.waitForVisible(this.confirmationMessage, WaitUtils.LONG);
  }
}
