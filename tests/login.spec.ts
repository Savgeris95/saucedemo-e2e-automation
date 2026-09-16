import process from 'process';
import { test, expect } from '../fixtures/pageManagerFixtures';

test.describe('Login Page', () => {

  // TC-001: Verify that a user can successfully log in with valid credentials
  test('TC-001 - Valid log in', async ({ pageManager }) => {

    // Get valid credentials from environment variables
    const username = process.env.STANDARD_USER_USERNAME;
    const password = process.env.STANDARD_USER_PASSWORD;

    if (!username) {
      throw new Error('STANDARD_USER_USERNAME is not defined in the .env file');
    }

    if (!password) {
      throw new Error('STANDARD_USER_PASSWORD is not defined in the .env file');
    }

    // Enter valid credentials and log in
    await pageManager.loginPage().fillUsername(username);
    await pageManager.loginPage().fillPassword(password);
    await pageManager.loginPage().clickLogInButton();

    // Verify successful navigation to the inventory page
    expect(pageManager.page.url()).toBe('https://www.saucedemo.com/inventory.html');

    // Verify that the application logo is visible
    await expect(pageManager.productPage().productPageLogo).toBeVisible();
  });


  // TC-002: Verify that login fails with an invalid username
  test('TC-002 - Invalid username', async ({ pageManager }) => {

    // Get invalid username and valid password from environment variables
    const username = process.env.INVALID_USER_USERNAME;
    const password = process.env.STANDARD_USER_PASSWORD;

    if (!username) {
      throw new Error('INVALID_USER_USERNAME is not defined in the .env file');
    }

    if (!password) {
      throw new Error('STANDARD_USER_PASSWORD is not defined in the .env file');
    }

    // Enter invalid username and valid password
    await pageManager.loginPage().fillUsername(username);
    await pageManager.loginPage().fillPassword(password);
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

    // Get valid username and invalid password from environment variables
    const username = process.env.STANDARD_USER_USERNAME;
    const password = process.env.INVALID_USER_PASSWORD;

    if (!username) {
      throw new Error('STANDARD_USER_USERNAME is not defined in the .env file');
    }



    // Enter valid username and invalid password
    await pageManager.loginPage().fillUsername(username);
    await pageManager.loginPage().fillPassword('invalid password');
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

    // Get valid password from environment variables
    const password = process.env.STANDARD_USER_PASSWORD;

    if (!password) {
      throw new Error('STANDARD_USER_PASSWORD is not defined in the .env file');
    }

    // Leave username empty and enter valid password
    await pageManager.loginPage().fillUsername('');
    await pageManager.loginPage().fillPassword(password);
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

    // Get valid username from environment variables
    const username = process.env.STANDARD_USER_USERNAME;

    if (!username) {
      throw new Error('STANDARD_USER_USERNAME is not defined in the .env file');
    }

    // Enter valid username and leave password empty
    await pageManager.loginPage().fillUsername(username);
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

    // Leave both username and password fields empty
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

    // Get locked-out user credentials from environment variables
    const username = process.env.LOCKED_USER_USERNAME;
    const password = process.env.LOCKED_USER_PASSWORD;

    if (!username) {
      throw new Error('LOCKED_OUT_USER_USERNAME is not defined in the .env file');
    }

    if (!password) {
      throw new Error('LOCKED_OUT_USER_PASSWORD is not defined in the .env file');
    }

    // Enter locked-out user credentials
    await pageManager.loginPage().fillUsername(username);
    await pageManager.loginPage().fillPassword(password);
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

