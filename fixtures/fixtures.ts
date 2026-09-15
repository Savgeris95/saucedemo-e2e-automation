import { test as base } from '@playwright/test';
import { PageManager } from '../page-objects/page-manager'

type MyFixtures = {
  pageManager: PageManager;
  loginAsStandaredUser: String;
};

export const test = base.extend<MyFixtures>({
  loginAsStandaredUser: [async ({ page,pageManager }, use) => {
    // Set up the fixture.
    await page.goto('https://www.saucedemo.com/');
    // Enter valid credentials and log in
    await pageManager.loginPage().fillUsername('standard_user');
    //await pm.loginPage().fillUsername('standard_user');
    await pageManager.loginPage().fillPassword('secret_sauce');
    await pageManager.loginPage().clickLogInButton();

    // Use the fixture value in the test.
    await use('');
   
  },{auto: true}],

  pageManager: async ({ page }, use) => {
    await use(new PageManager(page));
  },
});

export { expect } from '@playwright/test';