import{TermsAndConditionsPage}  from '../terms-and-conditions/terms-and-conditions';
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { TabsPage } from '../tabs/tabs';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';

/**

 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  responseData: any;
  userData = {
    "firstname": "", "lastname": "", "username": "", "email_address": "", "password": ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public toastCtrl: ToastController, public remoteService: RemoteServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  createAccount() {

    if (this.userData.firstname && this.userData.lastname && this.userData.email_address && this.userData.password) {
      this.remoteService.signupPostData(this.userData, "signup").then((result) => {
        this.responseData = result;
        console.log(this.responseData);
        if (this.responseData.status == 1) {
          localStorage.setItem('userData', JSON.stringify(this.responseData));
          localStorage.setItem('userName', JSON.stringify(this.responseData.name));
          localStorage.setItem('userDataID', JSON.stringify(this.responseData.id));
          localStorage.setItem('userAvatar', JSON.stringify(this.responseData.avatar));
          localStorage.setItem('userCover', JSON.stringify(this.responseData.cover));
          localStorage.setItem('loggedIn', "1");
          this.navCtrl.setRoot(TermsAndConditionsPage);
        }
        else {
          this.presentToast(this.responseData.message);
        }



      }, (err) => {
        //Connection failed message
      });
    }
    else {
      this.presentToast("Please insert all data");
    }

  }
  mainPageNav() {
    this.navCtrl.push(LoginPage);
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}
