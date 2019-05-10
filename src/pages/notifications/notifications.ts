import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, App } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { TimeProvider } from './../../providers/time/time';
import { Page } from '../page/page';
import { LatestVisitorsPage } from '../latest-visitors/latest-visitors';
import { VideoPage } from '../video/video';
import { DisplayPostPage } from '../display-post/display-post';
import { TranslateService } from '@ngx-translate/core';
import { EventPage } from '../event/event';
import { GroupPage } from '../group/group';
import { FriendProfilePage } from '../friend-profile/friend-profile';

/**
 * Generated class for the NotificationsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  userId
  notifications;
  unread;
  userData
  page
  pageNum
  constructor(public time: TimeProvider, public translate: TranslateService, private app: App, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public remoteService: RemoteServiceProvider, public loading: LoadingController) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.pageNum = 1;
    this.getNotifications(1);
    this.getUnreadNotifications();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationsPage');
  }

  pressed(){
    console.log("pressed");
  }
  longPress(id){
    console.log("active");
    console.log("myDropdown" + id);
    document.getElementById("myDropdown" + id).classList.toggle("show");
  }
  released(){
    console.log("released");
  }

  doRefresh(refresher) {
    this.getNotifications(1);
    this.getUnreadNotifications();
    if (refresher != 0)
      refresher.complete();
  }

  getNotifications(page) {
    let loading = this.loading.create({
      content: "Loading",
    });
    loading.present()

    $('#more').show();

    if (page > 1) {
      this.remoteService.getNotifications(this.userId, 10, page).subscribe(res => {
        loading.dismiss();
        if (res.length >= 10) {
          $('#more').show();
        } else {
          if (res.length == 0)
            $('#noNoti').show();
          $('#more').hide();
        }
        for (let x of res) {
          this.notifications.push(x);
        }
      });
      this.pageNum = page;
    } else {
      this.pageNum = page;
      this.remoteService.getNotifications(this.userId, 10, page).subscribe(res => {
        loading.dismiss();
        if (res.length >= 10) {
          $('#more').show();
        } else {
          if (res.length == 0)
            $('#noNoti').show();
          $('#more').hide();
        }
        this.notifications = res;
        console.log(res);
      });
    }
  }

  getUnreadNotifications() {
    this.remoteService.getUnreadNotifications(this.userId, 10, 1).subscribe(res => {
      this.unread = res;
      console.log(res);
    });
  }

  deleteNotification(id, index) {
    this.remoteService.deleteNotification(this.userId, id).subscribe(res => {
      console.log(res);

      var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      this.notifications.splice(index, 1);
      if (this.notifications.length == 0) {
        $('#noNoti').show();
      }
    });
  }

  cancel(){
    var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
  }

  markReadNotification(id, type, index) {
    this.remoteService.markReadNotification(this.userId, id, type).subscribe(res => {
      var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      if (type == '1') {
        console.log("green");
        console.log('#check' + id);
        $('#check' + id).css("color", 'green');
        $('#' + id).css("background-color", 'transparent');
        this.notifications[index].mark_read = "1";
      } else {
        $('#check' + id).css("color", 'black');
        $('#' + id).css("background-color", '#e2e2e2');
        this.notifications[index].mark_read = "0";

      }
    })
  }
  GoToProfile(id) {
    let loading = this.loadingCtrl.create({
      content: "Loading",
    });
    loading.present()

    this.remoteService.profileDetailsApiCall(id, this.userId).subscribe(res => {
      loading.dismiss(); this.userData = res; res.id = id;
      this.app.getRootNav().push(FriendProfilePage, { "userData": res })
    });
  }
  getPageDetails(id) {
    let loading = this.loading.create({
      content: "Loading",
    });
    loading.present()
    this.remoteService.getPageDetails(this.userId, id).subscribe(res => {
      console.log(res);
      this.page = res;
      this.app.getRootNav().push(Page, {
        page: this.page
      })
      loading.dismiss()
    })
  }

  getTime(time) {
    return this.time.getTime(time);
  }

  gotoNotification(type, notification, index) {

    this.markReadNotification(notification.id, '1', index)
    switch (type) {
      case "profile.view": {
        this.app.getRootNav().push(LatestVisitorsPage);
        break;
      }
      case "page.like": {
        this.getPageDetails(notification.type_id)
        break;
      }
      case "page.new.role": {
        this.app.getRootNav().push(Page, {
          page: notification.page[0]
        });
        break;
      }
      case "page.invite": {
        this.app.getRootNav().push(Page, {
          page: notification.page[0]
        });
        break;
      }
      case "feed.like": {
        notification.feed[0].hidden = false;
        this.app.getRootNav().push(DisplayPostPage, {
          post: notification.feed[0]
        });
        break;
      }
      case "post-on-timeline": {
        notification.feed[0].hidden = false;
        this.app.getRootNav().push(DisplayPostPage, {
          post: notification.feed[0]
        });
        break;
      }
      case "feed.mention": {
        notification.feed[0].hidden = false;
        this.app.getRootNav().push(DisplayPostPage, {
          post: notification.feed[0]
        });
        break;
      }
      case "feed.tag": {
        notification.feed[0].hidden = false;
        this.app.getRootNav().push(DisplayPostPage, {
          post: notification.feed[0]
        });
        break;
      }
      case "feed.comment": {
        notification.feed[0].hidden = false;
        this.app.getRootNav().push(DisplayPostPage, {
          post: notification.feed[0]
        });
        break;
      }
      case "feed.comment.reply": {
        notification.feed[0].hidden = false;
        this.app.getRootNav().push(DisplayPostPage, {
          post: notification.feed[0]
        });
        break;
      }
      case "feed.shared": {
        notification.feed[0].hidden = false;
        this.app.getRootNav().push(DisplayPostPage, {
          post: notification.feed[0]
        });
        break;
      }
      case "feed.like.comment": {
        notification.feed[0].hidden = false;
        this.app.getRootNav().push(DisplayPostPage, {
          post: notification.feed[0]
        });
        break;
      }
      case "video.comment": {
        this.app.getRootNav().push(VideoPage, {
          video: notification.video[0]
        });
        break;
      }
      case "video.like": {
        this.app.getRootNav().push(VideoPage, {
          video: notification.video[0]
        });
        break;
      }
      case "video.comment.reply": {
        this.app.getRootNav().push(VideoPage, {
          video: notification.video[0]
        });
        break;
      }
      case "event.rsvp": {
        this.app.getRootNav().push(EventPage, {
          event: notification.event[0]
        });
        break;
      }
      case "event.invite": {
        this.app.getRootNav().push(EventPage, {
          event: notification.event[0]
        });
        break;
      }
      case "group.post": {
        this.app.getRootNav().push(GroupPage, {
          group: notification.group[0]
        });
        break;
      }
      case "group.add.member": {
        this.app.getRootNav().push(GroupPage, {
          group: notification.group[0]
        });
        break;
      }
      case "group.role": {
        this.app.getRootNav().push(GroupPage, {
          group: notification.group[0]
        });
        break;
      }
      case "relationship.follow": {
        console.log(notification.userid);
        this.GoToProfile(notification.userid);
        break;
      }
      case "relationship.confirm": {
        console.log(notification.userid);
        this.GoToProfile(notification.userid);
        break;
      }
      case "relationship.add": {
        console.log(notification.userid);
        this.GoToProfile(notification.userid);
        break;
      }
      default: {
        break;
      }
    }
  }

}
