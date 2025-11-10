import { test } from '@playwright/test';
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

const standardUsers = credentials.filter(cred => cred.username === 'standard_user');
const otherUsers = credentials.filter(cred => cred.username !== 'standard_user');

standardUsers.forEach(cred => {
  test(`Full checkout flow for standard user: ${cred.username}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(cred.username, cred.password);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.addFirstProductToCart();
    await inventoryPage.isProductAdded();
    await inventoryPage.goToCart();

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.proceedToCheckout('John', 'Doe', '12345');
    await checkoutPage.isOrderConfirmed();
  });
});

otherUsers.forEach(cred => {
  test(`Login attempt for invalid user: ${cred.username}`, async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login(cred.username, cred.password);

    await loginPage.isErrorMessageVisible();
    await loginPage.expectOnLoginPage();
  });
});
