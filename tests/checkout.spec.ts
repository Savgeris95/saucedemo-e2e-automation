import { test,Page,expect } from "@playwright/test";
import { LoginPage } from "../page-objects/login.page";
import { ProductPage } from "../page-objects/product.page";
import { CommonPage } from "../page-objects/common.page";
import { CartPage } from "../page-objects/cart.page";
import { CheckoutPage } from "../page-objects/checkout.page";

test.describe('Checkout Page', ()=>{
    
    test.beforeEach('', async({page})=>{
        const login_Page = new LoginPage(page)
        

        await page.goto('https://www.saucedemo.com/');
        await login_Page.fillUsername('standard_user')
        await login_Page.fillPassword('secret_sauce')
        await login_Page.clickLogInButton()

        expect(page.url()).toBe('https://www.saucedemo.com/inventory.html')
        
    })

    test('TC-001 — Verify Checkout Information page is displayed', async({page})=>{
        const product_Page = new ProductPage(page)
        const common_Page = new CommonPage(page)
        const cart_Page = new CartPage(page)
        const checkout_Page = new CheckoutPage(page)

        //Add a product to cart
        await product_Page.addProductToCart('Sauce Labs Backpack')

        //Go to cart
        await common_Page.goToCart()

        //Click checkout button
        await cart_Page.clickCheckoutButton()

        //Verify URL contains 'checkout-step-one.html'
        expect(page.url()).toContain('checkout-step-one.html')

        //Verify 'Checkout: Your Information' Title is visible
        await expect(checkout_Page.checkoutPageTitle).toBeVisible()
        
    })

    test('TC-002a — Verify required fields validation', async({page})=>{
        const common_Page = new CommonPage(page)
        const cart_Page = new CartPage(page)
        const checkout_Page = new CheckoutPage(page)

        //Go to cart with no product on it
        await common_Page.goToCart()

        //Click checkout button
        await cart_Page.clickCheckoutButton()

        //Click Continue button without filling the fields
        await checkout_Page.clickContinueButton()

        //Verify error message appears
        await expect(checkout_Page.errorMessage).toBeVisible()

        //Verify user is still on Checkout page
        expect(page.url()).toContain('checkout-step-one.html');
        
    })

    test('TC-002b — Empty First Name', async({page})=>{
        const common_Page = new CommonPage(page)
        const cart_Page = new CartPage(page)
        const checkout_Page = new CheckoutPage(page)

        //Go to cart with no product on it
        await common_Page.goToCart()

        //Click checkout button
        await cart_Page.clickCheckoutButton()

        //Fill Last name and ZipCode fields
        await checkout_Page.fillLastName('Ted')
        await checkout_Page.fillZipCode('1145')

        //Click Continue button 
        await checkout_Page.clickContinueButton()

        //Verify error message appears
        await expect(checkout_Page.errorMessage).toBeVisible()
        expect(await checkout_Page.errorMessage.textContent()).toContain('Error: First Name is required')

        //Verify user is still on Checkout page
        expect(page.url()).toContain('checkout-step-one.html');
        
    })

    test('TC-002c — Empty Last Name', async({page})=>{
        const common_Page = new CommonPage(page)
        const cart_Page = new CartPage(page)
        const checkout_Page = new CheckoutPage(page)

        //Go to cart with no product on it
        await common_Page.goToCart()

        //Click checkout button
        await cart_Page.clickCheckoutButton()

        //Fill First name and ZipCode fields
        await checkout_Page.fillFirstName('John')
        await checkout_Page.fillZipCode('1145')

        //Click Continue button 
        await checkout_Page.clickContinueButton()

        //Verify error message appears
        await expect(checkout_Page.errorMessage).toBeVisible()
        expect(await checkout_Page.errorMessage.textContent()).toContain('Error: Last Name is required')

        //Verify user is still on Checkout page
        expect(page.url()).toContain('checkout-step-one.html');
        
    })

    test('TC-002d — Empty Zipcode', async({page})=>{
        const common_Page = new CommonPage(page)
        const cart_Page = new CartPage(page)
        const checkout_Page = new CheckoutPage(page)

        //Go to cart with no product on it
        await common_Page.goToCart()

        //Click checkout button
        await cart_Page.clickCheckoutButton()

        //Fill First name and Last name fields
        await checkout_Page.fillFirstName('John')
        await checkout_Page.fillLastName('Ted')

        //Click Continue button 
        await checkout_Page.clickContinueButton()

        //Verify error message appears
        await expect(checkout_Page.errorMessage).toBeVisible()
        expect(await checkout_Page.errorMessage.textContent()).toContain('Error: Postal Code is required')

        //Verify user is still on Checkout page
        expect(page.url()).toContain('checkout-step-one.html');
        
    })

    test('TC-003 — Verify checkout information can be submitted', async({page})=>{
        const common_Page = new CommonPage(page)
        const cart_Page = new CartPage(page)
        const checkout_Page = new CheckoutPage(page)
        const product_Page = new ProductPage(page)

        //Add a product to cart
        await product_Page.addProductToCart('Sauce Labs Backpack')

        //Go to cart
        await common_Page.goToCart()

        //Click checkout button
        await cart_Page.clickCheckoutButton()

        //Fill First name, Last name and ZipCode fields
        await checkout_Page.fillFirstName('John')
        await checkout_Page.fillLastName('Ted')
        await checkout_Page.fillZipCode('11145')

        //Click Continue button 
        await checkout_Page.clickContinueButton()

        //Verify user is moved to the next step
        expect(page.url()).toContain('checkout-step-two.html');
        
    })

    test('TC-004 — Verify checkout overview displays correct product information', async({page})=>{
        const common_Page = new CommonPage(page)
        const cart_Page = new CartPage(page)
        const checkout_Page = new CheckoutPage(page)
        const product_Page = new ProductPage(page)

        //Add a product to cart
        await product_Page.addProductToCart('Sauce Labs Backpack')

        //Go to cart
        await common_Page.goToCart()

        //Click checkout button
        await cart_Page.clickCheckoutButton()

        //Fill First name, Last name and ZipCode fields
        await checkout_Page.fillFirstName('John')
        await checkout_Page.fillLastName('Ted')
        await checkout_Page.fillZipCode('11145')

        //Click Continue button 
        await checkout_Page.clickContinueButton()

        //Verify product name on Checkout Page
        expect(await checkout_Page.getProductNameOnCheckoutPage('Sauce Labs Backpack')).toBe('Sauce Labs Backpack')

        //Verify product price on Checkout Page
        expect(await checkout_Page.getProductPriceOnCheckoutPage('Sauce Labs Backpack')).toBe('$29.99')

        //Verify product quantity on Checkout Page
        expect(await checkout_Page.getProductQuantityOnCheckoutPage('Sauce Labs Backpack')).toBe('1')
    })

    test('TC-005 — Verify checkout overview displays correct Payment Information', async({page})=>{
        const common_Page = new CommonPage(page)
        const cart_Page = new CartPage(page)
        const checkout_Page = new CheckoutPage(page)
        const product_Page = new ProductPage(page)

        //Add a product to cart
        await product_Page.addProductToCart('Sauce Labs Backpack')

        //Go to cart
        await common_Page.goToCart()

        //Click checkout button
        await cart_Page.clickCheckoutButton()

        //Fill First name, Last name and ZipCode fields
        await checkout_Page.fillFirstName('John')
        await checkout_Page.fillLastName('Ted')
        await checkout_Page.fillZipCode('11145')

        //Click Continue button 
        await checkout_Page.clickContinueButton()

        //Verify Payment Information label is visible
        expect(checkout_Page.paymentInformation).toBeVisible()

        //Verify Payment Information value and format are correct
        expect(await checkout_Page.getPaymentInformationValue()).toMatch(/SauceCard #\d+/)
    })

    test('TC-006 — Verify shipping information is displayed', async({page})=>{
        const common_Page = new CommonPage(page)
        const cart_Page = new CartPage(page)
        const checkout_Page = new CheckoutPage(page)
        const product_Page = new ProductPage(page)

        //Add a product to cart
        await product_Page.addProductToCart('Sauce Labs Backpack')

        //Go to cart
        await common_Page.goToCart()

        //Click checkout button
        await cart_Page.clickCheckoutButton()

        //Fill First name, Last name and ZipCode fields
        await checkout_Page.fillFirstName('John')
        await checkout_Page.fillLastName('Ted')
        await checkout_Page.fillZipCode('11145')

        //Click Continue button 
        await checkout_Page.clickContinueButton()

        //Verify Shipping Information label is visible
        expect(checkout_Page.shippingInformation).toBeVisible()

        //Verify Shipping Information value is not empty
        expect(checkout_Page.shippingInformationValue).not.toBeEmpty
    })

    test('TC-007 — Verify total price', async({page})=>{
        const common_Page = new CommonPage(page)
        const cart_Page = new CartPage(page)
        const checkout_Page = new CheckoutPage(page)
        const product_Page = new ProductPage(page)

        //Add a product to cart
        await product_Page.addProductToCart('Sauce Labs Backpack')

        //Go to cart
        await common_Page.goToCart()

        //Click checkout button
        await cart_Page.clickCheckoutButton()

        //Fill First name, Last name and ZipCode fields
        await checkout_Page.fillFirstName('John')
        await checkout_Page.fillLastName('Ted')
        await checkout_Page.fillZipCode('11145')

        //Click Continue button 
        await checkout_Page.clickContinueButton()

        //Assert that Price, Sub Total, Tax and Total labels exist
        await expect(checkout_Page.priceTotalLabel).toBeVisible()
        await expect(checkout_Page.itemSubTotalLabel).toBeVisible()
        await expect(checkout_Page.taxValueLabel).toBeVisible()
        await expect(checkout_Page.totalPriceLabel).toBeVisible()

        //Get sub total, item tax and item total string texts which contain the digit values
        const itemSubTotalValue = await checkout_Page.getItemSubTotalValue()
        const itemTaxValue = await checkout_Page.getItemTaxValue()
        const itemTotalPrice = await checkout_Page.getItemTotalPrice()

        //Convert string text to digit numbers only
        const itemSubTotal = Number(itemSubTotalValue?.replace(/[^\d.]/g,''))
        const itemTax = Number(itemTaxValue?.replace(/[^\d.]/g,''))
        const itemTotal = Number(itemTotalPrice?.replace(/[^\d.]/g,''))

        //Verify that Total = Item total + Tax
        expect (itemTotal).toEqual(itemTax + itemSubTotal)

        
    })


    test('TC-008 — Complete order successfully', async({page})=>{
        const common_Page = new CommonPage(page)
        const cart_Page = new CartPage(page)
        const checkout_Page = new CheckoutPage(page)
        const product_Page = new ProductPage(page)

        //Add a product to cart
        await product_Page.addProductToCart('Sauce Labs Backpack')

        //Go to cart
        await common_Page.goToCart()

        //Click checkout button
        await cart_Page.clickCheckoutButton()

        //Fill First name, Last name and ZipCode fields
        await checkout_Page.fillFirstName('John')
        await checkout_Page.fillLastName('Ted')
        await checkout_Page.fillZipCode('11145')

        //Click Continue button 
        await checkout_Page.clickContinueButton()

        //Click Finish button
        await checkout_Page.clickFinishButton()

        //Verify Thank you for your order! text appears
        await expect(checkout_Page.completeOrderText).toBeVisible()
        expect(await checkout_Page.completeOrderText.textContent()).toContain('Thank you for your order!')

    })

    test('TC-009 — Verify Back Home button', async({page})=>{
        const common_Page = new CommonPage(page)
        const cart_Page = new CartPage(page)
        const checkout_Page = new CheckoutPage(page)
        const product_Page = new ProductPage(page)

        //Add a product to cart
        await product_Page.addProductToCart('Sauce Labs Backpack')

        //Go to cart
        await common_Page.goToCart()

        //Click checkout button
        await cart_Page.clickCheckoutButton()

        //Fill First name, Last name and ZipCode fields
        await checkout_Page.fillFirstName('John')
        await checkout_Page.fillLastName('Ted')
        await checkout_Page.fillZipCode('11145')

        //Click Continue button 
        await checkout_Page.clickContinueButton()

        //Click Finish button
        await checkout_Page.clickFinishButton()

        //Click Back Home button
        await checkout_Page.clickBackHomeButton()

        //Verify user is back on Products page (inventory.html)
        expect(page.url()).toContain('inventory.html');
        

    })


   

})

