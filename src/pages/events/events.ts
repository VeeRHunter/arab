import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { TabsPage } from '../tabs/tabs';
import { CreateEventPage } from '../create-event/create-event';
import { EventPage } from '../event/event';
import { FriendProfilePage } from '../friend-profile/friend-profile';
import { NotFound_404Page } from '../not-found-404/not-found-404';
/**
 * Generated class for the EventsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-events',
  templateUrl: 'events.html',
})
export class EventsPage {


  events
  categories
  userId: any;
  search
  category
  type
  page
  birthdays = {
    todays: [],
    thismonth: [],
    months: []
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public remoteService: RemoteServiceProvider) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.type = "upcoming"
    this.category = "all"
    this.page = 1;
    this.getEvents(this.type, this.category, "", this.userId, 1);
    // this.getBirthdays();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad EventsPage');
  }

  getMonth(month) {
    if (month == 1)
      return "january";
    else if (month == 2)
      return "february";
    else if (month == 3)
      return "march";
    else if (month == 4)
      return "april";
    else if (month == 5)
      return "may";
    else if (month == 6)
      return "june";
    else if (month == 7)
      return "july";
    else if (month == 8)
      return "august";
    else if (month == 9)
      return "september";
    else if (month == 10)
      return "october";
    else if (month == 11)
      return "november";
    else if (month == 12)
      return "december";
  }

  getBirthdays() {
    this.remoteService.getBirthdays(this.userId).subscribe(res => {
      console.log(res);
      this.birthdays = res;
    })
  }

  getEvents(type, categoryId, term, userId, page) {

    if (type == 'birthdays') {
      console.log("hi");
      this.getBirthdays();
      console.log(this.birthdays.todays);
    } else {

      $('#noEvents').hide();
      let loading = this.loadingCtrl.create({
        content: "Loading",
      });


      $('#selectType').on('change', function() {
        categoryId = "all";

        $('#selectCat').val("all");
        console.log("hello from selectType")
      });
      this.type = type;
      this.category = categoryId;
      if (page > 1) {
        this.remoteService.getEvents(type, categoryId, term, userId, page, 2).subscribe(res => {

          if (res.events.length == 0) {
            $('#more').hide();
          }
          for (let x of res.events) {
            this.events.push(x);
          }
        });
        this.page = page;
      }
      else {
        this.page = page;
        loading.present()
        this.remoteService.getEvents(type, categoryId, term, userId, page, 2).subscribe(res => {
          if (res.events.length > 0) {
            $('#more').show();
          }
          else {
            $('#noEvents').show();
            $('#more').hide();
          }
          loading.dismiss();
          // console.log(type);
          // console.log(this.category);
          // console.log(term);
          this.events = res.events;
          this.categories = res.categories;
          // console.log(res);
        });

        this.search = term;
      }
    }
  }
  createEventPage() {
    this.navCtrl.push(CreateEventPage);
  }
  goToEventPage(event) {
    this.navCtrl.push(EventPage, {
      'event': event
    });
  }
  GoToProfile(id) {
    let loading = this.loadingCtrl.create({
      content: "",
      spinner: "bubbles",
    });
    loading.present()
    this.remoteService.profileDetailsApiCall(id, this.userId).subscribe(res => {
      loading.dismiss();
      // this.userData = res ;
      // res.id = id;
      this.remoteService.isBlocked(res.id, this.userId).subscribe(res2 => {
        if (res2.status == 1) {
          this.navCtrl.push(NotFound_404Page, {
            "userData": res,
            "blocked": true
          });
        } else {
          this.navCtrl.push(FriendProfilePage, {
            "userData": res,
            "blocked": false
          });
        }
      });
    });
  }
  back() {
    this.navCtrl.push(TabsPage);
  }

}
