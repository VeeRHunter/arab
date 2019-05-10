import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { PagesPage } from '../pages/pages';
/**
 * Generated class for the CreatePagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-create-page',
  templateUrl: 'create-page.html',
})
export class CreatePagePage {
  userId: any
  categories
  title
  description
  category

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public remoteService: RemoteServiceProvider) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.getCategories();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreatePagePage');
  }

  getCategories() {
    this.remoteService.getPagesCategories().subscribe(res => {
      this.categories = res;
    });
  }

  createPage(title, description, category, userId) {
    this.remoteService.createPage(title, description, category, userId).subscribe(res => {
      let toast = this.toastCtrl.create({
        message: 'Page created successfully',
        duration: 3000,
        position: 'top'
      });

      toast.present();
    });
    this.navCtrl.push(PagesPage);

  }

  back() {
    this.navCtrl.push(PagesPage);
  }

}
