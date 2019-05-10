import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';

/**
 * Generated class for the CreateAlbumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-album',
  templateUrl: 'create-album.html',
})
export class CreateAlbumPage {

  title
  description
  privacy
  userId
  constructor(public navCtrl: NavController, public navParams: NavParams, public remoteService: RemoteServiceProvider, public toastCtrl: ToastController) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateAlbumPage');
  }
  createAlbum(title, desc, privacy) {
    this.remoteService.createAlbum(title, desc, privacy, this.userId).subscribe(res => {
      let toast = this.toastCtrl.create({
        message: 'Album created successfully',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
    this.navCtrl.pop();
  }
  back() {
    this.navCtrl.pop();
  }

}
