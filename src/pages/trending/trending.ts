import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
/**
 * Generated class for the TrendingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-trending',
  templateUrl: 'trending.html',
})
export class TrendingPage {
  userId
  hashtags
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public remoteService: RemoteServiceProvider) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.getHashtag()
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TrendingPage');
  }
  getHashtag() {
    this.remoteService.getHashtag(this.userId).subscribe(res => {
      this.hashtags = res.hashtags;
    });
  }

  back() {
    this.navCtrl.pop();
  }

}
