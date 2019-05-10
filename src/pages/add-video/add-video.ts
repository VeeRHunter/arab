import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';

/**
 * Generated class for the AddVideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-video',
  templateUrl: 'add-video.html',
})
export class AddVideoPage {
  userId
  categories
  title
  description
  privacy
  link
  category
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public remoteService: RemoteServiceProvider, public toastCtrl: ToastController) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.getCategories();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddVideoPage');
  }
  getCategories() {
    this.remoteService.getVideoCategories().subscribe(res => {
      this.categories = res;
    });
  }
  addVideo(title, description, privacy, link, category) {
    let loading = this.loadingCtrl.create({
      content: "",
      spinner: "bubbles",
    });
    loading.present()
    this.remoteService.addNewVideo(title, description, privacy, link, category, this.userId).subscribe(res => {

      console.log(res);
      loading.dismiss();
      let toast = this.toastCtrl.create({
        message: 'Video created successfully',
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
