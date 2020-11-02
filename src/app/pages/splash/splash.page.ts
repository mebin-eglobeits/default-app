import { Component, OnInit } from '@angular/core';
import { Platform, NavController, LoadingController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { OverlayEventDetail } from '@ionic/core';
import { AppConfigs } from '../../configs/app.configs';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { SharedService } from 'src/app/services/shared-service/shared.service';
import { DataService } from 'src/app/services/data-service/data.service';


@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  appVersion = '';
  appTitle = '';
  appDelayerTime: number;
  splashImage = 'assets/images/icon-white.svg';
  delayerObj: any = null;
  defaultLoadingMessage = 'Please wait...';

  constructor(
    private router: Router,
    private platform: Platform,
    private activatedRoute: ActivatedRoute,
    private navCtrl: NavController,
    private loadCtrl: LoadingController,
    private appDetails: AppVersion,
    private sharedService: SharedService,
    private dataService: DataService
  ) {
    console.log('Splash constructor');
    this.appTitle = AppConfigs.appMainTitle;
  }

  ngOnInit() {
    this.appDelayerTime = AppConfigs.startDelay;
    this.setAppVersionNumber();
  }

  ionViewWillEnter() {
  }

  ionViewDidEnter() {
    console.log('Splash ionViewDidEnter');
    // this.appTitle = AppConfigs.appMainTitle;
    this.setupApp();
  }

  ionViewWillLeave() {
    if (this.delayerObj != null) {
      clearTimeout(this.delayerObj);
    }
  }

  setAppVersionNumber() {
    this.appVersion = '';
    this.platform.ready().then((isReady) => {
      this.appDetails.getVersionNumber().then((value) => {
        console.log('This is the App Value : ', value);
        this.appVersion = value;
      }, (err) => {
        console.log(err);
      }).catch((reason) => {
        console.log(reason);
      });
    }).catch((reason) => {
      console.log(reason);
    });
  }

  setupApp() {
    setTimeout(() => {
      if (this.dataService && this.dataService.loginStatus) {
        // checkAuthtokem
      } else {
        this.sharedService.setLoginFromStorageData().then(data => {
          console.log(data);
          // this.navCtrl.navigateRoot(['/login']);
        })
      }
      this.navCtrl.navigateRoot(['/login']);
    }, this.appDelayerTime);
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
