import { Locator, Page } from "@playwright/test";

export class CartPage{
    
    readonly page: Page
    readonly cartTitle:  Locator

    constructor(page: Page){
        this.page = page
        this.cartTitle = page.getByText('Your cart')
    }

    

    getSpecificItemFromCart(productFromCart: string){
        return this.page.locator('[data-test="inventory-item"]').filter({hasText: productFromCart})
    }

    getThePriceOfSpecificItem(productFromCart: string){
        return this.page.locator('[data-test="inventory-item"]').filter({hasText: productFromCart}).locator('[data-test="inventory-item-price"]').textContent()
    }

    getTheQuantityOfSpecificItem(productFromCart: string){
        return this.page.locator('[data-test="inventory-item"]').filter({hasText: productFromCart}).locator('[data-test="item-quantity"]').textContent()
    }

    async removeProductFromCart(productFromCart: string){
        await this.page.locator('[data-test="inventory-item"]').filter({hasText: productFromCart}).getByRole('button', {name: 'Remove'}).click()
    }

    async clickContinueShopping(){
        await this.page.getByRole('button',{name: 'Continue shopping'}).click()
    }

    async clickCheckoutButton(){
        await this.page.getByRole('button',{name: 'Checkout'}).click()
    }
}