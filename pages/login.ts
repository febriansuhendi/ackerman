import { Page, Locator, expect } from "@playwright/test";

export class LoginPage {
    page: Page;
    readonly inputEmail: Locator;
    readonly inputPassword: Locator;
    readonly buttonLogin: Locator;
    constructor(page: Page) {
        this.page = page;
        this.inputEmail = this.page.getByTestId('login-email-input');
        this.inputPassword = this.page.getByTestId('login-password-input');
        this.buttonLogin = this.page.getByTestId('login-submit-button');
    }

    async openLoginPage() {
        await this.page.goto(`/login`);
    }

    async login(email: string, password: string) {
        await this.inputEmail.fill(email);
        await this.inputPassword.fill(password);
        await this.buttonLogin.click();
    }

    async verifyLoginSuccess() {
        await expect(this.page).toHaveURL(`/dashboard`);
    }
}