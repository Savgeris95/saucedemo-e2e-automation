import { Locator, Page } from "@playwright/test";

export class LoginPage {

    readonly page: Page
    
    readonly loginPageErrorMessage: Locator
    readonly loginButton: Locator

    constructor(page: Page){
        this.page = page
        
        this.loginPageErrorMessage = page.locator('[data-test="error"]')
        this.loginButton = page.getByRole('button', {name: 'Login'})
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