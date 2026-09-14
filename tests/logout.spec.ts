import { test, expect } from '@playwright/test';
import { PageManager } from '../page-objects/page-manager';

test.describe('Product page', ()=>{
    
    test.beforeEach('', async({page})=>{
        const pm = new PageManager(page);

        await page.goto('https://www.saucedemo.com/');
        await pm.loginPage().fillUsername('standard_user')
        await pm.loginPage().fillPassword('secret_sauce')
        await pm.loginPage().clickLogInButton()

        expect(page.url()).toBe('https://www.saucedemo.com/inventory.html')
        
    })

    test('TC-001 — Verify user can logout successfully', async({page})=>{
        const pm = new PageManager(page)

        //Open hamburger menu
        await pm.commonPage().openMenu()

        //Click logout
        await pm.commonPage().logOut()

        //Verify that user is on Log in page
        expect(page.url()).toBe('https://www.saucedemo.com/')
        
        //Verify that login button is visible
        await expect(pm.loginPage().loginButton).toBeVisible()
        
    })

    test('TC-002 — Verify user cannot access Products page after logout', async({page})=>{
        const pm = new PageManager(page)

        //Open hamburger menu
        await pm.commonPage().openMenu()

        //Click logout
        await pm.commonPage().logOut()

        //Verify that user is on Log in page
        expect(page.url()).toBe('https://www.saucedemo.com/')
        
        //Verify that login button is visible
        await expect(pm.loginPage().loginButton).toBeVisible()

        //Try to navigate to Product Page after the user logged out
        await page.goto('https://www.saucedemo.com/inventory.html');

        //Verify that user is still on Log in page
        await expect(pm.loginPage().loginButton).toBeVisible()

        //Verify that user is not on Product page
        await expect(pm.productPage().productPageLogo).not.toBeVisible();
        
    })



    

})




