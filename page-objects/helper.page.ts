import { Page } from "@playwright/test"


export class HelperPage{

    readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    // This function gets an array of string values and returns the same array but String values are now Number values
    stringToNumberAnArray(array: string[]){
        const pricesInStringFormat = array.toString().replaceAll('$','').split(',')
        
        const pricesOnNumberFormat = []

        for (let price of pricesInStringFormat){
            pricesOnNumberFormat.push(Number(price))
        }

        return pricesOnNumberFormat
    }
}