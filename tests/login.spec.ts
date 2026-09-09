import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';

test.describe('Log in page', ()=>{

  test('Valid log in', async ({ page }) => {
    const login_Page = new LoginPage(page)

    await page.goto('https://www.saucedemo.com/');
    await login_Page.fillUsername('standard_user')
    await login_Page.fillPassword('secret_sauce')
    await login_Page.clickLogInButton()
    
    expect(page.url()).toBe('https://www.saucedemo.com/inventory.html')
    await expect(page.locator('.app_logo')).toBeVisible()
  });

  test('Invalid username', async({page})=>{
    const login_Page = new LoginPage(page)

    await page.goto('https://www.saucedemo.com/');
    
    await login_Page.fillUsername('invaliduser')
    await login_Page.fillPassword('secret_sauce')
    await login_Page.clickLogInButton()

    await expect(page.locator('[data-test="error"]')).toBeVisible()
    expect(page.url()).not.toBe('https://www.saucedemo.com/inventory.html')
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match any user in this service')
  })

  test('Invalid password', async({page})=>{
    const login_Page = new LoginPage(page)

    await page.goto('https://www.saucedemo.com/');

    await login_Page.fillUsername('invaliduser')
    await login_Page.fillPassword('invalidpassword')
    await login_Page.clickLogInButton()

    await expect(page.locator('[data-test="error"]')).toBeVisible()
    expect(page.url()).not.toBe('https://www.saucedemo.com/inventory.html')
    await expect(page.locator('[data-test="error"]')).toContainText('Username and password do not match any user in this service')
  })

  test('Empty username', async({page}) => {
    const login_Page = new LoginPage(page)

    await page.goto('https://www.saucedemo.com/');

    await login_Page.fillUsername('')
    await login_Page.fillPassword('secret_sauce')
    await login_Page.clickLogInButton()

    await expect(page.locator('[data-test="error"]')).toBeVisible()
    expect(page.url()).not.toBe('https://www.saucedemo.com/inventory.html')
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required')
  })

  test('Empty password', async({page}) => {
    const login_Page = new LoginPage(page)

    await page.goto('https://www.saucedemo.com/');

    await login_Page.fillUsername('invaliduser')
    await login_Page.fillPassword('')
    await login_Page.clickLogInButton()

    await expect(page.locator('[data-test="error"]')).toBeVisible()
    expect(page.url()).not.toBe('https://www.saucedemo.com/inventory.html')
    await expect(page.locator('[data-test="error"]')).toContainText('Password is required')
  })

  test('Both fields empty', async({page}) => {
    const login_Page = new LoginPage(page)

    await page.goto('https://www.saucedemo.com/');

    await login_Page.fillUsername('')
    await login_Page.fillPassword('')
    await login_Page.clickLogInButton()

    await expect(page.locator('[data-test="error"]')).toBeVisible()
    expect(page.url()).not.toBe('https://www.saucedemo.com/inventory.html')
    await expect(page.locator('[data-test="error"]')).toContainText('Username is required')
  })

  test('Locked out user', async({page}) => {
    const login_Page = new LoginPage(page)

    await page.goto('https://www.saucedemo.com/');

    await login_Page.fillUsername('locked_out_user')
    await login_Page.fillPassword('secret_sauce')
    await login_Page.clickLogInButton()

    await expect(page.locator('[data-test="error"]')).toBeVisible()
    expect(page.url()).not.toBe('https://www.saucedemo.com/inventory.html')
    await expect(page.locator('[data-test="error"]')).toContainText('Sorry, this user has been locked out.')
  })

})




