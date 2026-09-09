import { Page } from "@playwright/test";

export class LoginPage {

    readonly page: Page

    constructor(page: Page){
        this.page = page
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