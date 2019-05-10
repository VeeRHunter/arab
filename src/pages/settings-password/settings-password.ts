import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';

/**
 * Generated class for the SettingsPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings-password',
  templateUrl: 'settings-password.html',
})
export class SettingsPasswordPage {

  userId
  userName
  oldPassword
  newPassword1
  newPassword2
  responsePass
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public remoteService: RemoteServiceProvider) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.userName = localStorage.getItem('userName').replace(/['"]+/g, '');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPasswordPage');
  }
  public Toast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }
  changePassword(current_password, new_password1, new_password2) {

    if (new_password1.length < 6)
      this.Toast("Password is too short");
    else if (new_password1 != new_password2) {
      this.Toast("Password doesn't match");
    } else {
      this.remoteService.changePassword(current_password, new_password1, this.userId).subscribe(res => {
        console.log(res);
        if (res.status == 1) {
          this.Toast("Password changed successfully");
          this.navCtrl.pop();
        } else {
          this.Toast("Incorrect Password");
        }
      });
    }
  }
  back() {
    this.navCtrl.pop();
  }

}
