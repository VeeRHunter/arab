import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
/**
 * Generated class for the EditAlbumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-album',
  templateUrl: 'edit-album.html',
})
export class EditAlbumPage {
  userId
  album
  constructor(public navCtrl: NavController, public navParams: NavParams, public remoteService: RemoteServiceProvider, public toastCtrl: ToastController) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "")
    this.album = navParams.get('album');
    console.log(this.album);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditAlbumPage');
  }
  editAlbum() {
    this.remoteService.editAlbum(this.album.title, this.album.description, this.album.privacy, this.album.id, this.userId).subscribe(res => {
      let toast = this.toastCtrl.create({
        message: 'Album updated successfully',
        duration: 2000,
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
