import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Platform, NavController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { OverlayEventDetail } from '@ionic/core';

import { AppConfigs } from './../../configs/app.configs';
import { ApiService } from 'src/app/services/api-service/api-service.service';
import { CartService } from 'src/app/services/cart-service/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: 'product-list.page.html',
  styleUrls: ['product-list.page.scss'],
})
export class ProductListPage implements OnInit {

  appTitle = '';
  pageTitle = '';
  defaultLoadingMessage = 'Please wait...';
  productList: Array<any> = [];
  outletsPageCount = 0;
  outletsDisplayLimit = 10;
  dateDisplayFormat = 'ddd, D MMM YYYY, h:mm:ss A';
  slideOpts = {
    initialSlide: 1,
    speed: 400
  };

  constructor(
    private loadCtrl: LoadingController,
    private apiService: ApiService,
    private cartService: CartService,
    private navCntrl: NavController
  ) {
    console.log('HomePage constructor');
    this.appTitle = AppConfigs.appMainTitle;
    this.pageTitle = 'Nearest Outlets';
  }

  ngOnInit() {
    this.getProductList();
  }
  productDetials(prod) {
    this.navCntrl.navigateRoot(['/menu/product-detail/' + prod.id]);
  }

  getProductList() {
    this.outletsPageCount = 0;
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

  openProducts(prod) {
    this.displayLoader('loading ' + prod).then(loader => {
      loader.present();
      setTimeout(() => {
        loader.dismiss();
      }, 3000);
    })
  }
  addToCart(prod) {
    this.cartService.addCartItem(prod);
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
