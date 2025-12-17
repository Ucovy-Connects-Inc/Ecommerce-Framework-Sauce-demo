import { Page, Locator } from '@playwright/test';
import { WaitUtils } from '../utils/waitUtils';

export class InventoryPage {
  readonly inventoryItems: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly firstAddToCartButton: Locator;
  private wait: WaitUtils;

  constructor(private page: Page) {
    this.wait = new WaitUtils(page);
    this.inventoryItems = page.locator('.inventory_item');
    this.cartBadge = page.locator('.shopping_cart_badge');
    this.cartLink = page.locator('.shopping_cart_link');

    // stronger selector
    this.firstAddToCartButton = page.locator(
      '[data-test^="add-to-cart"]'
    ).first();
  }

  async waitForLoaded() {
    await this.wait.waitForVisible(this.inventoryItems.first());
  }

  async addFirstProductToCart() {
    await this.wait.click(this.firstAddToCartButton);
  }

  async openCart() {
    await this.wait.click(this.cartLink);
  }
}
