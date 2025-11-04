import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/login.page';
import { InventoryPage } from '../Pages/inventory.page';
import { CheckoutPage } from '../Pages/checkout.page';
import { readExcelSheet } from '../Utils/excelUtils';
import { config } from '../Utils/config';

interface Credential {
  username: string;
  password: string;
}

const credentials = readExcelSheet(config.excelFilePath, 'Sheet1') as Credential[];
console.log('Credentials read from Excel:', credentials);

for (const cred of credentials) {
  test(`Login test with ${cred.username}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(cred.username, cred.password);

     if (cred.username === 'locked_out') {
      // Expect to stay on login page, error message visible
      await expect(page).toHaveURL('https://www.saucedemo.com/');
      await expect(loginPage.errorMessage).toBeVisible();
    } else {
      // Expect successful navigation
      await expect(page).toHaveURL(/inventory.html/);
      console.log('Confirmed on:', page.url());

      const inventoryPage = new InventoryPage(page);

      await page.waitForSelector('.inventory_item button', { state: 'visible', timeout: 10000 });

      console.log('Before adding product to cart...');
      await inventoryPage.addFirstProductToCart();
      console.log('Product add attempted. Cart visible:', await inventoryPage.isProductAdded());
      expect(await inventoryPage.isProductAdded()).toBeTruthy();
  await page.click('.shopping_cart_link');
  await expect(page).toHaveURL(/cart.html/);

  // Proceed to checkout
  await page.click('#checkout');
  await expect(page).toHaveURL(/checkout-step-one.html/);

  // Initialize checkout page object
  const checkoutPage = new CheckoutPage(page);

  // Fill checkout info and continue
  await checkoutPage.fillCheckoutInformation('John', 'Doe', '12345');
  await expect(page).toHaveURL(/checkout-step-two.html/);

  // Finish checkout
  await checkoutPage.finishCheckout();

  // Verify order confirmation
  expect(await checkoutPage.isOrderConfirmed()).toBeTruthy();
    }
  });
}
