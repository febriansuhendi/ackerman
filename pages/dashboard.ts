import {Page, Locator, expect} from "@playwright/test";

export class DashboardPage {
    readonly page: Page;
    readonly dashboardHeader: Locator;
    constructor(page: Page) {
        this.page = page;
        this.dashboardHeader = this.page.getByRole('heading', {name: 'Dashboard'});
    }

    async openMenus(menu: string){
        await this.page.getByText(menu).click();
    }

    async verifyPageLoaded(menu: string) {
        const pageTitle = await this.page.locator('h1').innerText();
        expect(pageTitle).toContain(menu);
    }
}