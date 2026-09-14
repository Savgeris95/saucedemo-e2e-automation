import { Page } from "@playwright/test";

export class CommonPage{

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async getCartBadgeNumber(){
        return await this.page.locator('[data-test="shopping-cart-badge"]').textContent()
    }

    getCartBadge(){
        return this.page.locator('[data-test="shopping-cart-badge"]')
    }

    async goToCart(){
        await this.page.locator('[data-test="shopping-cart-link"]').click()
    }

    async openMenu(){
        await this.page.getByRole('button', {name: 'Open Menu'}).click()
    }

    async logOut(){
        await this.page.locator('[data-test="logout-sidebar-link"]').click()
    }
}