import { LoginPage } from "../pages/login";
import { test } from '@playwright/test';    

test('login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login('admin@test.com', 'password123');
    await loginPage.verifyLoginSuccess();
})