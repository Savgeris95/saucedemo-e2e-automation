# SauceDemo E2E Test Automation

End-to-end test automation project for the [SauceDemo](https://www.saucedemo.com/) web application using **Playwright** and **TypeScript**.

The main goal of the project is to demonstrate a maintainable UI automation structure together with Git/GitHub and CI/CD practices.

## Tech Stack

* Playwright
* TypeScript
* Node.js
* Git / GitHub
* GitHub Actions

## Project Structure

```text
tests/
├── login.spec.ts
├── products.spec.ts
├── cart.spec.ts
├── checkout.spec.ts
└── menu.spec.ts

page-objects/
├── login.page.ts
├── product.page.ts
├── cart.page.ts
├── common.page.ts
├── checkout.page.ts
└── page-manager.ts

fixtures/
└── pageManagerFixtures.ts
```

## Test Coverage

The current tests mainly focus on the core happy flows of the application:

* Login
* Product listing and sorting
* Product selection and cart operations
* Checkout flow
* Menu/navigation functionality

The project also includes reusable Page Objects, Page Manager and custom Playwright fixtures.

The initial implementation is mainly focused on happy-path scenarios due to the available time. More test cases will be added in the future, including additional **negative test cases**, edge cases and broader validation of the application's behavior.

## Test Data & Environment Variables

User credentials are not hardcoded in the tests.

For local execution, credentials are stored in a `.env` file, which is excluded from Git using `.gitignore`.

For GitHub Actions, the credentials are stored as **GitHub Secrets** and injected into the workflow as environment variables.

## Cross-Browser Testing

The test suite is configured to run against:

* Chromium
* Firefox
* WebKit

## CI/CD

GitHub Actions is used to automatically execute the test suite:

* On pushes to `main`
* On pull requests targeting `main`
* On a scheduled weekday run

The CI workflow also:

* Installs dependencies
* Installs Playwright browsers
* Runs the test suite
* Generates an HTML Playwright report
* Uploads the report as a GitHub Actions artifact

## Running Locally

Install dependencies:

```bash
npm install
```

Install Playwright browsers:

```bash
npx playwright install
```

Run the tests:

```bash
npx playwright test
```

Open the HTML report:

```bash
npx playwright show-report
```

## Future Improvements

Planned improvements include:

* Additional negative test cases
* More edge-case scenarios
* Expanded test coverage
* Further CI/CD improvements
* Additional reusable test utilities and fixtures
