import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Platform, NavController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { OverlayEventDetail } from '@ionic/core';

import { AppConfigs } from './../../configs/app.configs';
import { ApiService } from 'src/app/services/api-service/api-service.service';
import { CartService } from 'src/app/services/cart-service/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  defaultLoadingMessage = 'Please wait...';
  productList: any[];
  slideOpts = {};
  constructor(
    private loadCtrl: LoadingController,
    private apiService: ApiService,
    private cartService: CartService,
    private navCntrl: NavController
  ) {
  }

  ngOnInit() {
    this.getProductList();
  }
  getProductList() {
    this.productList = [];
    this.displayLoader().then(loader => {
      loader.present();
      this.apiService.processGetApi('product-list.json').subscribe((response: any) => {
        loader.dismiss();
        if (response && response.items && response.items.length > 0) {
          this.productList = response.items;
        }
      }, Error => {
        console.log(Error);
        loader.dismiss();
      })
    })
  }
  addToCart(prod) {
    this.cartService.addCartItem(prod);
  }
  goToCart() {
    this.navCntrl.navigateRoot(['/menu/my-cart']);
  }
  productDetials(prod) {
    console.log(prod);
    this.navCntrl.navigateRoot(['/menu/product-detail/' + prod.id]);
  }
  async displayLoader(loadingMessage: string = '') {
    if (loadingMessage.trim() === '') {
      loadingMessage = this.defaultLoadingMessage;
    }
    const loadObj = await this.loadCtrl.create({
      message: loadingMessage,
      translucent: false,
    });
    loadObj.onDidDismiss().then((detail: OverlayEventDetail) => {

    });
    return loadObj;
  }

}
