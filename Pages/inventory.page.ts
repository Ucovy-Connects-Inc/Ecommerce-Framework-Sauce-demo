import { Page, Locator } from '@playwright/test';
import { WaitUtils } from '../Utils/WaitUtils';

export class InventoryPage {
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly firstAddToCartButton: Locator;
  waitUtils: any;

  constructor(private page: Page) {
    this.waitUtils = new WaitUtils(page);
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');
    this.firstAddToCartButton = page.locator('button.btn_primary').first();
  }

  async waitForLoaded() {
    await this.waitUtils.waitForVisible(this.inventoryItems.first());
  }

  async addFirstProductToCart() {
    await this.waitUtils.clickWithWait(this.firstAddToCartButton);
  }

  async openCart() {
    await this.waitUtils.clickWithWait(this.cartLink);
  }
}