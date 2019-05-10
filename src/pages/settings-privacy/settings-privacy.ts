import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';


/**
 * Generated class for the SettingsPrivacyPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings-privacy',
  templateUrl: 'settings-privacy.html',
})
export class SettingsPrivacyPage {
  settings
  userId
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public remoteService: RemoteServiceProvider) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.settings = navParams.get('settings');
    if (this.settings["email-notification"] == "1") {
      this.settings["email-notification"] = true
    } else {
      this.settings["email-notification"] = false
    }
    console.log(this.settings);
    // if (this.settings['who-can-view-profile'] == "1")
    //   this.settings['who-can-view-profile'] = "all";
    // else if(this.settings['who-can-view-profile'] == "2")
    //   this.settings['who-can-view-profile'] = "friends";
    // else
    //   this.settings['who-can-view-profile'] = "me";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPrivacyPage');
  }

  settingsPrivacy(wcvp, wcpp, wcsb, wcsm, wcsv, en) {
    console.log();
    if (this.settings["email-notification"] == true) {
      en = "1"
    } else {
      en = "0"
    }
    this.remoteService.settingsPrivacy(wcvp, wcpp, wcsb, wcsm, wcsv, en, this.userId).subscribe(res => {
      console.log(wcvp, wcpp, wcsb, wcsm, wcsv, this.settings["email-notification"], this.userId);
      let toast = this.toastCtrl.create({
        message: 'Settings saved successfully',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
    this.navCtrl.pop();
  }
  back() {
    this.navCtrl.pop();
  }

}
