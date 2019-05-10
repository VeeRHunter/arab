import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
//import { FirebaseProvider } from './../../providers/firebase/firebase2';
import { SignupPage } from './../signup/signup';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, MenuController } from 'ionic-angular';
// import stylefile from '../assets/main.css' ;
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styleUrls: ['../../assets/main.css']
})
export class LoginPage {
  responseData: any;
  loggedIn;
  xmlLang;
  userData = {
    'username': '', 'password': ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public menu: MenuController, public remoteService: RemoteServiceProvider) {

    if (localStorage.getItem('lang') != undefined) {
    this.xmlLang = JSON.parse(localStorage.getItem('lang'))
    }

    // if(this.loggedIn == "null"  )
    //   {
    //
    //   }else{
    //     this.navCtrl.push(TabsPage);
    //   }
    this.menu = menu;
    console.log(this.xmlLang)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.menu.enable(false);

  }

  ///////// Login function start  //////////////////////

  authLoginUser() {
    if (this.userData.username && this.userData.password) {
      let loading = this.loadingCtrl.create({
        content: "Login",
      });
      loading.present()
      this.remoteService.loginPostData(this.userData, "login").then((result) => {
        loading.dismiss()

        this.responseData = result;
        console.log(this.responseData);
        if (this.responseData.status != "0") {
          console.log(localStorage.setItem('userData', JSON.stringify(this.responseData)));
          console.log(localStorage.setItem('userName', JSON.stringify(this.responseData.name)));
          console.log(localStorage.setItem('userDataID', JSON.stringify(this.responseData.id)));
          console.log(localStorage.setItem('userAvatar', this.responseData.avatar));
          console.log(localStorage.setItem('userCover', JSON.stringify(this.responseData.cover)));
          console.log(localStorage.setItem('loggedIn', "1"));
          this.navCtrl.push(TabsPage);
          return true;
        }
        else {
          this.Toast("Please enter valid username and password");
          return false;
        }
      }, (err) => {
        //Connection failed message
      });
    }
    else {
      this.Toast("Insert username and password");
    }
  }

  ///////// Toast function End  //////////////////////


  ///////// signup function start  //////////////////////

  public signup() {
    this.navCtrl.push(SignupPage);

  }

  ///////// signup function start  //////////////////////

  ///////// Toast function Start  //////////////////////
  public Toast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
  ///////// Toast function End  //////////////////////


  public loading(msg) {
    let toast = this.loadingCtrl.create({
      content: msg,
    });
    toast.present();
  }



}
