import { Injectable } from '@angular/core';
import { ToastController, Platform } from '@ionic/angular';
import { DataService } from '../data-service/data.service';
import { Storage } from '@ionic/storage';
import { AppConfigs } from 'src/app/configs/app.configs';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private toastDisplaySeconds: number;
  private toastDisplayPosition: string;
  private toastCloseText: string;
  private fixedToastString: string;
  private fixedToastObj: any;

  constructor(
    public toastCtrl: ToastController,
    private dataService: DataService,
    private storage: Storage
  ) {
    this.toastDisplaySeconds = 6;
    this.toastDisplayPosition = 'bottom';
    this.fixedToastString = '';
  }

  setLoginData(data) {
    if (data) {
      this.dataService.loggedUserData = data;
      this.dataService.loginStatus = true;
      this.dataService.authToken = data.authToken;
      this.storage.set(AppConfigs.localStorageName.appNamLoginStatus, true);
      this.storage.set(AppConfigs.localStorageName.appNamLoggedUserData, data);
    }
  }
  async setLoginFromStorageData() {
    this.storage.get(AppConfigs.localStorageName.appNamLoginStatus).then(storedData => {
      if (storedData) {
        this.dataService.loginStatus = storedData;
        this.storage.get(AppConfigs.localStorageName.appNamLoggedUserData).then(storedUserData => {
          if (storedUserData) {
            this.dataService.loggedUserData = storedUserData;
            this.dataService.authToken = storedUserData.authToken;
            return this.dataService.loginStatus;
          }
        });
      }
    });
  }

  setToastCloseText(closeText: string = 'Close') {
    if (closeText !== '') {
      this.toastCloseText = closeText;
    }
  }

  async displayToast(toastMessage: string = '', dismissCallback: Function = null, thisArg: any = null) {
    if ((this.toastCloseText == null) || (this.toastCloseText === '')) {
      this.setToastCloseText();
    }
    if (toastMessage !== '') {
      let toastPosition: 'bottom' | 'top' | 'middle' = 'bottom';
      if (this.toastDisplayPosition === 'bottom') {
        toastPosition = 'bottom';
      } else if (this.toastDisplayPosition === 'top') {
        toastPosition = 'top';
      } else if (this.toastDisplayPosition === 'middle') {
        toastPosition = 'middle';
      }
      console.log('The Toast Delay : ' + this.toastDisplaySeconds);
      const toast = await this.toastCtrl.create({
        message: toastMessage,
        duration: this.toastDisplaySeconds * 1000,
        buttons: [
          {
            text: this.toastCloseText.toLowerCase(),
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            },
          },
        ],
        position: toastPosition,
        color: 'dark',
      });
      toast.onDidDismiss().then((event) => {
        console.log('Dismissed toast');
        if (dismissCallback != null) {
          if (thisArg != null) {
            dismissCallback.apply(thisArg);
          } else {
            dismissCallback();
          }
        }
      }, (err) => {
        console.log('Dismissed toast Error : ');
        console.log(err);
      }).catch((reason) => {
        console.log('Dismissed toast Error Caught : ');
        console.log(reason);
      });
      toast.present();
    }
  }

  async displayFixedToast(toastMessage: string = '', dismissCallback: Function = null, thisArg: any = null) {
    if ((this.toastCloseText == null) || (this.toastCloseText === '')) {
      this.setToastCloseText();
    }
    if (toastMessage !== '') {
      this.fixedToastString += (this.fixedToastString !== '' ? '\n' : '') + toastMessage;

      if ((this.fixedToastObj !== undefined) && (this.fixedToastObj != null)) {
        this.fixedToastObj.setMessage(this.fixedToastString).setDuration(this.toastDisplaySeconds * 1000)
          .onDidDismiss().then((event) => {
            console.log('Dismissed Already Fixed toast');
            this.fixedToastString = '';
            if (dismissCallback != null) {
              if (thisArg != null) {
                dismissCallback.apply(thisArg);
              } else {
                dismissCallback();
              }
            }
            this.fixedToastObj = null;
          }, (err) => {
            console.log('Dismissed Already Fixed toast Error : ');
            console.log(err);
          }).catch((reason) => {
            console.log('Dismissed Already Fixed toast Error Caught : ');
            console.log(reason);
          });
      } else {
        let toastPosition: 'bottom' | 'top' | 'middle' = 'bottom';
        if (this.toastDisplayPosition === 'bottom') {
          toastPosition = 'bottom';
        } else if (this.toastDisplayPosition === 'top') {
          toastPosition = 'top';
        } else if (this.toastDisplayPosition === 'middle') {
          toastPosition = 'middle';
        }
        this.fixedToastObj = await this.toastCtrl.create({
          message: this.fixedToastString,
          position: toastPosition,
          buttons: [
            {
              text: this.toastCloseText.toLowerCase(),
              role: 'cancel',
              handler: () => {
                console.log('Cancel clicked');
              },
            },
          ],
          color: 'dark',
          cssClass: 'custom-ionic-toast-class',
        });
        this.fixedToastObj.onDidDismiss().then((event) => {
          console.log('Dismissed Fixed toast');
          this.fixedToastString = '';
          if (dismissCallback != null) {
            if (thisArg != null) {
              dismissCallback.apply(thisArg);
            } else {
              dismissCallback();
            }
          }
          this.fixedToastObj = null;
        }, (err) => {
          console.log('Dismissed Fixed toast Error : ');
          console.log(err);
        }).catch((reason) => {
          console.log('Dismissed Fixed toast Error Caught : ');
          console.log(reason);
        });
        this.fixedToastObj.present();
      }
    }
  }

}
