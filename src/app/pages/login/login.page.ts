import { Component, OnInit, NgZone, ChangeDetectorRef } from '@angular/core';
import { Platform, NavController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { OverlayEventDetail } from '@ionic/core';
import { SharedService } from 'src/app/services/shared-service/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  appTitle = '';
  pageTitle = '';
  loginForm: FormGroup;
  loginFormEnabled: boolean;
  defaultLoadingMessage = 'Please wait...';
  validationMessages = {
    username: [
      { type: 'isNotEmpty', message: 'Please enter an email address' },
      { type: 'pattern', message: 'Not a valid email address!' }
    ],
    password: [{ type: 'isNotEmpty', message: 'Please enter password' }]
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private loadCtrl: LoadingController,
    private sharedService: SharedService
  ) {
    console.log('LoginPage constructor');
    // this.appTitle = AppConfigs.appMainTitle;
    this.pageTitle = 'Login';
    this.initiateLoginForm();
  }

  ngOnInit() {
    console.log('LoginPage ngOnInit');
  }

  ionViewWillEnter() {
    console.log('LoginPage ionViewWillEnter');
    console.log(this.activatedRoute);
  }

  ionViewDidEnter() {
    console.log('LoginPage ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('LoginPage ionViewWillLeave');
  }

  initiateLoginForm() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        Validators.pattern(/(.+)@(.+){2,}\.(.+){2,}/)
      ])),
      password: new FormControl('', Validators.compose([
      ]))
    });
  }

  forgotPassword() {
    this.navCtrl.navigateForward(['forgot-password']);
  }

  signUp() {
    this.navCtrl.navigateForward(['register']);
  }

  changeDistrict() {
    this.navCtrl.navigateRoot(['instance-select'], { queryParams: { action: 'login' } });
  }

  checkLogin() {
    if (this.loginForm.valid) {

      const postData = this.loginForm.value;
      console.log('Login Form Data : ');
      console.log(postData);

      const username = (postData.hasOwnProperty('username') && postData.username !== '') ? postData.username : '';
      const password = (postData.hasOwnProperty('password') && postData.password !== '') ? postData.password : '';

      if ((username !== '') && (password !== '')) {

        this.displayLoader().then((loader) => {
          loader.present();
          setTimeout(() => {
            loader.dismiss();
            this.navCtrl.navigateRoot(['/menu']);
          }, 2000);
        });

      } else {
        this.sharedService.displayToast('Please provide all the required details.');
      }

    } else {
      this.sharedService.displayToast('Please provide all the required details.');
    }
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
