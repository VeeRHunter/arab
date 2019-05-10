import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, App, AlertController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { FriendProfilePage } from '../friend-profile/friend-profile';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the FriendsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {
  friendslist;
  FriendsRequest;
  FriendsSuggestion;
  Id: any;
  userData;
  friendID;
  friendData;
  show = false
  constructor(public translate: TranslateService, public alert: AlertController, public app: App, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public remoteService: RemoteServiceProvider) {
    this.Id = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.getFriendsRequestList(this.Id)
    this.getFriendsList(this.Id);
    this.getFriendsSuggestionList(this.Id);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FriendsPage');
  }

  getFriendsList(Id, term = "") {
    this.remoteService.friendsListApiCall(Id, Id, term).subscribe(res => { this.friendslist = res; console.log(res) });
  }

  getFriendsRequestList(Id) {
    this.remoteService.friendsRequestListApiCall(Id).subscribe(res => { this.FriendsRequest = res; console.log(res) });
  }

  getFriendsSuggestionList(Id) {
    let loading = this.loadingCtrl.create({
      content: "",
      spinner: "bubbles",
    });
    loading.present()
    this.remoteService.friendsSuggestionListApiCall(Id).subscribe(res => { loading.dismiss(); this.FriendsSuggestion = res; console.log(res) });
  }

  GoToProfile(id, Id) {
    this.remoteService.profileDetailsApiCall(id, Id).subscribe(res => {
    this.userData = res; res.id = id; this.app.getRootNav().push(FriendProfilePage, { "userData": res })
    });

  }
  addfriend(friendId, index, userid = this.Id) {

    this.remoteService.addFriend(userid, friendId).subscribe(res => {
      console.log(res)
      if (res.status == 1) {
        this.FriendsSuggestion[index].friend_status = 1;
      }
      //  let toast = this.toastCtrl.create({
      //   message: "friend request sent",
      //   duration: 2000
      // });
      // toast.present();
    })
  }

  confirmFriendrequest(friendId, index, userid = this.Id) {
    let added;
    this.translate.get('added').subscribe(value => { added = value; })
    this.remoteService.ConfirmFriendRequest(userid, friendId).subscribe(res => {
      if (res.status == 1) {
        this.FriendsRequest.splice(index, 1)
      };
      let toast = this.toastCtrl.create({
        message: added,
        duration: 2000
      });
      toast.present();
    })
  }

  DeleteFriendrequest(friendId, index, userid = this.Id) {

    let title, message, yes, no, result;
    this.translate.get('friend-request').subscribe(value => { title = value; })
    this.translate.get('delete-friend-request').subscribe(value => { message = value; })
    this.translate.get('yes').subscribe(value => { yes = value; })
    this.translate.get('no').subscribe(value => { no = value; })
    this.translate.get('successfully-done').subscribe(value => { result = value; })

    let alert = this.alert.create({
      title: title,
      message: message,
      buttons: [
        {
          text: yes,
          handler: data => {
            this.remoteService.deleteFriendRequest(friendId, userid).subscribe(res => {
              if (res.status == 1) {
                this.FriendsRequest.splice(index, 1)
                let toast = this.toastCtrl.create({
                  message: result,
                  duration: 2000
                });
                toast.present();
              }
            })
          }
        },
        {
          text: no,
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }
  deleteFriendRequest(id, theUserId, index) {
    let title, message, yes, no, result;
    this.translate.get('friend-request').subscribe(value => { title = value; })
    this.translate.get('cancel-friend-request').subscribe(value => { message = value; })
    this.translate.get('yes').subscribe(value => { yes = value; })
    this.translate.get('no').subscribe(value => { no = value; })
    this.translate.get('successfully-done').subscribe(value => { result = value; })

    let alert = this.alert.create({
      title: title,
      message: message,
      buttons: [
        {
          text: yes,
          handler: data => {
            this.remoteService.deleteFriendRequest(id, theUserId).subscribe(res => {
              if (res.status == 1) {
                this.FriendsSuggestion[index].friend_status = 0;
                this.FriendsRequest.splice(index, 1)
                let toast = this.toastCtrl.create({
                  message: result,
                  duration: 2000
                });
                toast.present();
              }
            })
          }
        },
        {
          text: no,
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();

  }
  back() {
    this.navCtrl.pop();
  }
}
