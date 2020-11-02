import { Injectable } from '@angular/core';
import { SharedService } from '../shared-service/shared.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private _cartList = [];
  constructor(private sharedService: SharedService) { }
  public get cartList() {
    return this._cartList;
  }
  public set cartList(value) {
    this._cartList = value;
  }
  public addCartItem(prod) {
    if (this.cartList && this.cartList.length > 0) {
      this.cartList.forEach(cartItem => {
        if (cartItem.id == prod.id) {
          this.sharedService.displayToast('Product already in cart');
        } else {
          this._cartList.push(prod);
          console.log(this.cartList);
          this.sharedService.displayToast(prod.product_name + ' added to cart!');
        }
      })
    } else {
      this.cartList = [];
      this._cartList.push(prod);
      console.log(this.cartList);
      this.sharedService.displayToast(prod.product_name + ' added to cart!');
    }
  }
  public deleteCartItem(prod) {
    if (this.cartList && this.cartList.length > 0) {
      const index = this.cartList.findIndex(cartItem => cartItem.id == prod.id);
      if (index > -1) {

      }
    }
  }
}
