import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { GroupPage } from '../group/group';
import { GroupsPage } from '../groups/groups';

/**
 * Generated class for the EditGroupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-group',
  templateUrl: 'edit-group.html',
})
export class EditGroupPage {

  group
  canPost
  canAddMember
  privacy

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public remoteService: RemoteServiceProvider) {
    this.group = navParams.get("group");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditGroupPage');
  }

  editGroup(title, description, privacy, groupId, canPost, canAddMember) {
    this.remoteService.editGroup(title, description, privacy, groupId, canPost, canAddMember).subscribe(res => {
      let toast = this.toastCtrl.create({
        message: 'Group updated successfully',
        duration: 3000,
        position: 'top'
      });

      toast.present();
    });
    this.navCtrl.push(GroupPage, {
      group: this.group
    });
  }
  deleteGroup(groupId) {
    this.remoteService.deleteGroup(groupId).subscribe(res => {
      let toast = this.toastCtrl.create({
        message: 'Group deleted successfully',
        duration: 3000,
        position: 'top'
      });

      toast.present();
    });
    this.navCtrl.push(GroupsPage);
  }

  back() {
    this.navCtrl.pop();
  }

}
