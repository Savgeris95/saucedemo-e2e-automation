import { Page } from "@playwright/test";


export class ProductPage{
    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async getAllProducts(){
        return this.page.locator('[data-test="inventory-item"]').all()
    }

    async getActiveSortingOption(){
        return this.page.locator('[data-test="active-option"]').textContent()
    }

    async selectSortingOption(option: string){
        await this.page.getByRole('combobox').selectOption(option)
    }

    async getProductNames(){
        return this.page.locator('[data-test="inventory-item-name"]').allTextContents()
    }

    async getProductPrices(){
        return this.page.locator('[data-test="inventory-item-price"]').allTextContents()
    }

    async addProductToCart(product: string){
        await this.page.locator('[data-test="inventory-item-description"]').filter({hasText: product}).getByRole('button', {name: 'Add to cart'}).click()
    }

    async removeProductFromCart(product: string){
        await this.page.locator('[data-test="inventory-item-description"]').filter({hasText: product}).getByRole('button', {name: 'Remove'}).click()
    }

    
}