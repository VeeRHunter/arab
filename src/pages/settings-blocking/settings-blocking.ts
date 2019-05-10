import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';


/**
 * Generated class for the SettingsBlockingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings-blocking',
  templateUrl: 'settings-blocking.html',
})
export class SettingsBlockingPage {

  userId
  blocked
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public remoteService: RemoteServiceProvider) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.getAllBlocked();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsBlockingPage');

  }
  unblockUser(id, index) {
    this.remoteService.unblockUser(id, this.userId).subscribe(res => {
      // console.log(res);
      if (res.status == 1) {
        let toast = this.toastCtrl.create({
          message: 'User unblocked successfully',
          duration: 3000,
          position: 'top'
        });
        toast.present();
        this.blocked.splice(index, 1);
      }
    });
  }
  getAllBlocked() {
    this.remoteService.getAllBlocked(this.userId).subscribe(res => {
      console.log(res);
      this.blocked = res;
    });
  }
  back() {
    this.navCtrl.pop();
  }

}
