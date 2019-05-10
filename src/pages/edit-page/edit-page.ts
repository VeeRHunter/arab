import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { Page } from '../page/page';
import { PagesPage } from '../pages/pages';

/**
 * Generated class for the EditPagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-page',
  templateUrl: 'edit-page.html',
})
export class EditPagePage {
  page
  categories
  userId: any
  userName
  userAvatar
  searchQuery
  users
  roles
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public remoteService: RemoteServiceProvider) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.page = this.navParams.get("page");
    this.getCategories();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPagePage');
  }
  getProfileData() {
    this.remoteService.profileDetailsApiCall(this.page.owner, this.userId).subscribe(res => {
      this.userName = res.name;
      this.userAvatar = res.avatar;
    });
  }

  editPage(title, description, category, page_id) {
    this.remoteService.editPage(title, description, category, page_id).subscribe(res => {
      let toast = this.toastCtrl.create({
        message: 'Page updated successfully',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
    this.navCtrl.push(Page, {
      page: this.page,
    });
  }
  getCategories() {
    this.remoteService.getPagesCategories().subscribe(res => {
      this.categories = res;
    });
  }
  searchUsers(term) {
    if (term != "") {
      this.remoteService.searchUsers(term).subscribe(res => {
        this.users = res;
      });
    }
  }
  addRole(first_name, last_name, avatar, id) {
    var role = {
      'first_name': first_name,
      'last_name': last_name,
      'page_role': '1',
      'avatar': avatar,
      'role_user_id': id
    }
    this.roles.push(role);
    this.users = [];
    this.searchQuery = "";
  }

  saveRoles(pageId, roles) {
    var temp = [];
    for (let role of roles) {
      temp[role.role_user_id] = role.page_role;
    }
    console.log(temp);
    // for (var key in temp) {
    //   console.log(key);
    // }
    // temp.forEach((key: any) => {
    //      console.log(temp[key]);
    //  });
    this.remoteService.savePageRoles(pageId, temp, this.userId).subscribe(res => {
      console.log(res);
      let toast = this.toastCtrl.create({
        message: 'Roles saved successfully',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  getPageRoles(id) {
    this.remoteService.getPageRoles(id, this.userId).subscribe(res => {
      this.roles = res;
      this.getProfileData();
      console.log(res);
    });
  }
  removePageRole(user, page_id, index) {
    this.remoteService.removePageRole(user, page_id, this.userId).subscribe(res => {
      this.roles.splice(index, 1);
    });
  }


  deletePage(pageId, userId) {
    console.log(pageId, );
    this.remoteService.deletePage(pageId, userId).subscribe(res => {
      let toast = this.toastCtrl.create({
        message: 'Page deleted successfully',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
    this.navCtrl.push(PagesPage);
  }
  back() {
    this.navCtrl.pop();
  }

}
