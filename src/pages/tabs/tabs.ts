import { Component, ViewChild } from '@angular/core';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { NewsPage } from '../news/news';
import { MessagesPage } from '../messages/messages';
import { NotificationsPage } from '../notifications/notifications';
import { FriendsPage } from '../friends/friends';
import { Nav, NavController, MenuController } from 'ionic-angular';
import { MenuPage } from '../menu/menu';
import { SearchPage } from "../search/search";

@Component({
  templateUrl: 'tabs.html',
})
export class TabsPage {
  @ViewChild(Nav) nav: Nav;

  tab2Root = NewsPage;
  tab3Root = NotificationsPage;
  tab4Root = MessagesPage;
  tab5Root = FriendsPage;
  tab6Root = MenuPage;
  FriendsRequest
  notifications
  userId

  pages: Array<{ title: string, component: any }>;

  constructor(public remoteService: RemoteServiceProvider, public navCtrl: NavController, public menu: MenuController) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    console.log(localStorage.getItem('loggedIn'))
    this.getFriendsRequestList(this.userId);
    this.getUnreadNotifications();
    this.menu = menu;
    this.menu.enable(true)
    this.FriendsRequest = [];
    this.notifications = [];

  }
  openMenu() {
    this.menu.open();
  }
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }
  getFriendsRequestList(Id) {
    this.remoteService.friendsRequestListApiCall(Id).subscribe(res => { this.FriendsRequest = res; console.log(res) });
  }
  getUnreadNotifications() {
    this.remoteService.getUnreadNotifications(this.userId, 10, 1).subscribe(res => {
      this.notifications = res;
      console.log(res);
    });
  }
  searchPage() {
    this.navCtrl.push(SearchPage);
  }

}
