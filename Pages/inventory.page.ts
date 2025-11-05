import { Page, Locator } from '@playwright/test';

export class InventoryPage {
  readonly page: Page;
  readonly firstProductAddToCartBtn: Locator;
  readonly cartBadge: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstProductAddToCartBtn = page.locator('.inventory_item button').first();
    this.cartBadge = page.locator('.shopping_cart_badge');
  }

  async addFirstProductToCart() {
     await this.firstProductAddToCartBtn.waitFor({ state: 'visible', timeout: 5000 });
    await this.firstProductAddToCartBtn.click();
  }

  async isProductAdded() {
    return await this.cartBadge.isVisible();
  }
}
