import { test, expect } from "../fixtures/fixtures";

test.describe('Product Page', ()=>{

    test('TC-001 — Verify products are displayed', async({pageManager})=>{

        const products = await pageManager.productPage().getAllProducts()
        
        for(let product of products){
           await expect(product).toBeVisible()
        }
    })

    test('TC-003 — Sort products A-Z', async({pageManager})=>{
        
        // Verify that the default sorting option is 'Name (A to Z)'
        expect(await pageManager.productPage().getActiveSortingOption()).toBe('Name (A to Z)')

        // Store the product names in their default order before applying the sorting
        const productNamesBeforeSorting = await pageManager.productPage().getProductNames()

        // Select the 'Name (A to Z)' sorting option
        await pageManager.productPage().selectSortingOption('Name (A to Z)')

        // Store the product names after applying the sorting
        const productNamesAfterSorting = await pageManager.productPage().getProductNames()

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

    test('TC-004 — Sort products Z-A', async({pageManager})=>{
        
        // Verify that the default sorting option is 'Name (A to Z)'
        expect(await pageManager.productPage().getActiveSortingOption()).toBe('Name (A to Z)')

        // Store the product names in their default order before applying the sorting
        const productNamesBeforeSorting = await pageManager.productPage().getProductNames()

        // Select the 'Name (Z to A)' sorting option
        await pageManager.productPage().selectSortingOption('Name (Z to A)')

        // Store the product names after applying the sorting
        const productNamesAfterSorting = await pageManager.productPage().getProductNames()

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

    test('TC-005 - Sort products by price Low to High', async({pageManager})=>{

        // Verify that the default sorting option is 'Name (A to Z)'
        expect(await pageManager.productPage().getActiveSortingOption()).toBe('Name (A to Z)')
            
        // Store the product prices in their default order before applying the sorting
        const productPricesBeforeSorting = await pageManager.productPage().getProductPrices()
            
        // Select the 'Price (low to high)' sorting option
        await pageManager.productPage().selectSortingOption('Price (low to high)')
            
        // Store the product prices after applying the sorting
        const productPricesAfterSorting = await pageManager.productPage().getProductPrices()
            
        // Convert the original prices from strings to numbers and sort them in ascending order
        const prices = pageManager.helperPage().stringToNumberAnArray(productPricesBeforeSorting)
        prices.sort((a,b) => a-b)
            
        // Verify that the prices displayed by the application match the expected ascending order
        expect(prices).toEqual(pageManager.helperPage().stringToNumberAnArray(productPricesAfterSorting))        
    })

    test('TC-006 - Sort products by price High to Low', async({pageManager})=>{

        // Verify that the default sorting option is 'Name (A to Z)'
        const sortingValue = await pageManager.productPage().getActiveSortingOption()

        expect(sortingValue).toBe('Name (A to Z)')
            
        // Store the product prices in their default order before applying the sorting
        const productPricesBeforeSorting = await pageManager.productPage().getProductPrices()
            
        // Select the 'Price (high to low)' sorting option
        await pageManager.page.getByRole('combobox').selectOption('Price (high to low)')
            
        // Store the product prices after applying the sorting
        const productPricesAfterSorting = await pageManager.productPage().getProductPrices()
            
        // Convert the original prices from strings to numbers and sort them in descending order
        const prices = pageManager.helperPage().stringToNumberAnArray(productPricesBeforeSorting)
        prices.sort((a,b) => b-a)
            
        // Verify that the prices displayed by the application match the expected descending order
        expect(prices).toEqual(pageManager.helperPage().stringToNumberAnArray(productPricesAfterSorting))
    })

    test('TC-007 — Add product to cart', async({pageManager})=>{

        // Add 'Sauce Labs Backpack' to the cart
        await pageManager.productPage().addProductToCart('Sauce Labs Backpack')

        // Verify that the cart badge displays the number 1
        expect(await pageManager.commonPage().getCartBadgeNumber()).toEqual('1')
    })

    test('TC-008 — Remove product from cart', async({pageManager})=>{

        // Add 'Sauce Labs Backpack' to the cart
        await pageManager.productPage().addProductToCart('Sauce Labs Backpack')

        // Verify that the cart badge displays the number 1
        expect(await pageManager.commonPage().getCartBadgeNumber()).toEqual('1')

        // Remove the product from the cart
        await pageManager.productPage().removeProductFromCart('Sauce Labs Backpack')

        // Verify that the cart badge is no longer visible
        await expect(pageManager.commonPage().getCartBadge()).not.toBeVisible()
    })

})