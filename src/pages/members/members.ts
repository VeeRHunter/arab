import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController} from 'ionic-angular';
import { RemoteServiceProvider} from './../../providers/remote-service/remote-service';
/**
 * Generated class for the MembersPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-members',
  templateUrl: 'members.html',
})
export class MembersPage {
  members
  constructor(public alert:AlertController, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl:LoadingController,public toastCtrl :ToastController,public remoteService :RemoteServiceProvider) {
    this.members = navParams.get("members");
    console.log(this.members);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MembersPage');
  }
  back() {
    this.navCtrl.pop();
  }

}
