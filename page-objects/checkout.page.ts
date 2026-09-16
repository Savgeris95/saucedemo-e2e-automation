import { Locator, Page } from "@playwright/test";

export class CheckoutPage{
    readonly page: Page
    readonly checkoutPageTitle: Locator
    readonly errorMessage: Locator
    readonly paymentInformation: Locator
    readonly shippingInformation: Locator
    readonly shippingInformationValue: Locator
    readonly priceTotalLabel: Locator
    readonly itemSubTotalLabel: Locator
    readonly taxValueLabel: Locator
    readonly totalPriceLabel: Locator
    readonly completeOrderText: Locator

    constructor(page: Page){
        this.page = page
        this.checkoutPageTitle = page.locator('[data-test="title"]')
        this.errorMessage = page.locator('[data-test="error"]')
        this.paymentInformation = page.locator('[data-test="payment-info-label"]')
        this.shippingInformation = page.locator('[data-test="shipping-info-label"]')
        this.shippingInformationValue = page.locator('[data-test="shipping-info-value"]')
        this.priceTotalLabel = page.locator('[data-test="total-info-label"]')
        this.itemSubTotalLabel = page.locator('[data-test="subtotal-label"]')
        this.taxValueLabel = page.locator('[data-test="tax-label"]')
        this.totalPriceLabel = page.locator('[data-test="total-label"]')
        this.completeOrderText = page.locator('[data-test="complete-header"]')
    }

    async clickContinueButton(){
        await this.page.getByRole('button', {name: 'Continue'}).click()
    }

    async fillFirstName(firstName: string){
        await this.page.getByRole('textbox', {name: 'First Name'}).fill(firstName)
    }

    async fillLastName(lastName: string){
        await this.page.getByRole('textbox', {name: 'Last Name'}).fill(lastName)
    }

    async fillZipCode(zipCode: string){
        await this.page.getByRole('textbox', {name: 'Zip/Postal code'}).fill(zipCode)
    }

    async clickFinishButton(){
        await this.page.getByRole('button', {name: 'Finish'}).click()
    }

    async clickBackHomeButton(){
        await this.page.getByRole('button', {name: 'Back Home'}).click()
    }

    getProductNameOnCheckoutPage(product: string){
        return this.page.locator('[data-test="inventory-item-name"]').filter({hasText: product}).textContent()
    }

    getProductPriceOnCheckoutPage(product: string){
        return this.page.locator('[data-test="inventory-item"]').filter({hasText: product}).locator('[data-test="inventory-item-price"]').textContent()
    }

    getProductQuantityOnCheckoutPage(product: string){
        return this.page.locator('[data-test="inventory-item"]').filter({hasText: product}).locator('[data-test="item-quantity"]').textContent()
    }


    getPaymentInformationValue(){
        return this.page.locator('[data-test="payment-info-value"]').textContent()
    }

    getItemSubTotalValue(){
        return this.page.locator('[data-test="subtotal-label"]').textContent()
    }

    getItemTaxValue(){
        return this.page.locator('[data-test="tax-label"]').textContent()
    }

    getItemTotalPrice(){
        return this.page.locator('[data-test="total-label"]').textContent()
    }



    
    

}