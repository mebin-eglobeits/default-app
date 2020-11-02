import { Component, OnInit, NgZone, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { Platform, NavController, AlertController, LoadingController, ModalController, IonInfiniteScroll } from '@ionic/angular';
import { Router, ActivatedRoute, Route, UrlTree, NavigationEnd } from '@angular/router';
import * as moment from 'moment';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core';

import { AppConfigs } from './../../configs/app.configs';
import { FormValidationsService } from 'src/app/services/form-validations/form.validations.service';
import { SharedService } from 'src/app/services/shared-service/shared.service';
import { CustomerAddressInterface } from 'src/app/interfaces/customer-address';
import { ApiService } from 'src/app/services/api-service/api-service.service';

@Component({
  selector: 'app-my-account',
  templateUrl: './my-account.page.html',
  styleUrls: ['./my-account.page.scss'],
})
export class MyAccountPage implements OnInit {

  appTitle = '';
  pageTitle = '';
  baseCurrencyCode = '';
  customerForm: FormGroup;
  currentProfile: any = null;
  profilePic = '';
  customerFormEnabled: boolean;
  customerAddresses: CustomerAddressInterface[] = [];
  defaultLoadingMessage = 'Please wait...';
  dateDisplayFormat = 'ddd, D MMM YYYY, h:mm:ss A';
  validationMessages = {
    firstname: [
      { type: 'isNotEmpty', message: 'Please enter the First Name' },
    ],
    lastname: [
      { type: 'isNotEmpty', message: 'Please enter the Last Name' }
    ]
  };

  constructor(
    private router: Router,
    private platform: Platform,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private loadCtrl: LoadingController,
    private sharedService: SharedService,
    private apiService: ApiService
  ) {
    console.log('MyAccountPage constructor');
    this.appTitle = AppConfigs.appMainTitle;
    this.pageTitle = 'My Profile';
    // this.baseCurrencyCode = this.service.getStoreCurrency();
    this.initiateCustomerForm();
  }

  ngOnInit() {
    this.getCustomerData();
  }
  getCustomerData() {
    this.displayLoader().then(loader => {
      loader.present();
      this.apiService.processGetApi('customer-data.json').subscribe((response: any) => {
        console.log(response)
        if (response) {
          this.currentProfile = response;
          this.setupCustomerForm();
        }
        loader.dismiss();
      }, Error => {
        console.log(Error);
        loader.dismiss();
      })
    })
  }

  ionViewWillEnter() {
    console.log('MyAccountPage ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('MyAccountPage ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('MyAccountPage ionViewWillLeave');
  }

  initiateCustomerForm() {
    this.customerForm = this.formBuilder.group({
      firstname: new FormControl('', Validators.compose([
        FormValidationsService.isNotEmpty
      ])),
      lastname: new FormControl('', Validators.compose([
        FormValidationsService.isNotEmpty
      ]))
    });
    this.disableProfileForm();
  }

  setupCustomerForm() {

    this.profilePic = 'assets/images/avatar.svg';

    let userFirstName = '';
    if (
      this.currentProfile.hasOwnProperty('firstname')
      && (this.currentProfile.firstname !== undefined)
      && (this.currentProfile.firstname != null)
      && (this.currentProfile.firstname !== '')
    ) {
      userFirstName += this.currentProfile.firstname;
    }
    this.customerForm.get('firstname').setValue(userFirstName);

    let userLastName = '';
    if (
      this.currentProfile.hasOwnProperty('lastname')
      && (this.currentProfile.lastname !== undefined)
      && (this.currentProfile.lastname != null)
      && (this.currentProfile.lastname !== '')
    ) {
      userLastName += this.currentProfile.lastname;
    }
    this.customerForm.get('lastname').setValue(userLastName);

  }

  getCustomerEmail(customer = null) {
    let customerEmail = '';
    if ((customer !== undefined) && (customer !== null)) {
      if (customer.hasOwnProperty('email') && (customer.email !== null) && (customer.email !== '')) {
        customerEmail = customer.email;
      }
    }
    return customerEmail;
  }

  getCustomerWebsiteId(customer = null) {
    let customerWebsiteId = '';
    if ((customer !== undefined) && (customer !== null)) {
      if (customer.hasOwnProperty('website_id') && (customer.website_id !== null) && (customer.website_id !== '')) {
        customerWebsiteId = customer.website_id;
      }
    }
    return customerWebsiteId;
  }

  updateProfile() {
    if (this.customerForm.valid) {

      const postData = this.customerForm.value;
      console.log('Profile Form Data : ');
      console.log(postData);

      const customerEmail = this.getCustomerEmail(this.currentProfile);
      const customerWebsiteId = this.getCustomerWebsiteId(this.currentProfile);

      const customrFirstName = (postData.hasOwnProperty('firstname') && (postData.firstname !== '')) ? postData.firstname : '';
      const customrLastName = (postData.hasOwnProperty('lastname') && (postData.lastname !== '')) ? postData.lastname : '';

      const newAddressData: any = {
        email: customerEmail,
        firstname: customrFirstName,
        lastname: customrLastName,
        website_id: customerWebsiteId
      };


    } else {
      this.sharedService.displayToast('Please provide all the required details.');
    }
  }

  resetProfile() {
    this.setupCustomerForm();
    this.disableProfileForm();
  }

  gotoAddresses() {
  }

  signOut() {
    console.log('The user signed-out!');
  }

  disableProfileForm() {
    console.log('The Update Profile Disabled!!');
    this.customerForm.disable();
    this.customerFormEnabled = false;
  }

  enableProfileForm() {
    console.log('The Update Profile Enabled!!');
    this.customerForm.enable();
    this.customerFormEnabled = true;
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
