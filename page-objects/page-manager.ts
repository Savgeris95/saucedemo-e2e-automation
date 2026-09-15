import {Page} from '@playwright/test'
import { LoginPage } from "../page-objects/login.page";
import { ProductPage } from "../page-objects/product.page";
import { CommonPage } from "../page-objects/common.page";
import { CartPage } from "../page-objects/cart.page";
import { CheckoutPage } from "../page-objects/checkout.page";
import { HelperPage } from "./helper.page";


export class PageManager{

    readonly page: Page
    readonly _loginPage: LoginPage
    readonly _productPage: ProductPage
    readonly _commonPage: CommonPage
    readonly _cartPage: CartPage
    readonly _checkoutPage: CheckoutPage
    readonly _helperPage: HelperPage

    constructor(page: Page){
        this.page = page
        this._loginPage = new LoginPage(page)
        this._productPage = new ProductPage(page)
        this._commonPage = new CommonPage(page)
        this._cartPage = new CartPage(page)
        this._checkoutPage = new CheckoutPage(page)
        this._helperPage = new HelperPage(page)
    }

    loginPage(){
        return this._loginPage
    }

    productPage(){
        return this._productPage
    }

    commonPage(){
        return this._commonPage
    }

    cartPage(){
        return this._cartPage
    }

    checkoutPage(){
        return this._checkoutPage
    }

    helperPage(){
        return this._helperPage
    }

}