import { Component, ViewChild, Inject } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { DOCUMENT } from '@angular/platform-browser';
import { RemoteServiceProvider } from '../providers/remote-service/remote-service';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import 'rxjs/add/operator/map';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { OnlinePage } from '../pages/online/online';
import { SettingsPage } from '../pages/settings/settings';
import { PhotosPage } from '../pages/photos/photos';
import { PagesPage } from '../pages/pages/pages';
import { TabsPage } from '../pages/tabs/tabs';
import { SavedPage } from '../pages/saved/saved';
import{TermsAndConditionsPage}  from '../pages/terms-and-conditions/terms-and-conditions';

import { TranslateService } from '@ngx-translate/core';
import { ProfilePage } from '../pages/profile/profile';
import { GroupsPage } from '../pages/groups/groups';
import { EventsPage } from '../pages/events/events';
import { VideosPage } from '../pages/videos/videos';
import { TrendingPage } from '../pages/trending/trending';
import { ContactUsPage } from "../pages/contact-us/contact-us";
import { Globalization } from '@ionic-native/globalization';

//import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  checkLogin = localStorage.getItem('loggedIn')

  deviceLanguage
  public xmlLang: any;
  //  userName = localStorage.getItem('userName').replace(/['"]+/g, '');
  //  userAvatar = localStorage.getItem('userAvatar').slice(8,-1);
  //  userCover = localStorage.getItem('userCover');


  pages: Array<{ title: string, component: any, icon: string }>;


  constructor( @Inject(DOCUMENT) private document, public alertCtrl: AlertController, public globalization: Globalization, public launchNavigator: LaunchNavigator, public translate: TranslateService, public database: RemoteServiceProvider, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public http: Http) {
    // translate.setDefaultLang('ar');

    this.splashScreen.show();
    // firebase = this.database;
    //this.loadXML('ar')
    this.initializeApp();
    // this.userAvatar ="http://"+this.userAvatar;
    // used for an example of ngFor and navigation

    this.pages = [
      { title: 'profile', component: ProfilePage, icon: 'fa fa-user' },
      { title: 'online-friends', component: OnlinePage, icon: 'fa fa-circle' },
      { title: 'videos', component: VideosPage, icon: 'fa fa-video-camera' },
      { title: 'photos', component: PhotosPage, icon: 'fa fa-camera' },
      { title: 'pages', component: PagesPage, icon: 'fa fa-file' },
      { title: 'groups', component: GroupsPage, icon: 'fa fa-users' },
      { title: 'events', component: EventsPage, icon: 'fa fa-calendar' },
      { title: 'contact-us', component: ContactUsPage, icon: 'fa fa-envelope' },
      { title: 'saved', component: SavedPage, icon: 'fa fa-bookmark' },
      { title: 'discover', component: TrendingPage, icon: 'fa fa-hashtag' },
      { title: 'settings', component: SettingsPage, icon: 'fa fa-cog' },
    ];
    // console.log(this.userName);
    //console.log(this.userCover)
  }

  ionViewDidLoad() {


  }
  initializeApp() {
    this.platform.ready().then(() => {
      //running from browser
      // this.translate.setDefaultLang("ar");
      // this.platform.setDir('rtl', true);
      // this.document.getElementById('appstyle').setAttribute('href', 'assets/css/main-ar.css');
      // this.deviceLanguage = "ar";
      // this.translate.getDefaultLang()
      //running from app

      this.globalization.getPreferredLanguage()
        .then(res => {
          this.translate.use((res.value).split("-")[0]);
          this.translate.setDefaultLang((res.value).split("-")[0]);
          if (this.translate.getDefaultLang() == "ar") {
            this.platform.setDir('rtl', true);
            this.document.getElementById('appstyle').setAttribute('href', 'assets/css/main-ar.css');
          } else {
            this.platform.setDir('ltr', true);
            this.document.getElementById('appstyle').setAttribute('href', 'assets/css/main.css');
          }
        });
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      // this.pushsetup();
    });
  }

  // pushsetup() {
  //   const options: PushOptions = {
  //    android: {},
  //    ios: {
  //        alert: 'true',
  //        badge: true,
  //        sound: 'false'
  //    },
  //    windows: {}
  // };
  //
  // const pushObject: PushObject = this.push.init(options);
  //
  // pushObject.on('notification').subscribe((notification: any) => {
  //   if (notification.additionalData.foreground) {
  //     let youralert = this.alertCtrl.create({
  //       title: 'New Push notification',
  //       message: notification.message
  //     });
  //     youralert.present();
  //   }
  // });
  //
  // pushObject.on('registration').subscribe((registration: any) => {
  //    //do whatever you want with the registration ID
  // });
  //
  // pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
  // }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.push(page.component);
  }



  ngOnInit() {
    console.log('app' + this.checkLogin)
    if ((this.checkLogin == "0") || (!this.checkLogin)) {
      this.nav.setRoot(LoginPage)
    } else {
      this.nav.setRoot(TabsPage)

    }
    //   firebase.user.subscribe (snapshot => {
    //     console.log(snapshot)

    //     if(snapshot == "logged") {
    //       if(localStorage.getItem('userid') == undefined) {
    //         this.nav.setRoot(LoginPage)

    //       }else {
    //         this.database.set_userid(localStorage.getItem('userid'));
    //         firebase.set_active("true");
    //       }



    //       this.nav.setRoot (TabsPage);

    //     }else if(snapshot == null) {

    //       this.nav.setRoot(TabsPage);

    //   //     when deploying uncomment the next and comment above
    // //when in development comment next line and uncommnt above tel snapshot == logged

    //       // this.nav.setRoot(LoginPage);
    //     }
    //   })


  }

  logout() {
    localStorage.setItem('loggedIn', "0");
    localStorage.setItem('userName', "");
    localStorage.setItem('userAvatar', "");
    localStorage.setItem('userData', "");
    localStorage.setItem('userDataID', "");
    localStorage.setItem('userCover', "");

    this.nav.setRoot(LoginPage);

  }
  //  signout () {
  // this.na
  //  console.log("success")

  //  }




}
