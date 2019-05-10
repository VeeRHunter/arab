import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Loading, LoadingController, ActionSheetController, AlertController, Platform } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { EditAlbumPage } from '../edit-album/edit-album';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { UploadImagePage } from '../upload-image/upload-image';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
/**
 * Generated class for the ViewAlbumPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@Component({
  selector: 'page-view-album',
  templateUrl: 'view-album.html',
})
export class ViewAlbumPage {
  userId
  album
  photos
  lastImage: string = null;
  constructor(public photoViewer: PhotoViewer, public filePath: FilePath, private transfer: FileTransfer, private file: File, public camera: Camera, public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, public loadingCtrl: LoadingController, public remoteService: RemoteServiceProvider, public toast: ToastController, public actionSheetCtrl: ActionSheetController, public platform: Platform) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "")
    this.album = navParams.get("album");
    // this.albumDetails(this.album.id)
    console.log(this.album)
    this.albumPhotos(this.album.id, 10, 0)

  }

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      // title: 'Select Image Source',
      buttons: [
        {
          text: 'Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);

          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);

          }
        }
      ]
    });
    actionSheet.present();

  }

  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.navCtrl.push(UploadImagePage, {
        type: 'album',
        id: this.album.id,
        image: this.lastImage
      })
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  presentToast(msg) {
    let toast = this.toast.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewAlbumPage');
  }
  viewPhoto(url) {
    this.photoViewer.show(url);
  }
  albumPhotos(id, limit, offset) {
    this.remoteService.albumPhotos(id, limit, offset, this.userId).subscribe(res => {
      console.log(res);
      this.photos = res;
    })
  }
  albumDetails(album_id) {
    this.remoteService.albumDetails(album_id, this.userId).subscribe(res => {
      this.album = res;
    });
  }

  editPage() {
    this.albumDetails(this.album.id)
    this.navCtrl.push(EditAlbumPage, {
      album: this.album
    })
  }

  deleteAlbum() {
    this.remoteService.deleteAlbum(this.album.id, this.userId).subscribe(res => {
      if (res.status == 1) {
        let toast = this.toast.create({
          message: 'Album deleted successfully',
          duration: 2000,
          position: 'top'
        });
        toast.present();
        this.navCtrl.pop();
      }
    })
  }
  back() {
    this.navCtrl.pop();
  }
}
