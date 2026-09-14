import { test,expect } from "@playwright/test";
import { PageManager } from "../page-objects/page-manager";

test.describe('Checkout Page', ()=>{
    
    test.beforeEach('', async({page})=>{
        const pm = new PageManager(page);
        

        await page.goto('https://www.saucedemo.com/');
        await pm.loginPage().fillUsername('standard_user')
        await pm.loginPage().fillPassword('secret_sauce')
        await pm.loginPage().clickLogInButton()

        expect(page.url()).toBe('https://www.saucedemo.com/inventory.html')
        
    })

    test('TC-001 — Verify Checkout Information page is displayed', async({page})=>{
        const pm = new PageManager(page);

        //Add a product to cart
        await pm.productPage().addProductToCart('Sauce Labs Backpack')

        //Go to cart
        await pm.commonPage().goToCart()

        //Click checkout button
        await pm.cartPage().clickCheckoutButton()

        //Verify URL contains 'checkout-step-one.html'
        expect(page.url()).toContain('checkout-step-one.html')

        //Verify 'Checkout: Your Information' Title is visible
        await expect(pm.checkoutPage().checkoutPageTitle).toBeVisible()
        
    })

    test('TC-002a — Verify required fields validation', async({page})=>{
        const pm = new PageManager(page);

        //Go to cart with no product on it
        await pm.commonPage().goToCart()

        //Click checkout button
        await pm.cartPage().clickCheckoutButton()

        //Click Continue button without filling the fields
        await pm.checkoutPage().clickContinueButton()

        //Verify error message appears
        await expect(pm.checkoutPage().errorMessage).toBeVisible()

        //Verify user is still on Checkout page
        expect(page.url()).toContain('checkout-step-one.html');
        
    })

    test('TC-002b — Empty First Name', async({page})=>{
        const pm = new PageManager(page);

        //Go to cart with no product on it
        await pm.commonPage().goToCart()

        //Click checkout button
        await pm.cartPage().clickCheckoutButton()

        //Fill Last name and ZipCode fields
        await pm.checkoutPage().fillLastName('Ted')
        await pm.checkoutPage().fillZipCode('1145')

        //Click Continue button 
        await pm.checkoutPage().clickContinueButton()

        //Verify error message appears
        await expect(pm.checkoutPage().errorMessage).toBeVisible()
        expect(await pm.checkoutPage().errorMessage.textContent()).toContain('Error: First Name is required')

        //Verify user is still on Checkout page
        expect(page.url()).toContain('checkout-step-one.html');
        
    })

    test('TC-002c — Empty Last Name', async({page})=>{
        const pm = new PageManager(page);
        

        //Go to cart with no product on it
        await pm.commonPage().goToCart()

        //Click checkout button
        await pm.cartPage().clickCheckoutButton()

        //Fill First name and ZipCode fields
        await pm.checkoutPage().fillFirstName('John')
        await pm.checkoutPage().fillZipCode('1145')

        //Click Continue button 
        await pm.checkoutPage().clickContinueButton()

        //Verify error message appears
        await expect(pm.checkoutPage().errorMessage).toBeVisible()
        expect(await pm.checkoutPage().errorMessage.textContent()).toContain('Error: Last Name is required')

        //Verify user is still on Checkout page
        expect(page.url()).toContain('checkout-step-one.html');
        
    })

    test('TC-002d — Empty Zipcode', async({page})=>{
        const pm = new PageManager(page);

        //Go to cart with no product on it
        await pm.commonPage().goToCart()

        //Click checkout button
        await pm.cartPage().clickCheckoutButton()

        //Fill First name and Last name fields
        await pm.checkoutPage().fillFirstName('John')
        await pm.checkoutPage().fillLastName('Ted')

        //Click Continue button 
        await pm.checkoutPage().clickContinueButton()

        //Verify error message appears
        await expect(pm.checkoutPage().errorMessage).toBeVisible()
        expect(await pm.checkoutPage().errorMessage.textContent()).toContain('Error: Postal Code is required')

        //Verify user is still on Checkout page
        expect(page.url()).toContain('checkout-step-one.html');
        
    })

    test('TC-003 — Verify checkout information can be submitted', async({page})=>{
        const pm = new PageManager(page);

        //Add a product to cart
        await pm.productPage().addProductToCart('Sauce Labs Backpack')

        //Go to cart
        await pm.commonPage().goToCart()

        //Click checkout button
        await pm.cartPage().clickCheckoutButton()

        //Fill First name, Last name and ZipCode fields
        await pm.checkoutPage().fillFirstName('John')
        await pm.checkoutPage().fillLastName('Ted')
        await pm.checkoutPage().fillZipCode('11145')

        //Click Continue button 
        await pm.checkoutPage().clickContinueButton()

        //Verify user is moved to the next step
        expect(page.url()).toContain('checkout-step-two.html');
        
    })

    test('TC-004 — Verify checkout overview displays correct product information', async({page})=>{
        const pm = new PageManager(page);

        //Add a product to cart
        await pm.productPage().addProductToCart('Sauce Labs Backpack')

        //Go to cart
        await pm.commonPage().goToCart()

        //Click checkout button
        await pm.cartPage().clickCheckoutButton()

        //Fill First name, Last name and ZipCode fields
        await pm.checkoutPage().fillFirstName('John')
        await pm.checkoutPage().fillLastName('Ted')
        await pm.checkoutPage().fillZipCode('11145')

        //Click Continue button 
        await pm.checkoutPage().clickContinueButton()

        //Verify product name on Checkout Page
        expect(await pm.checkoutPage().getProductNameOnCheckoutPage('Sauce Labs Backpack')).toBe('Sauce Labs Backpack')

        //Verify product price on Checkout Page
        expect(await pm.checkoutPage().getProductPriceOnCheckoutPage('Sauce Labs Backpack')).toBe('$29.99')

        //Verify product quantity on Checkout Page
        expect(await pm.checkoutPage().getProductQuantityOnCheckoutPage('Sauce Labs Backpack')).toBe('1')
    })

    test('TC-005 — Verify checkout overview displays correct Payment Information', async({page})=>{
        const pm = new PageManager(page);

        //Add a product to cart
        await pm.productPage().addProductToCart('Sauce Labs Backpack')

        //Go to cart
        await pm.commonPage().goToCart()

        //Click checkout button
        await pm.cartPage().clickCheckoutButton()

        //Fill First name, Last name and ZipCode fields
        await pm.checkoutPage().fillFirstName('John')
        await pm.checkoutPage().fillLastName('Ted')
        await pm.checkoutPage().fillZipCode('11145')

        //Click Continue button 
        await pm.checkoutPage().clickContinueButton()

        //Verify Payment Information label is visible
        expect(pm.checkoutPage().paymentInformation).toBeVisible()

        //Verify Payment Information value and format are correct
        expect(await pm.checkoutPage().getPaymentInformationValue()).toMatch(/SauceCard #\d+/)
    })

    test('TC-006 — Verify shipping information is displayed', async({page})=>{
        const pm = new PageManager(page);

        //Add a product to cart
        await pm.productPage().addProductToCart('Sauce Labs Backpack')

        //Go to cart
        await pm.commonPage().goToCart()

        //Click checkout button
        await pm.cartPage().clickCheckoutButton()

        //Fill First name, Last name and ZipCode fields
        await pm.checkoutPage().fillFirstName('John')
        await pm.checkoutPage().fillLastName('Ted')
        await pm.checkoutPage().fillZipCode('11145')

        //Click Continue button 
        await pm.checkoutPage().clickContinueButton()

        //Verify Shipping Information label is visible
        expect(pm.checkoutPage().shippingInformation).toBeVisible()

        //Verify Shipping Information value is not empty
        expect(pm.checkoutPage().shippingInformationValue).not.toBeEmpty
    })

    test('TC-007 — Verify total price', async({page})=>{
        const pm = new PageManager(page);

        //Add a product to cart
        await pm.productPage().addProductToCart('Sauce Labs Backpack')

        //Go to cart
        await pm.commonPage().goToCart()

        //Click checkout button
        await pm.cartPage().clickCheckoutButton()

        //Fill First name, Last name and ZipCode fields
        await pm.checkoutPage().fillFirstName('John')
        await pm.checkoutPage().fillLastName('Ted')
        await pm.checkoutPage().fillZipCode('11145')

        //Click Continue button 
        await pm.checkoutPage().clickContinueButton()

        //Assert that Price, Sub Total, Tax and Total labels exist
        await expect(pm.checkoutPage().priceTotalLabel).toBeVisible()
        await expect(pm.checkoutPage().itemSubTotalLabel).toBeVisible()
        await expect(pm.checkoutPage().taxValueLabel).toBeVisible()
        await expect(pm.checkoutPage().totalPriceLabel).toBeVisible()

        //Get sub total, item tax and item total string texts which contain the digit values
        const itemSubTotalValue = await pm.checkoutPage().getItemSubTotalValue()
        const itemTaxValue = await pm.checkoutPage().getItemTaxValue()
        const itemTotalPrice = await pm.checkoutPage().getItemTotalPrice()

        //Convert string text to digit numbers only
        const itemSubTotal = Number(itemSubTotalValue?.replace(/[^\d.]/g,''))
        const itemTax = Number(itemTaxValue?.replace(/[^\d.]/g,''))
        const itemTotal = Number(itemTotalPrice?.replace(/[^\d.]/g,''))

        //Verify that Total = Item total + Tax
        expect (itemTotal).toEqual(itemTax + itemSubTotal)

        
    })


    test('TC-008 — Complete order successfully', async({page})=>{
        const pm = new PageManager(page);

        //Add a product to cart
        await pm.productPage().addProductToCart('Sauce Labs Backpack')

        //Go to cart
        await pm.commonPage().goToCart()

        //Click checkout button
        await pm.cartPage().clickCheckoutButton()

        //Fill First name, Last name and ZipCode fields
        await pm.checkoutPage().fillFirstName('John')
        await pm.checkoutPage().fillLastName('Ted')
        await pm.checkoutPage().fillZipCode('11145')

        //Click Continue button 
        await pm.checkoutPage().clickContinueButton()

        //Click Finish button
        await pm.checkoutPage().clickFinishButton()

        //Verify Thank you for your order! text appears
        await expect(pm.checkoutPage().completeOrderText).toBeVisible()
        expect(await pm.checkoutPage().completeOrderText.textContent()).toContain('Thank you for your order!')

    })

    test('TC-009 — Verify Back Home button', async({page})=>{
        const pm = new PageManager(page);

        //Add a product to cart
        await pm.productPage().addProductToCart('Sauce Labs Backpack')

        //Go to cart
        await pm.commonPage().goToCart()

        //Click checkout button
        await pm.cartPage().clickCheckoutButton()

        //Fill First name, Last name and ZipCode fields
        await pm.checkoutPage().fillFirstName('John')
        await pm.checkoutPage().fillLastName('Ted')
        await pm.checkoutPage().fillZipCode('11145')

        //Click Continue button 
        await pm.checkoutPage().clickContinueButton()

        //Click Finish button
        await pm.checkoutPage().clickFinishButton()

        //Click Back Home button
        await pm.checkoutPage().clickBackHomeButton()

        //Verify user is back on Products page (inventory.html)
        expect(page.url()).toContain('inventory.html');
        

    })


   

})

