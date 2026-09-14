import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/page-manager';

test.describe('Product page', ()=>{
    
    test.beforeEach('', async({page})=>{
        const pm = new PageManager(page)

        await page.goto('https://www.saucedemo.com/');
        await pm.loginPage().fillUsername('standard_user')
        await pm.loginPage().fillPassword('secret_sauce')
        await pm.loginPage().clickLogInButton()

        expect(page.url()).toBe('https://www.saucedemo.com/inventory.html')
        
    })

    test('TC-001 — Verify products are displayed', async({page})=>{
        const pm = new PageManager(page)

        const products = await pm.productPage().getAllProducts()
        
        for(let product of products){
           await expect(product).toBeVisible()
        }
    })

    test('TC-003 — Sort products A-Z', async({page})=>{
        const pm = new PageManager(page)
        
        // Verify that the default sorting option is 'Name (A to Z)'
        expect(await pm.productPage().getActiveSortingOption()).toBe('Name (A to Z)')

        // Store the product names in their default order before applying the sorting
        const productNamesBeforeSorting = await pm.productPage().getProductNames()

        // Select the 'Name (A to Z)' sorting option
        await pm.productPage().selectSortingOption('Name (A to Z)')

        // Store the product names after applying the sorting
        const productNamesAfterSorting = await pm.productPage().getProductNames()

        // Sort the original product names in ascending alphabetical order
        productNamesBeforeSorting.sort((a,b) => {
            if(a<b){
                return -1
            }

            if(b<a){
                return 1
            }

            return 0
    })

    // Verify that the products displayed by the application match the expected ascending order
    expect(productNamesBeforeSorting).toEqual(productNamesAfterSorting)
})

    test('TC-004 — Sort products Ζ-Α', async({page})=>{
        const pm = new PageManager(page)
        
         // Verify that the default sorting option is 'Name (A to Z)'
        expect(await pm.productPage().getActiveSortingOption()).toBe('Name (A to Z)')

         // Store the product names in their default order before applying the sorting
        const productNamesBeforeSorting = await pm.productPage().getProductNames()

        // Select the 'Name (Z to A)' sorting option
        await pm.productPage().selectSortingOption('Name (Z to A)')

        // Store the product names after applying the sorting
        const productNamesAfterSorting = await pm.productPage().getProductNames()

        // Sort the original product names in descending alphabetical order
        productNamesBeforeSorting.sort((a,b) => {
            if(a>b){
                return -1
            }

            if(b<a){
                return 1
            }
            return 0
        })

        // Verify that the products displayed by the application match the expected descending order
        expect(productNamesBeforeSorting).toEqual(productNamesAfterSorting)
    })

    test('TC-005 - Sort products by price Low to High', async({page})=>{
        const pm = new PageManager(page)

        // Verify that the default sorting option is 'Name (A to Z)'
        expect(await pm.productPage().getActiveSortingOption()).toBe('Name (A to Z)')
            
        // Store the product prices in their default order before applying the sorting
        const productPricesBeforeSorting = await pm.productPage().getProductPrices()
            
        // Select the 'Price (low to high)' sorting option
        await pm.productPage().selectSortingOption('Price (low to high)')
            
        // Store the product prices after applying the sorting
        const productPricesAfterSorting = await pm.productPage().getProductPrices()
            
        // Convert the original prices from strings to numbers and sort them in ascending order
        const prices = pm.helperPage().stringToNumberAnArray(productPricesBeforeSorting)
        prices.sort((a,b) => a-b)
            
        // Verify that the prices displayed by the application match the expected ascending order
        expect(prices).toEqual(pm.helperPage().stringToNumberAnArray(productPricesAfterSorting))        
    })

    test('TC-006 - Sort products by price High to Low', async({page})=>{
        const pm = new PageManager(page) 

        // Verify that the default sorting option is 'Name (A to Z)'
        const sortingValue = await pm.productPage().getActiveSortingOption()

        expect(sortingValue).toBe('Name (A to Z)')
            
        // Store the product prices in their default order before applying the sorting
        const productPricesBeforeSorting = await pm.productPage().getProductPrices()
            
        // Select the 'Price (high to low)' sorting option
        await page.getByRole('combobox').selectOption('Price (high to low)')
            
        // Store the product prices after applying the sorting
        const productPricesAfterSorting = await pm.productPage().getProductPrices()
            
        // Convert the original prices from strings to numbers and sort them in descending order
        const prices = pm.helperPage().stringToNumberAnArray(productPricesBeforeSorting)
        prices.sort((a,b) => b-a)
            
        // Verify that the prices displayed by the application match the expected descending order
        expect(prices).toEqual(pm.helperPage().stringToNumberAnArray(productPricesAfterSorting))
    })

    test('TC-007 — Add product to cart', async({page})=>{
        const pm = new PageManager(page)

        // Add 'Sauce Labs Backpack' to the cart
        await pm.productPage().addProductToCart('Sauce Labs Backpack')

        // Verify that the badge with number 1 appears
        expect(await pm.commonPage().getCartBadgeNumber()).toEqual('1')
    })

    test('TC-008 — Remove product from cart', async({page})=>{
        const pm = new PageManager(page)
        // Add 'Sauce Labs Backpack' to the cart

        await pm.productPage().addProductToCart('Sauce Labs Backpack')

        // Verify that the badge with number 1 appears
        expect(await pm.commonPage().getCartBadgeNumber()).toEqual('1')

        //Remove item from the cart
        await pm.productPage().removeProductFromCart('Sauce Labs Backpack')

        //Verify badge is not visible anymore
        await expect(pm.commonPage().getCartBadge()).not.toBeVisible()
    })

})




