import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';


/**
 * Generated class for the EditVideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-video',
  templateUrl: 'edit-video.html',
})
export class EditVideoPage {
  userId
  video
  categories
  constructor(public navCtrl: NavController, public navParams: NavParams, public remoteService: RemoteServiceProvider, public toastCtrl: ToastController) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.video = this.navParams.get('video');
    console.log(this.video);
    this.getCategories();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditVideoPage');
  }
  getCategories() {
    this.remoteService.getVideoCategories().subscribe(res => {
      this.categories = res;
    });
  }


  editVideo(title, desc, privacy, category_id, video_id) {
    this.remoteService.editVideo(title, desc, privacy, category_id, video_id, this.userId).subscribe(res => {
      let toast = this.toastCtrl.create({
        message: 'Video updated successfully',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.navCtrl.pop();
    });
  }

  back() {
    this.navCtrl.pop();
  }

}
