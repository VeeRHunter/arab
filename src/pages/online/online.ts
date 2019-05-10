import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';

/**
 * Generated class for the OnlinePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-online',
  templateUrl: 'online.html',
})
export class OnlinePage {
  public userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
  online
  constructor(public navCtrl: NavController, public navParams: NavParams, public remoteService: RemoteServiceProvider) {
    this.getOnlineFriends(this.userId)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OnlinePage');
  }

  getOnlineFriends(userID = this.userId) {
    this.remoteService.onlineFriends(userID).subscribe(res => { this.online = res; console.log(this.online) });

  }

  back() {
    this.navCtrl.pop();
  }

}
