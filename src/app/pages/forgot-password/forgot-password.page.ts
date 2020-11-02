import { Component, OnInit } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { FormValidationsService } from '../../services/form-validations/form.validations.service';
import { SharedService } from 'src/app/services/shared-service/shared.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  appTitle = '';
  pageTitle = '';
  fpForm: FormGroup;
  otpForm: FormGroup;
  fpFormEnabled: boolean = true;
  defaultLoadingMessage = 'Please wait...';
  validationMessages = {
    phone: [
      { type: 'isNotEmpty', message: 'Please enter Phone number' },
      { type: 'pattern', message: 'Not a valid  Phone number!' },
      { type: 'customMinLength', message: 'Minimum length for Phone number is 10.' },
      { type: 'customMaxLength', message: 'Minimum length for Phone number is 10.' },
    ],
    otp: [
      { type: 'isNotEmpty', message: 'OTP is required' },
      { type: 'customMinLength', message: 'Minimum length for OTP is 6.' },
    ],
    new_password: [
      { type: 'isNotEmpty', message: 'Password is required' },
      { type: 'customMinLength', message: 'Minimum length for password is 8.' },
    ],
    confirm_password: [
      { type: 'isNotEmpty', message: 'Password is required' },
      { type: 'customMinLength', message: 'Minimum length for password is 8.' },
      { type: 'passwordMismatch', message: 'Passwords does not match' },
    ],
  };

  constructor(
    private navCtrl: NavController,
    private formBuilder: FormBuilder,
    private loadCtrl: LoadingController,
    private sharedService: SharedService
  ) {
    console.log('ForgotPasswordPage constructor');
    // this.appTitle = AppConfigs.appMainTitle;
    this.pageTitle = 'Forgot Password' + (this.appTitle.trim() !== '' ? ' - ' : '') + this.appTitle;
    this.initiateLoginForm();
  }

  ngOnInit() {
    console.log('ForgotPasswordPage ngOnInit');
  }

  ionViewWillEnter() { }

  ionViewDidEnter() {
    console.log('ForgotPasswordPage ionViewDidEnter');
  }

  ionViewWillLeave() {
    console.log('ForgotPasswordPage ionViewWillLeave');
  }

  initiateLoginForm() {
    this.fpForm = this.formBuilder.group({
      phone: new FormControl('', Validators.compose([
        FormValidationsService.isNotEmpty,
        FormValidationsService.customMinLength(10),
        FormValidationsService.customMaxLength(10),
      ]))
    });
    this.otpForm = this.formBuilder.group({
      otp: new FormControl('', Validators.compose([
        FormValidationsService.isNotEmpty,
        FormValidationsService.customMinLength(6)
      ])),
      new_password: new FormControl('', Validators.compose([
        FormValidationsService.isNotEmpty,
        FormValidationsService.customMinLength(8)
      ])),
      confirm_password: new FormControl('', Validators.compose([
        FormValidationsService.isNotEmpty,
      ])),
    });
    this.otpForm.get('confirm_password').setValidators(
      Validators.compose([
        FormValidationsService.isNotEmpty,
        Validators.minLength(8),
        FormValidationsService.passwordMismatch(this.otpForm.get('new_password'))
      ])
    );
    this.fpFormEnabled = true;
  }
  sendResetEmail() {
    if (this.fpForm.valid) {
      this.displayLoader().then(loader => {
        loader.present();
        setTimeout(() => {
          loader.dismiss();
          this.fpFormEnabled = false;
        }, 3000);
      });
    } else {
      this.sharedService.displayToast('All fields are required!')
    }
  }


  cancelRequest() {
    this.navCtrl.navigateRoot(['login']);
  }

  async displayLoader(loadingMessage: string = '') {
    if (loadingMessage.trim() === '') {
      loadingMessage = this.defaultLoadingMessage;
    }
    const loadObj = await this.loadCtrl.create({
      message: loadingMessage,
      translucent: false,
    });
    loadObj.onDidDismiss().then((detail) => {

    });
    return loadObj;
  }

}
