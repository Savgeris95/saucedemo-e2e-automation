import { test, expect } from '../fixtures/fixtures';


test.describe('Logout', ()=>{


    test('TC-001 — Verify user can logout successfully', async({pageManager})=>{
        

        //Open hamburger menu
        await pageManager.commonPage().openMenu()

        //Click logout
        await pageManager.commonPage().logOut()

        //Verify that user is on Log in pageManager
        expect(pageManager.page.url()).toBe('https://www.saucedemo.com/')
        
        //Verify that login button is visible
        await expect(pageManager.loginPage().loginButton).toBeVisible()
        
    })

    test('TC-002 — Verify user cannot access Products pageManager after logout', async({pageManager})=>{
        

        //Open hamburger menu
        await pageManager.commonPage().openMenu()

        //Click logout
        await pageManager.commonPage().logOut()

        //Verify that user is on Log in pageManager
        expect(pageManager.page.url()).toBe('https://www.saucedemo.com/')
        
        //Verify that login button is visible
        await expect(pageManager.loginPage().loginButton).toBeVisible()

        //Try to navigate to Product pageManager after the user logged out
        await pageManager.page.goto('https://www.saucedemo.com/inventory.html');

        //Verify that user is still on Log in pageManager
        await expect(pageManager.loginPage().loginButton).toBeVisible()

        //Verify that user is not on Product pageManager
        await expect(pageManager.productPage().productPageLogo).not.toBeVisible();
        
    })


})




