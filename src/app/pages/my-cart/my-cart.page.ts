import { Component, OnInit, NgZone, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Platform, NavController, AlertController, LoadingController, ModalController, IonInfiniteScroll } from '@ionic/angular';
import { Router, ActivatedRoute, Route, UrlTree, NavigationEnd } from '@angular/router';
import * as moment from 'moment';
import { Subscription, Observable, observable } from 'rxjs';
import { OverlayEventDetail } from '@ionic/core';

import { AppConfigs } from './../../configs/app.configs';
import { SharedService } from 'src/app/services/shared-service/shared.service';
import { ApiService } from 'src/app/services/api-service/api-service.service';
import { CartService } from 'src/app/services/cart-service/cart.service';

@Component({
  selector: 'app-my-cart',
  templateUrl: './my-cart.page.html',
  styleUrls: ['./my-cart.page.scss'],
})
export class MyCartPage implements OnInit {
  defaultLoadingMessage = 'Please wait...';

  constructor(
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController,
    private cartService: CartService,
    private navCntrl: NavController
  ) {
  }

  ngOnInit() {
  }
  get cartitems() {
    return this.cartService.cartList;
  }
  get totlaPrice() {
    if (this.cartService.cartList) {
      let totalPrice = 0;
      this.cartitems.forEach(item => {
        totalPrice = totalPrice + parseInt(item.product_price);
      });
      return totalPrice
    } else {
      return 0;
    }

  }
  saveForLater() {

  }
  deleteItem(prod) {
    this.cartService.deleteCartItem(prod)
  }
  shopNow() {
    this.navCntrl.navigateRoot(['/menu/home']);
  }

  async removeCartItemAlert(prod) {
    console.log('here');
    const alerter = await this.alertCtrl.create({
      header: 'Remove Item',
      message: 'Do you want to remove the \'' + 'itemName' + '\' item from Cart?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Remove',
          handler: () => {
            this.deleteItem(prod);
          }
        }
      ]
    });
    alerter.present();
    alerter.onDidDismiss().then((detail: OverlayEventDetail) => {
      console.log(detail);
    });
    return alerter;
  }

  async displayLoader(loadingMessage: string = '') {
    if (loadingMessage.trim() === '') {
      loadingMessage = this.defaultLoadingMessage;
    }
    const loadObj = await this.loadCtrl.create({
      message: loadingMessage,
      translucent: false
    });
    loadObj.onDidDismiss().then((detail: OverlayEventDetail) => { });
    return loadObj;
  }

}
