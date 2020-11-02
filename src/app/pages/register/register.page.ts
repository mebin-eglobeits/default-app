import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Platform, NavController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core';
import { SharedService } from 'src/app/services/shared-service/shared.service';
import { FormValidationsService } from 'src/app/services/form-validations/form.validations.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  appTitle = '';
  pageTitle = '';
  registerForm: FormGroup;
  loginFormEnabled: boolean;
  webInstances: any[] = [];
  countryList: any[] = [];
  regionList: any[] = [];
  selectedInstance: any = null;
  selectedCountry: any = null;
  selectedRegion: any = null;
  instanceSelectConfig: any;
  countrySelectConfig: any;
  regionSelectConfig: any;
  disableInstanceSelection = false;
  disableCountrySelection = false;
  disableRegionSelection = false;
  defaultLoadingMessage = 'Please wait...';
  validationMessages = {
    email: [
      { type: 'isNotEmpty', message: 'Please enter an email address' },
      { type: 'pattern', message: 'Not a valid email address!' }
    ],
    firstname: [
      { type: 'isNotEmpty', message: 'Please enter First Name' }
    ],
    lastname: [
      { type: 'isNotEmpty', message: 'Please enter Last Name' }
    ],
    houseNo: [
      { type: 'isNotEmpty', message: 'Please enter the House/Flat/Apartment No.' }
    ],
    address1: [
      { type: 'isNotEmpty', message: 'Please enter the Street Address 1' }
    ],
    address2: [
      { type: 'isNotEmpty', message: 'Please enter the Street Address 2' }
    ],
    pincode: [
      { type: 'isNotEmpty', message: 'Please enter the Pincode.' }
    ],
    city: [
      { type: 'isNotEmpty', message: 'Please enter the City.' }
    ],
    district: [
      { type: 'isNotEmpty', message: 'Please enter the District.' }
    ],
    region: [
      { type: 'isNotEmpty', message: 'Please enter the State.' }
    ],
    country: [
      { type: 'isNotEmpty', message: 'Please enter the Country.' }
    ],
    phone: [
      { type: 'isNotEmpty', message: 'Please enter the Phone Number.' }
    ],
    password: [
      { type: 'isNotEmpty', message: 'Password is required' },
      { type: 'minLength', message: 'Minimum length for password is 6.' },
    ],
    confirmPassword: [
      { type: 'isNotEmpty', message: 'Password is required' },
      { type: 'minLength', message: 'Minimum length for password is 6.' },
      { type: 'passwordMismatch', message: 'Passwords does not match' },
    ],
  };

  constructor(
    private router: Router,
    private platform: Platform,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private alertCtrl: AlertController,
    private loadCtrl: LoadingController,
    private modalCtrl: ModalController,
    private ngZone: NgZone,
    private changeDetect: ChangeDetectorRef,
    private sharedService: SharedService
  ) {
    console.log('RegisterPage constructor');
    // this.appTitle = AppConfigs.appMainTitle;
    this.pageTitle = 'Register' + (this.appTitle.trim() !== '' ? ' - ' : '') + this.appTitle;
    this.instanceSelectConfig = {
      header: 'District',
      cssClass: 'app-custom-general-select-options-area',
    };
    this.countrySelectConfig = {
      header: 'Country',
      cssClass: 'app-custom-general-select-options-area',
    };
    this.regionSelectConfig = {
      header: 'State',
      cssClass: 'app-custom-general-select-options-area',
    };
    this.initiateRegisterForm();
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    console.log('RegisterPage ionViewWillEnter');
  }

  ionViewDidEnter() {
    console.log('RegisterPage ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('RegisterPage ionViewWillLeave');
  }

  initiateRegisterForm() {
    this.registerForm = this.formBuilder.group({
      email: new FormControl('', Validators.compose([
        FormValidationsService.isNotEmpty,
        Validators.pattern(/(.+)@(.+){2,}\.(.+){2,}/)
      ])),
      firstname: new FormControl('', Validators.compose([
        FormValidationsService.isNotEmpty
      ])),
      phone: new FormControl('', Validators.compose([
        FormValidationsService.isNotEmpty
      ])),
      password: new FormControl(''),
      confirmPassword: new FormControl('')
    });
    this.registerForm.get('password').setValidators(
      Validators.compose([
        FormValidationsService.isNotEmpty,
        Validators.minLength(6)
      ])
    );
    this.registerForm.get('confirmPassword').setValidators(
      Validators.compose([
        FormValidationsService.isNotEmpty,
        Validators.minLength(6),
        FormValidationsService.passwordMismatch(this.registerForm.get('password'))
      ])
    );

  }

  checkLogin() {

  }

  signUp() {
    if (this.registerForm.valid) {
      const postData = this.registerForm.value;
      console.log('Register Form Data : ');
      console.log(postData);

      const email = (postData.hasOwnProperty('email') && postData.email !== '') ? postData.email : '';
      const password = (postData.hasOwnProperty('password') && postData.password !== '') ? postData.password : '';
      const firstname = (postData.hasOwnProperty('firstname') && postData.firstname !== '') ? postData.firstname : '';
      const lastname = (postData.hasOwnProperty('lastname') && postData.lastname !== '') ? postData.lastname : '';

      this.displayLoader().then((loader) => {
        loader.present();
        loader.dismiss();
      });

    } else {
      this.sharedService.displayToast('Please provide all the required details.');
    }
  }

  closeRegister() {
    this.navCtrl.navigateBack(['login']);
  }

  async displayLoader(loadingMessage: string = '') {
    if (loadingMessage.trim() === '') {
      loadingMessage = this.defaultLoadingMessage;
    }
    const loadObj = await this.loadCtrl.create({
      /* spinner: null, */
      message: loadingMessage,
      translucent: false,
      /* cssClass: 'custom-class custom-loading' */
    });
    loadObj.onDidDismiss().then((detail: OverlayEventDetail) => {

    });
    return loadObj;
  }

}
