import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Platform, NavController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute, RouterEvent } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {


  selectedPath = '';
  pageTitle = '';
  public appPages: Array<any> = [
    {
      title: 'Home', pageName: 'Home', pageUrl: '/home', index: 0, icon: 'home'
    },
    {
      title: 'My Orders', pageName: 'MyOrders', pageUrl: '/my-orders', index: 1, icon: 'pricetags'
    },
    {
      title: 'My Cart', pageName: 'MyCart', pageUrl: '/my-cart', index: 2, icon: 'cart'
    },
    {
      title: 'My Account', pageName: 'MyAccount', pageUrl: '/my-account', index: 3, icon: 'person'
    },
    {
      title: 'Log-Out', pageName: 'Log-Out', pageUrl: 'login', index: 3, icon: 'log-out'
    }
  ];;

  constructor(
    private router: Router,
    private navCtrl: NavController,
  ) {
    this.pageTitle = 'Menu';

    this.router.events.subscribe((event: RouterEvent) => {
      if (event && event.url) {
        this.selectedPath = event.url;
      }
    });
  }

  ngOnInit() {
  }

  menuItemClicked(gotoPage) {
    console.log('gotoPage', gotoPage)
    if (gotoPage.pageUrl == 'login') {
      setTimeout(() => {
        this.navCtrl.navigateRoot([gotoPage.pageUrl]);
      }, 2000);
    } else {
      this.navCtrl.navigateRoot(['/menu' + gotoPage.pageUrl]);
    }
  }
  setHome() {
    this.navCtrl.navigateRoot(['/menu/home']);
  }

}
