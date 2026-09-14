import { test, expect } from '@playwright/test';
import { LoginPage } from '../page-objects/login.page';

test.describe('Log in page', () => {

  // TC-001: Verify that a user can successfully log in with valid credentials
  test('TC-001 - Valid log in', async ({ page }) => {
    const login_Page = new LoginPage(page);

    await page.goto('https://www.saucedemo.com/');

    // Enter valid credentials and log in
    await login_Page.fillUsername('standard_user');
    await login_Page.fillPassword('secret_sauce');
    await login_Page.clickLogInButton();

    // Verify successful navigation to the inventory page
    expect(page.url()).toBe('https://www.saucedemo.com/inventory.html');

    // Verify that the application logo is visible
    await expect(login_Page.loginPageLogo).toBeVisible();
  });

  // TC-002: Verify that login fails with an invalid username
  test('TC-002 - Invalid username', async ({ page }) => {
    const login_Page = new LoginPage(page);

    await page.goto('https://www.saucedemo.com/');

    // Enter invalid username and valid password
    await login_Page.fillUsername('invaliduser');
    await login_Page.fillPassword('secret_sauce');
    await login_Page.clickLogInButton();

    // Verify that the error message is displayed
    await expect(login_Page.loginPageErrorMessage).toBeVisible();

    // Verify that the user was not redirected to the inventory page
    expect(page.url()).not.toBe('https://www.saucedemo.com/inventory.html');

    // Verify the error message content
    await expect(login_Page.loginPageErrorMessage)
      .toContainText('Username and password do not match any user in this service');
  });

  // TC-003: Verify that login fails with an invalid password
  test('TC-003 - Invalid password', async ({ page }) => {
    const login_Page = new LoginPage(page);

    await page.goto('https://www.saucedemo.com/');

    // Enter invalid username and invalid password
    await login_Page.fillUsername('invaliduser');
    await login_Page.fillPassword('invalidpassword');
    await login_Page.clickLogInButton();

    // Verify that the error message is displayed
    await expect(login_Page.loginPageErrorMessage).toBeVisible();

    // Verify that the user was not redirected to the inventory page
    expect(page.url()).not.toBe('https://www.saucedemo.com/inventory.html');

    // Verify the error message content
    await expect(login_Page.loginPageErrorMessage)
      .toContainText('Username and password do not match any user in this service');
  });

  // TC-004: Verify that login fails when the username field is empty
  test('TC-004 - Empty username', async ({ page }) => {
    const login_Page = new LoginPage(page);

    await page.goto('https://www.saucedemo.com/');

    // Leave username empty and enter a valid password
    await login_Page.fillUsername('');
    await login_Page.fillPassword('secret_sauce');
    await login_Page.clickLogInButton();

    // Verify that the error message is displayed
    await expect(login_Page.loginPageErrorMessage).toBeVisible();

    // Verify that the user was not redirected to the inventory page
    expect(page.url()).not.toBe('https://www.saucedemo.com/inventory.html');

    // Verify the error message content
    await expect(login_Page.loginPageErrorMessage)
      .toContainText('Username is required');
  });

  // TC-005: Verify that login fails when the password field is empty
  test('TC-005 - Empty password', async ({ page }) => {
    const login_Page = new LoginPage(page);

    await page.goto('https://www.saucedemo.com/');

    // Enter a username and leave the password empty
    await login_Page.fillUsername('invaliduser');
    await login_Page.fillPassword('');
    await login_Page.clickLogInButton();

    // Verify that the error message is displayed
    await expect(login_Page.loginPageErrorMessage).toBeVisible();

    // Verify that the user was not redirected to the inventory page
    expect(page.url()).not.toBe('https://www.saucedemo.com/inventory.html');

    // Verify the error message content
    await expect(login_Page.loginPageErrorMessage)
      .toContainText('Password is required');
  });

  // TC-006: Verify that login fails when both fields are empty
  test('TC-006 - Both fields empty', async ({ page }) => {
    const login_Page = new LoginPage(page);

    await page.goto('https://www.saucedemo.com/');

    // Leave both username and password fields empty
    await login_Page.fillUsername('');
    await login_Page.fillPassword('');
    await login_Page.clickLogInButton();

    // Verify that the error message is displayed
    await expect(login_Page.loginPageErrorMessage).toBeVisible();

    // Verify that the user was not redirected to the inventory page
    expect(page.url()).not.toBe('https://www.saucedemo.com/inventory.html');

    // Verify the error message content
    await expect(login_Page.loginPageErrorMessage)
      .toContainText('Username is required');
  });

  // TC-007: Verify that a locked-out user cannot log in
  test('TC-007 - Locked out user', async ({ page }) => {
    const login_Page = new LoginPage(page);

    await page.goto('https://www.saucedemo.com/');

    // Enter credentials for a locked-out user
    await login_Page.fillUsername('locked_out_user');
    await login_Page.fillPassword('secret_sauce');
    await login_Page.clickLogInButton();

    // Verify that the error message is displayed
    await expect(login_Page.loginPageErrorMessage).toBeVisible();

    // Verify that the user was not redirected to the inventory page
    expect(page.url()).not.toBe('https://www.saucedemo.com/inventory.html');

    // Verify the error message content
    await expect(login_Page.loginPageErrorMessage)
      .toContainText('Sorry, this user has been locked out.');
  });

});

