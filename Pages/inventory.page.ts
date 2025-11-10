import { Page, Locator, expect } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly firstProductAddToCartBtn: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstProductAddToCartBtn = page.locator('.inventory_item button').first();
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async verifyOnInventoryPage() {
    await this.page.waitForSelector('.inventory_item button', { state: 'visible', timeout: 10000 });
    await expect(this.page).toHaveURL(/inventory.html/);
  }

  async addFirstProductToCart() {
    await this.firstProductAddToCartBtn.click();
  }

  async isProductAdded() {
    return await this.cartBadge.isVisible();
  }

  async goToCart() {
    await this.page.click('.shopping_cart_link');
    await expect(this.page).toHaveURL(/cart.html/);
  }
}
