import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';

/**
 * Generated class for the SettingsGeneralPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-settings-general',
  templateUrl: 'settings-general.html',
})
export class SettingsGeneralPage {
  user = {
    'first_name': '',
    'last_name': '',
    'email_address': '',
    'username': '',
    'gender': '',
    'state': '',
    'country': '',
    'city': '',
    'bio': '',
    'birth_day': '',
    'birth_month': '',
    'birth_year': ''
  }
  userId
  myDate = '';
  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public remoteService: RemoteServiceProvider) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.getUserData();

    console.log(this.user);
  }

  getMonth(month) {
    if (month == "january")
      return "01";
    else if (month == "february")
      return "02";
    else if (month == "march")
      return "03";
    else if (month == "april")
      return "04";
    else if (month == "may")
      return "05";
    else if (month == "june")
      return "06";
    else if (month == "july")
      return "07";
    else if (month == "august")
      return "08";
    else if (month == "september")
      return "09";
    else if (month == "october")
      return "10";
    else if (month == "november")
      return "11";
    else if (month == "december")
      return "12";
  }
  getMonthWord(month) {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsGeneralPage');
  }
  getUserData() {
    this.remoteService.getUserData('first_name', this.userId).subscribe(res => { this.user.first_name = res });
    this.remoteService.getUserData('last_name', this.userId).subscribe(res => { this.user.last_name = res });
    this.remoteService.getUserData('email_address', this.userId).subscribe(res => { this.user.email_address = res });
    this.remoteService.getUserData('username', this.userId).subscribe(res => { this.user.username = res });
    this.remoteService.getUserData('gender', this.userId).subscribe(res => { this.user.gender = res });
    this.remoteService.getUserData('state', this.userId).subscribe(res => { this.user.state = res });
    this.remoteService.getUserData('country', this.userId).subscribe(res => { this.user.country = res });
    this.remoteService.getUserData('city', this.userId).subscribe(res => { this.user.city = res });
    this.remoteService.getUserData('bio', this.userId).subscribe(res => { this.user.bio = res });
    this.remoteService.getUserData('birth_year', this.userId).subscribe(res => {
      this.user.birth_year = res;
      this.myDate = res;
      this.remoteService.getUserData('birth_month', this.userId).subscribe(res1 => {
        this.user.birth_month = res1;
        this.myDate += ('-' + this.getMonth(res1));
        this.remoteService.getUserData('birth_day', this.userId).subscribe(res2 => {
          this.user.birth_day = res2;
          this.myDate += ('-' + res2)
        });
      });
    });

    //this.myDate = this.user.birth_year + '-' + this.getMonth(this.user.birth_month) + '-' + this.user.birth_day ;
    //  = '2017-11-15';
    console.log(this.myDate);
  }

  validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  saveSettings(first, last, email, username, gender, country, city, state, bio, day, month, year, myDate) {
    // console.log(DOB);
    year = (myDate.substring(0, 4));
    month = (this.getMonthWord(parseInt(myDate.substring(5, 7))));
    day = (myDate.substring(8, 10));
    if (this.validateEmail(email)) {
      $('#email').removeClass("alert alert-danger");
      $('#wrongEmail').hide();
      this.remoteService.settingsGeneral(first, last, email, username, gender, country, city, state, bio, this.userId, day, month, year).subscribe(res => {
        console.log(res);
        if(res.status == 1){
          let toast = this.toastCtrl.create({
            message: 'Settings saved successfully',
            duration: 3000,
            position: 'top'
          });
          toast.present();
          this.navCtrl.pop();
        }else{
          let toast = this.toastCtrl.create({
            message: res.message,
            duration: 3000,
            position: 'top'
          });
          toast.present();
        }
        });

    }else{
      $('#email').addClass("alert alert-danger");
      $('#wrongEmail').show();

    }
  }

  back() {
    this.navCtrl.pop();
  }

}
