import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Platform } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { NotFound_404Page } from '../not-found-404/not-found-404';
import { FriendProfilePage } from '../friend-profile/friend-profile';
import { ProfilePage } from '../profile/profile';
import { GroupPage } from '../group/group';
import { EventPage } from '../event/event';
import { VideoPage } from '../video/video';
import { Page } from '../page/page';
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  searchQuery
  searchRes
  userId
  userData
  type
  dir = "ltr"
  constructor(public paltform: Platform, public loadingCtrl: LoadingController, public remoteService: RemoteServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.searchRes = {}
    if (this.paltform.dir() == "rtl")
      this.dir = "rtl";
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  search(term, type) {
    let loading = this.loadingCtrl.create({
      content: "",
      spinner: "bubbles",
      showBackdrop: true,
    });
    loading.present()
    console.log(type);
    this.remoteService.search(term, type, this.userId).subscribe(res => {
      loading.dismiss();
      console.log(res);
      this.searchRes = res;
      this.type = type;
    })
  }

  back() {
    this.navCtrl.pop();
  }

  viewGroup(id) {
    this.remoteService.groupDetails(id, this.userId).subscribe(res => {
      this.navCtrl.push(GroupPage, {
        group: res
      })
    })
  }

  viewEvent(id) {
    this.remoteService.eventDetails(id, this.userId).subscribe(res => {
      this.navCtrl.push(EventPage, {
        event: res
      })
    })
  }

  viewVideo(id) {
    this.remoteService.videoDetails(id, this.userId).subscribe(res => {
      this.navCtrl.push(VideoPage, {
        video: res
      })
    })
  }

  viewPage(id) {
    this.remoteService.getPageDetails(this.userId, id).subscribe(res => {
      this.navCtrl.push(Page, {
        page: res
      })
    })
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
