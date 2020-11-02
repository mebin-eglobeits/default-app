import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core';
import { ApiService } from 'src/app/services/api-service/api-service.service';
import { CartService } from 'src/app/services/cart-service/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: 'product-details.page.html',
  styleUrls: ['product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {
  defaultLoadingMessage = 'Please wait...';
  productData: any;
  slideOpts = {};

  constructor(
    private loadCtrl: LoadingController,
    private apiService: ApiService,
    private activateRoute: ActivatedRoute,
    private cartService: CartService,
  ) {
  }

  ngOnInit() {
    this.activateRoute.params.subscribe(params => {
      if (params.id) {
        this.getProductList(params.id);
      }
    })
  }
  getProductList(id) {
    this.productData = {};
    this.displayLoader().then(loader => {
      loader.present();
      this.apiService.processGetApi('product-list.json').subscribe((response: any) => {
        loader.dismiss();
        if (response && response.items && response.items.length > 0) {
          this.productData = response.items.find(item => item.id == id);
          console.log(this.productData);
        }
      }, Error => {
        console.log(Error);
        loader.dismiss();
      })
    })
  }
  addToCart() {
    this.cartService.addCartItem(this.productData);
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
