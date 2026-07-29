import { LoginPage } from "../pages/login";
import { Environment } from "../config/env";
import { test } from '@playwright/test';    

test('login', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.openLoginPage();
    await loginPage.login(Environment.email, Environment.password);
    await loginPage.verifyLoginSuccess();
})
