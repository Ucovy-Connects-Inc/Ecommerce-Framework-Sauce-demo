import { Page, Locator } from '@playwright/test';
import { WaitUtils } from '../Utils/WaitUtils';

export class CheckoutPage {
  private waitUtils: WaitUtils;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly confirmationMessage: Locator;

  constructor(private page: Page) {
    this.waitUtils = new WaitUtils(page);
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.confirmationMessage = page.locator('.complete-header');
  }

  async startCheckout() {
    await this.waitUtils.clickWithWait(this.page.locator('#checkout'));
  }

  async fillCheckoutInformation(data: { firstName: string; lastName: string; postalCode: string }) {
    await this.waitUtils.fillWithWait(this.firstNameInput, data.firstName);
    await this.waitUtils.fillWithWait(this.lastNameInput, data.lastName);
    await this.waitUtils.fillWithWait(this.postalCodeInput, data.postalCode);
    await this.waitUtils.clickWithWait(this.continueButton);
  }

  async finishCheckout() {
    await this.waitUtils.clickWithWait(this.finishButton);
  }

  async waitForConfirmation() {
    await this.waitUtils.waitForVisible(this.confirmationMessage, WaitUtils.LONG);
  }
}
