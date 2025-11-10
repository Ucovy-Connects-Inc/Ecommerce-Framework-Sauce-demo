import { Page, Locator, expect } from '@playwright/test';

export class CheckoutPage {
  readonly page: Page;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly continueButton: Locator;
  readonly finishButton: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.locator('#first-name');
    this.lastNameInput = page.locator('#last-name');
    this.postalCodeInput = page.locator('#postal-code');
    this.continueButton = page.locator('#continue');
    this.finishButton = page.locator('#finish');
    this.confirmationMessage = page.locator('.complete-header'); // "THANK YOU FOR YOUR ORDER"
  }

  async proceedToCheckout(firstName: string, lastName: string, postalCode: string) {
    await this.page.click('#checkout');
    await expect(this.page).toHaveURL(/checkout-step-one.html/);
    await this.fillCheckoutInformation(firstName, lastName, postalCode);
    await expect(this.page).toHaveURL(/checkout-step-two.html/);
    await this.finishCheckout();
  }

  async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
    await this.continueButton.click();
  }

  async finishCheckout() {
    await this.finishButton.click();
  }

  async isOrderConfirmed() {
    return this.confirmationMessage.isVisible();
  }
}
