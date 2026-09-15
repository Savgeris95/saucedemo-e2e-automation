/**

This fixture was created specifically for the login.spec.ts file,
which contains the login tests.


In fixture.ts, I configured the login action to run automatically
for every test that uses that fixture. Therefore, I cannot use
that fixture in login.spec.ts because I do not want the tests
to automatically log in as the 'standard_user'.


In this fixture, I only provide the pageManager fixture.
This allows login.spec.ts to use the pageManager object and
perform the login actions manually within each test.
*/


import { test as base } from '@playwright/test';
import { PageManager } from '../page-objects/page-manager'

type MyFixtures = {
  pageManager: PageManager;
};

export const test = base.extend<MyFixtures>({
  
  pageManager: async ({ page }, use) => {
    await use(new PageManager(page));
  },
});

export { expect } from '@playwright/test';