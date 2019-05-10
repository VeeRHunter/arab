import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { ProfilePage } from '../profile/profile';
import { NotFound_404Page } from '../not-found-404/not-found-404';
import { FriendProfilePage } from '../friend-profile/friend-profile';

/**
 * Generated class for the LatestVisitorsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-latest-visitors',
  templateUrl: 'latest-visitors.html',
})
export class LatestVisitorsPage {
  visitors
  userId
  userData
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public remoteService: RemoteServiceProvider) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.getProfileVisitors(10);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LatestVisitorsPage');
  }

  getProfileVisitors(limit) {
    this.remoteService.getProfileVisitors(this.userId, limit).subscribe(res => {
      console.log(res);
      this.visitors = res;
    })
  }
  back() {
    this.navCtrl.pop();
  }
  GoToProfile(id) {
    let loading = this.loadingCtrl.create({
      content: "Loading",
    });
    loading.present()

    this.remoteService.profileDetailsApiCall(id, this.userId).subscribe(res => {
      loading.dismiss(); this.userData = res;
      res.id = id;
      if (id == this.userId) {
        this.navCtrl.push(ProfilePage, {
          "userData": res
        })
      } else {
        this.remoteService.isBlocked(res.id, this.userId).subscribe(res2 => {
          if (res2.status == 1) {
            this.navCtrl.push(NotFound_404Page, {
              "userData": res,
              "blocked": true
            });
          } else {
            this.navCtrl.push(FriendProfilePage, {
              "userData": res,
              "blocked": false
            });
          }
        });
      }

    });

  }

}
