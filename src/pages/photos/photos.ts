import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { CreateAlbumPage } from '../create-album/create-album';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { ViewAlbumPage } from '../view-album/view-album';

/**
 * Generated class for the PhotosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-photos',
  templateUrl: 'photos.html',
})
export class PhotosPage {
  photos
  albums
  userId
  limit
  offset
  category
  constructor(private photoViewer: PhotoViewer, public navCtrl: NavController, public remoteService: RemoteServiceProvider, public navParams: NavParams) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "")
    this.limit = 10;
    this.offset = 0;
    this.category = "3"
    this.getPhotos('3', 10, 0);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotosPage');
  }
  viewPhoto(url) {
    this.photoViewer.show(url);
  }
  getPhotos(category, limit, offset) {
    this.category = category;
    var album_id;
    if (category == '3' || category == '4') {
      if (category == "3")
        album_id = "all";
      else if (category == "4")
        album_id = "user-all";
      console.log(category, album_id, limit, offset);
      this.remoteService.getPhotos(this.userId, album_id, limit, offset, this.userId).subscribe(res => {
        console.log(res);
        if (offset == 0) {
          this.photos = res;
        }
        else {
          for (let x of res) {
            this.photos.push(x);
          }
        }
        this.offset = offset;
        this.limit = limit;
        this.offset += limit;
      });
    } else {
      var type;
      if (category == "1")
        type = "all";
      else if (category == "2")
        type = "user";
      // console.log(category, album_id, limit, offset);
      this.remoteService.getAlbums(this.userId, limit, offset, type).subscribe(res => {
        console.log(res);
        if (offset == 0) {
          this.albums = res;
        }
        else {
          for (let x of res) {
            this.albums.push(x);
          }
        }
        this.offset = offset;
        this.limit = limit;
        this.offset += limit;
      });
    }
  }
  createAlbum() {
    this.navCtrl.push(CreateAlbumPage);
  }
  viewAlbum(album) {
    this.navCtrl.push(ViewAlbumPage, {
      album: album
    })
  }

  back() {
    this.navCtrl.pop();
  }
}
