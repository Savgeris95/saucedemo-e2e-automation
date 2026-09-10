import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';
import { HelperPage } from '../page-objects/helper.page';

test.describe('Product page', ()=>{
    
    test.beforeEach('', async({page})=>{
        const login_Page = new LoginPage(page)
        await page.goto('https://www.saucedemo.com/');
        await login_Page.fillUsername('standard_user')
        await login_Page.fillPassword('secret_sauce')
        await login_Page.clickLogInButton()
        expect(page.url()).toBe('https://www.saucedemo.com/inventory.html')
        await expect(page.locator('.app_logo')).toBeVisible()
    })

    test('TC-001 — Verify products are displayed', async({page})=>{
        
        const products = await page.locator('[data-test="inventory-item"]').all()
        
        for(let product of products){
           await expect(product).toBeVisible()
        }
    })

    test('TC-003 — Sort products A-Z', async({page})=>{
        const sortingValue = await page.locator('[data-test="active-option"]').textContent()
        //assert that the default sorting value is ascending
        expect(sortingValue).toBe('Name (A to Z)')

        //await page.getByRole('combobox').selectOption('Name (Z to A)')

        const productNames = await page.locator('[data-test="inventory-item-name"]').allTextContents()
    })

    test('TC-004 — Sort products Ζ-Α', async({page})=>{
        const sortingValue = await page.locator('[data-test="active-option"]').textContent()
         // Verify that the default sorting option is 'Name (A to Z)'
        expect(sortingValue).toBe('Name (A to Z)')
         // Store the product names in their default order before applying the sorting
        const productNamesBeforeSorting = await page.locator('[data-test="inventory-item-name"]').allTextContents()
        // Select the 'Name (Z to A)' sorting option
        await page.getByRole('combobox').selectOption('Name (Z to A)')
        // Store the product names after applying the sorting
        const productNamesAfterSorting = await page.locator('[data-test="inventory-item-name"]').allTextContents()
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
        const help_Page = new HelperPage()

        // Verify that the default sorting option is 'Name (A to Z)'
        const sortingValue = await page.locator('[data-test="active-option"]').textContent()
        expect(sortingValue).toBe('Name (A to Z)')
            
        // Store the product prices in their default order before applying the sorting
        const productPricesBeforeSorting = await page.locator('[data-test="inventory-item-price"]').allTextContents()
            
        // Select the 'Price (low to high)' sorting option
        await page.getByRole('combobox').selectOption('Price (low to high)')
            
        // Store the product prices after applying the sorting
        const productPricesAfterSorting = await page.locator('[data-test="inventory-item-price"]').allTextContents()
            
        // Convert the original prices from strings to numbers and sort them in ascending order
        const prices = help_Page.stringToNumberAnArray(productPricesBeforeSorting)
        prices.sort((a,b) => a-b)
            
        // Verify that the prices displayed by the application match the expected ascending order
        expect(prices).toEqual(help_Page.stringToNumberAnArray(productPricesAfterSorting))        
    })

    test('TC-006 - Sort products by price High to Low', async({page})=>{
        const help_Page = new HelperPage()

        // Verify that the default sorting option is 'Name (A to Z)'
        const sortingValue = await page.locator('[data-test="active-option"]').textContent()
        expect(sortingValue).toBe('Name (A to Z)')
            
        // Store the product prices in their default order before applying the sorting
        const productPricesBeforeSorting = await page.locator('[data-test="inventory-item-price"]').allTextContents()
            
        // Select the 'Price (high to low)' sorting option
        await page.getByRole('combobox').selectOption('Price (high to low)')
            
        // Store the product prices after applying the sorting
        const productPricesAfterSorting = await page.locator('[data-test="inventory-item-price"]').allTextContents()
            
        // Convert the original prices from strings to numbers and sort them in descending order
        const prices = help_Page.stringToNumberAnArray(productPricesBeforeSorting)
        prices.sort((a,b) => b-a)
            
        // Verify that the prices displayed by the application match the expected descending order
        expect(prices).toEqual(help_Page.stringToNumberAnArray(productPricesAfterSorting))
    })

    test('TC-007 — Add product to cart', async({page})=>{
        // Add 'Sauce Labs Backpack' to the cart
        await page.locator('[data-test="inventory-item-description"]').filter({hasText: 'Sauce Labs Backpack'}).getByRole('button', {name: 'Add to cart'}).click()
        // Verify that the badge with number 1 appears
        expect(await page.locator('[data-test="shopping-cart-badge"]').textContent()).toEqual('1')
    })

    test('TC-008 — Remove product from cart', async({page})=>{
        // Add 'Sauce Labs Backpack' to the cart
        await page.locator('[data-test="inventory-item-description"]').filter({hasText: 'Sauce Labs Backpack'}).getByRole('button', {name: 'Add to cart'}).click()
        // Verify that the badge with number 1 appears
        expect(await page.locator('[data-test="shopping-cart-badge"]').textContent()).toEqual('1')
        //Remove item from the cart
        await page.locator('[data-test="inventory-item-description"]').filter({hasText: 'Sauce Labs Backpack'}).getByRole('button', {name: 'Remove'}).click()
        //Verify badge is not visible anymore
        await expect(page.locator('[data-test="shopping-cart-badge"]')).not.toBeVisible()
    })
 
})




