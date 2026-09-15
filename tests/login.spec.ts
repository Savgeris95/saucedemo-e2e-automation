import { test, expect } from '../fixtures/pageManagerFixtures';

test.describe('Login Page', () => {

// TC-001: Verify that a user can successfully log in with valid credentials
  test('TC-001 - Valid log in', async ({ pageManager }) => {

    await pageManager.page.goto('https://www.saucedemo.com/');

    // Enter valid credentials and log in
    await pageManager.loginPage().fillUsername('standard_user');
    await pageManager.loginPage().fillPassword('secret_sauce');
    await pageManager.loginPage().clickLogInButton();

    // Verify successful navigation to the inventory page
    expect(pageManager.page.url()).toBe('https://www.saucedemo.com/inventory.html');

    // Verify that the application logo is visible
    await expect(pageManager.productPage().productPageLogo).toBeVisible();


  });

  // TC-002: Verify that login fails with an invalid username
  test('TC-002 - Invalid username', async ({ pageManager }) => {

    await pageManager.page.goto('https://www.saucedemo.com/');

    // Enter an invalid username and a valid password
    await pageManager.loginPage().fillUsername('invaliduser');
    await pageManager.loginPage().fillPassword('secret_sauce');
    await pageManager.loginPage().clickLogInButton();

    // Verify that the error message is displayed
    await expect(pageManager.loginPage().loginPageErrorMessage).toBeVisible();

    // Verify that the user was not redirected to the inventory page
    expect(pageManager.page.url()).not.toBe('https://www.saucedemo.com/inventory.html');

    // Verify the error message content
    await expect(pageManager.loginPage().loginPageErrorMessage)
      .toContainText('Username and password do not match any user in this service');


  });

  // TC-003: Verify that login fails with an invalid password
  test('TC-003 - Invalid password', async ({ pageManager }) => {

    await pageManager.page.goto('https://www.saucedemo.com/');

    // Enter an invalid username and an invalid password
    await pageManager.loginPage().fillUsername('invaliduser');
    await pageManager.loginPage().fillPassword('invalidpassword');
    await pageManager.loginPage().clickLogInButton();

    // Verify that the error message is displayed
    await expect(pageManager.loginPage().loginPageErrorMessage).toBeVisible();

    // Verify that the user was not redirected to the inventory page
    expect(pageManager.page.url()).not.toBe('https://www.saucedemo.com/inventory.html');

    // Verify the error message content
    await expect(pageManager.loginPage().loginPageErrorMessage)
      .toContainText('Username and password do not match any user in this service');


  });

  // TC-004: Verify that login fails when the username field is empty
  test('TC-004 - Empty username', async ({ pageManager }) => {

    await pageManager.page.goto('https://www.saucedemo.com/');

    // Leave the username field empty and enter a valid password
    await pageManager.loginPage().fillUsername('');
    await pageManager.loginPage().fillPassword('secret_sauce');
    await pageManager.loginPage().clickLogInButton();

    // Verify that the error message is displayed
    await expect(pageManager.loginPage().loginPageErrorMessage).toBeVisible();

    // Verify that the user was not redirected to the inventory page
    expect(pageManager.page.url()).not.toBe('https://www.saucedemo.com/inventory.html');

    // Verify the error message content
    await expect(pageManager.loginPage().loginPageErrorMessage)
      .toContainText('Username is required');


  });

  // TC-005: Verify that login fails when the password field is empty
  test('TC-005 - Empty password', async ({ pageManager }) => {

    await pageManager.page.goto('https://www.saucedemo.com/');

    // Enter a username and leave the password field empty
    await pageManager.loginPage().fillUsername('invaliduser');
    await pageManager.loginPage().fillPassword('');
    await pageManager.loginPage().clickLogInButton();

    // Verify that the error message is displayed
    await expect(pageManager.loginPage().loginPageErrorMessage).toBeVisible();

    // Verify that the user was not redirected to the inventory page
    expect(pageManager.page.url()).not.toBe('https://www.saucedemo.com/inventory.html');

    // Verify the error message content
    await expect(pageManager.loginPage().loginPageErrorMessage)
      .toContainText('Password is required');


  });

  // TC-006: Verify that login fails when both fields are empty
  test('TC-006 - Both fields empty', async ({ pageManager }) => {

    await pageManager.page.goto('https://www.saucedemo.com/');
    
    // Leave both the username and password fields empty
    await pageManager.loginPage().fillUsername('');
    await pageManager.loginPage().fillPassword('');
    await pageManager.loginPage().clickLogInButton();
    
    // Verify that the error message is displayed
    await expect(pageManager.loginPage().loginPageErrorMessage).toBeVisible();
    
    // Verify that the user was not redirected to the inventory page
    expect(pageManager.page.url()).not.toBe('https://www.saucedemo.com/inventory.html');
    
    // Verify the error message content
    await expect(pageManager.loginPage().loginPageErrorMessage)
      .toContainText('Username is required');


  });

  // TC-007: Verify that a locked-out user cannot log in
  test('TC-007 - Locked out user', async ({ pageManager }) => {

    await pageManager.page.goto('https://www.saucedemo.com/');
    
    // Enter the credentials of a locked-out user
    await pageManager.loginPage().fillUsername('locked_out_user');
    await pageManager.loginPage().fillPassword('secret_sauce');
    await pageManager.loginPage().clickLogInButton();
    
    // Verify that the error message is displayed
    await expect(pageManager.loginPage().loginPageErrorMessage).toBeVisible();
    
    // Verify that the user was not redirected to the inventory page
    expect(pageManager.page.url()).not.toBe('https://www.saucedemo.com/inventory.html');
    
    // Verify the error message content
    await expect(pageManager.loginPage().loginPageErrorMessage)
      .toContainText('Sorry, this user has been locked out.');


  });

});
