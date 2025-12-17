// tests/SauceDemoTestCases.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';
import { CheckoutPage } from '../pages/checkout.page';
import {
  getLoginUserForSpec,
  getCheckoutInfoFirstRow,
} from '../utils/excelDataProviders';

test.describe('Saucedemo flow', () => {
  test('Complete checkout flow', async ({ page }, testInfo) => {
    const loginUser = getLoginUserForSpec(testInfo.file);
    const checkoutInfo = getCheckoutInfoFirstRow();

    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(loginUser.username, loginUser.password);
    await expect(page).toHaveURL(/inventory\.html/);

    await inventoryPage.waitForLoaded();
    await inventoryPage.addFirstProductToCart();
    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.openCart();
    await expect(page).toHaveURL(/cart\.html/);

    await checkoutPage.startCheckout();
    await checkoutPage.fillCheckoutInformation({
      firstName: String(checkoutInfo.firstname),
      lastName: String(checkoutInfo['last name']),
      postalCode: String(checkoutInfo.postal),
    });

    await checkoutPage.finishCheckout();
    await checkoutPage.waitForConfirmation();
  });
});
