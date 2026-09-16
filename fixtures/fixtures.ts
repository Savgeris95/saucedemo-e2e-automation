import { test as base } from '@playwright/test';
import { PageManager } from '../page-objects/page-manager'
import { error } from 'node:console';

type MyFixtures = {
  pageManager: PageManager;
  loginAsStandaredUser: String;
};

export const test = base.extend<MyFixtures>({
  loginAsStandaredUser: [async ({ page,pageManager }, use) => {
    // Set up the fixture.

    const username = process.env.STANDARD_USER_USERNAME
    const password = process.env.STANDARD_USER_PASSWORD

    await page.goto('https://www.saucedemo.com/');

    // Enter valid credentials and log in
    if(!username){
      throw new Error('USER_NAME is not defined on .env file') 
    }
    await pageManager.loginPage().fillUsername(username);

    if(!password){
      throw new Error('PASSWORD is not defined on .env file') 
    }
    await pageManager.loginPage().fillPassword(password);
    await pageManager.loginPage().clickLogInButton();

    // Use the fixture value in the test.
    await use('');
   
  },{auto: true}],

  pageManager: async ({ page }, use) => {
    await use(new PageManager(page));
  },
});

export { expect } from '@playwright/test';