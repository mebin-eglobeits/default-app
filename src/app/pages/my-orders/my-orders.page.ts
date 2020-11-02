import { Component, OnInit, NgZone, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Platform, NavController, AlertController, LoadingController, ModalController, IonInfiniteScroll } from '@ionic/angular';
import { Router, ActivatedRoute, Route, UrlTree, NavigationEnd } from '@angular/router';
import * as moment from 'moment';
import { Subscription, Observable, observable } from 'rxjs';
import { OverlayEventDetail } from '@ionic/core';

import { AppConfigs } from './../../configs/app.configs';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.page.html',
  styleUrls: ['./my-orders.page.scss'],
})
export class MyOrdersPage implements OnInit {

  appTitle = '';
  pageTitle = '';
  customerData: any = null;
  orderListResult: Array<any> = [];
  ordersPageCount = 1;
  ordersDisplayLimit = 10;
  categoryFilterConfig: any;
  baseCurrencyCode = '';
  defaultLoadingMessage = 'Please wait...';
  dateDisplayFormat = 'ddd, D MMM YYYY, h:mm:ss A';
  @ViewChild('moreOrdersScroller', { static: false }) moreOrdersScroller: IonInfiniteScroll;

  constructor(
    private router: Router,
    private platform: Platform,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController,
    private modalCtrl: ModalController,
    private ngZone: NgZone,
    private changeRef: ChangeDetectorRef,
  ) {
    console.log('MyOrdersPage constructor');
    this.appTitle = AppConfigs.appMainTitle;
    this.pageTitle = 'My Orders';
    this.categoryFilterConfig = {
      cssClass: 'category-search-filter-options-area'
    };
    // this.baseCurrencyCode = this.service.getStoreCurrency();
  }

  ngOnInit() {
    console.log('MyOrdersPage ngOnInit');
  }

  ionViewWillEnter() {
    console.log('MyOrdersPage ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('MyOrdersPage ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('MyOrdersPage ionViewWillLeave');
  }

  loadMoreOrders(event) {
    // setTimeout(() => {
    //   console.log('loadMoreOrders : ', event);
    //   this.ordersPageCount++;
    //   this.processOrderList(false).subscribe((orderData) => {

    //   }, (err) => {
    //     let displayError = err;
    //     if ((err !== undefined) && err.hasOwnProperty('message')) {
    //       displayError = err.message;
    //     }
    //     // this.service.getSharedService().displayToast(displayError);
    //   });
    //   event.target.complete();
    // }, 1000);
  }

  processOrderList(clearContents = false) {
  }

  getOrderId(order = null) {
    let orderIncrementId = '';
    if ((order !== undefined) && (order !== null)) {
      if (order.hasOwnProperty('increment_id') && (order.increment_id !== null) && (order.increment_id !== '')) {
        orderIncrementId = '#' + order.increment_id;
      }
    }
    return orderIncrementId;
  }

  getOrderCreatedTDate(order = null) {
    let orderedDate = '';
    if ((order !== undefined) && (order !== null)) {
      if (order.hasOwnProperty('created_at') && (order.created_at !== null) && (order.created_at !== '')) {
        orderedDate = this.displayFormattedTime(order.created_at);
      }
    }
    return orderedDate;
  }

  getOrderGrandTotal(order = null) {
    let grandTotal = '0';
    if ((order !== undefined) && (order !== null)) {
      if (order.hasOwnProperty('grand_total') && (order.grand_total !== null) && (order.grand_total !== '')) {
        grandTotal = order.grand_total;
      }
    }
    return this.baseCurrencyCode + ' ' + grandTotal;
  }

  selectOrder(order = null) {
    console.log('This is the selected Order : ', order);
    // if ((order === undefined) || (order == null)) {
    //   this.service.getSharedService().displayToast('Invalid product selected!');
    // } else {
    //   this.events.gotoPage({page: 'order-details', params: {
    //     orderId: order.entity_id
    //   }, backward: false});
    // }
  }

  displayFormattedTime(givenRawDateString: string = '') {
    /* let localTimeString = '';
    const monthDisplay = givenRawDate.getMonth() + 1;
    localTimeString += givenRawDate.getFullYear() + '-' + ((monthDisplay < 10) ? '0' : '') + monthDisplay + '-' + givenRawDate.getDate();
    localTimeString += ' ' + givenRawDate.getHours() + ':' + givenRawDate.getMinutes() + ':' + givenRawDate.getSeconds(); */
    if ((givenRawDateString === undefined) || (givenRawDateString === null) || (givenRawDateString.trim() === '')) {
      return '-';
    }
    const givenTimeClean = givenRawDateString.replace(/-/g, '/');
    return moment(givenTimeClean, 'YYYY-MM-DD HH:mm:ss').format(
      this.dateDisplayFormat
    );
  }

  decodeHtmlSpecials(encodedStr: string = '') {
    if ((encodedStr === undefined) || (encodedStr == null) || (encodedStr.trim() === '')) {
      return '';
    }
    const simpleEl = document.createElement('div');
    simpleEl.innerHTML = encodedStr;
    return simpleEl.childNodes.length === 0 ? '' : simpleEl.childNodes[0].nodeValue;
  }

  async displayLoader(loadingMessage: string = '') {
    if (loadingMessage.trim() === '') {
      loadingMessage = this.defaultLoadingMessage;
    }
    const loadObj = await this.loadCtrl.create({
      /* spinner: null, */
      message: loadingMessage,
      translucent: false
      /* cssClass: 'custom-class custom-loading' */
    });
    loadObj.onDidDismiss().then((detail: OverlayEventDetail) => { });
    return loadObj;
  }

}
