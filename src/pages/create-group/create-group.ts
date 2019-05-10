import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { GroupsPage } from '../groups/groups';

/**
 * Generated class for the CreateGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-create-group',
  templateUrl: 'create-group.html',
})
export class CreateGroupPage {

  userId: any
  title
  description
  privacy


  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public remoteService: RemoteServiceProvider) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateGroupPage');
  }

  createGroup(title, description, privacy, userId) {
    this.remoteService.createGroup(title, description, title, privacy, userId).subscribe(res => {
      let toast = this.toastCtrl.create({
        message: 'Group created successfully',
        duration: 3000,
        position: 'top'
      });

      toast.present();
    });
    this.navCtrl.push(GroupsPage);

  }

  back() {
    this.navCtrl.push(GroupsPage);
  }

}
