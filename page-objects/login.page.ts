import { Locator, Page } from "@playwright/test";

export class LoginPage {

    readonly page: Page
    readonly loginPageLogo : Locator
    readonly loginPageErrorMessage: Locator

    constructor(page: Page){
        this.page = page
        this.loginPageLogo = page.locator('.app_logo')
        this.loginPageErrorMessage = page.locator('[data-test="error"]')
    }

    async fillUsername(username: string){
        await this.page.getByRole('textbox',{name: 'Username'}).fill(username)
    }

    async fillPassword(password: string){
        await this.page.getByRole('textbox',{name: 'Password'}).fill(password)
    }

    async clickLogInButton(){
        await this.page.getByRole('button',{name: 'Login'}).click()
    }
}