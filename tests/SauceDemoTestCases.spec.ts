// tests/SauceDemoTestCases.spec.ts
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../Pages/inventory.page';
import { CheckoutPage } from '../pages/checkout.page';
import { getLoginUserForSpec, getCheckoutInfoFirstRow, } from '../utils/excelDataProviders';

const loginUser = getLoginUserForSpec(__filename);
const checkoutInfo = getCheckoutInfoFirstRow();

test.describe('Saucedemo flow', () => {
  test('Login test', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(String(loginUser['username']), String(loginUser['password']));

    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('Complete checkout flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);

    await loginPage.goto();
    await loginPage.login(String(loginUser['username']), String(loginUser['password']));
    await expect(page).toHaveURL(/inventory\.html/);

    await inventoryPage.waitForLoaded();
    await inventoryPage.addFirstProductToCart();
    await expect(page.locator('.shopping_cart_badge')).toHaveText('1');

    await inventoryPage.openCart();
    await expect(page).toHaveURL(/cart\.html/);

    await checkoutPage.startCheckout();
    await expect(page).toHaveURL(/checkout-step-one\.html/);

    await checkoutPage.fillCheckoutInformation({
      firstName: String(checkoutInfo['firstname']),
      lastName: String(checkoutInfo['last name']),
      postalCode: String(checkoutInfo['postal']),
    });

    await expect(page).toHaveURL(/checkout-step-two\.html/);

    await checkoutPage.finishCheckout();
    await checkoutPage.waitForConfirmation();
  });
});
