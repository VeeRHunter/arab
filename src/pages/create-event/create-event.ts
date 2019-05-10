import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { EventsPage } from '../events/events';

/**
 * Generated class for the CreateEventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-create-event',
  templateUrl: 'create-event.html',
})
export class CreateEventPage {
  event = {
    'title': '',
    'description': '',
    'category_id': '',
    'location': '',
    'start': '',
    'end': '',
    'privacy': ''
  }
  categories
  userId
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public remoteService: RemoteServiceProvider) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.getCategories();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CreateEventPage');
  }
  getCategories() {
    this.remoteService.getEventCategories().subscribe(res => {
      this.categories = res;
    });
  }
  getDate(date) {
    console.log(date);
    var y = date.substring(0, 4);
    var m = date.substring(5, 7);
    var d = date.substring(8, 10);
    d = (parseInt(d)).toString();
    var h = date.substring(11, 13);
    var min = date.substring(14, 16);
    var type

    if (parseInt(h) >= 12) {
      type = "pm";
      if (parseInt(h) > 12) {
        h = (parseInt(h) - 12).toString();
      }
    } else {
      type = "am";
      if (parseInt(h) == 0) {
        h = "12";
      } else {
        h = (parseInt(h)).toString();
      }
    }
    return [y, m, d, h, min, type];
  }
  createEvent(title, description, category_id, location, start, end, privacy) {
    var s = this.getDate(start);
    var e = this.getDate(end);
    this.remoteService.createEvent(title, description, category_id, location, location, s[2], s[1], s[0], s[3], s[4], s[5], privacy, e[2], e[1], e[0], e[3], e[4], e[5], this.userId).subscribe(res => {
      let toast = this.toastCtrl.create({
        message: 'Event created successfully',
        duration: 3000,
        position: 'top'
      });

      toast.present();
    });
    this.navCtrl.push(EventsPage);
  }
  back() {
    this.navCtrl.pop();
  }

}
