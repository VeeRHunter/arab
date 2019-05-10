import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the ContactUsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-contact-us',
  templateUrl: 'contact-us.html',
})
export class ContactUsPage {
  userId
  name
  email
  subject
  message
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public remoteService: RemoteServiceProvider) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactUsPage');
  }
  contactUs(name, email, subject, message) {
    this.remoteService.contactUs(name, email, subject, message, this.userId).subscribe(res => {
      let toast = this.toastCtrl.create({
        message: 'Thanks for contacting us',
        duration: 3000,
      });
      toast.present();
    })
    this.navCtrl.push(TabsPage);

  }
  back() {
    this.navCtrl.push(TabsPage);
  }

}
