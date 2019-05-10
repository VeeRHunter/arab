import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { SettingsGeneralPage } from '../settings-general/settings-general';
import { SettingsNotificationsPage } from '../settings-notifications/settings-notifications';
import { SettingsPasswordPage } from '../settings-password/settings-password';
import { SettingsPrivacyPage } from '../settings-privacy/settings-privacy';
import { SettingsBlockingPage } from '../settings-blocking/settings-blocking';
import { SettingsDeletePage } from '../settings-delete/settings-delete';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  settings
  userId
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public remoteService: RemoteServiceProvider) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }
  generalPage() {
    this.navCtrl.push(SettingsGeneralPage);
  }
  notificationsPage() {
    let loading = this.loadingCtrl.create({
      content: "Loading",
    });
    loading.present()
    this.remoteService.getSettingsNotifications(this.userId).subscribe(res => {
      this.settings = res;
      loading.dismiss();
      this.navCtrl.push(SettingsNotificationsPage, {
        'settings': this.settings
      });
    });
  }
  passwordPage() {
    this.navCtrl.push(SettingsPasswordPage);
  }
  privacyPage() {
    let loading = this.loadingCtrl.create({
      content: "Loading",
    });
    loading.present()
    this.remoteService.getSettingsNotifications(this.userId).subscribe(res => {
      this.settings = res;
      loading.dismiss();
      this.navCtrl.push(SettingsPrivacyPage, {
        'settings': this.settings
      });
    });
  }
  blockingPage() {
    this.navCtrl.push(SettingsBlockingPage);
  }
  deletePage() {
    this.navCtrl.push(SettingsDeletePage);
  }
  back() {
    this.navCtrl.pop();
  }

}
