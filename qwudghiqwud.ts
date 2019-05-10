Skip to content
This repository
Search
Pull requests
Issues
Marketplace
Explore
 @abdelrahmanabdo
 Sign out
 Watch 0
  Star 0
  Fork 1 bolahanna44/arabcall
 Code  Issues 0  Pull requests 0  Projects 0  Wiki Insights 
Branch: master Find file Copy patharabcall/src/app/app.component.ts
7222473  a day ago
@bolahanna44 bolahanna44 audiochat working plus videochat but there is still problem with push…
1 contributor
RawBlameHistory     
167 lines (127 sloc)  4.99 KB
import { AudiohandlerPage } from './../pages/audiohandler/audiohandler';
import { Videohandler2Page } from './../pages/videohandler2/videohandler2';
import { VideohandlerPage } from './../pages/videohandler/videohandler';
import { ChatPage } from './../pages/chat/chat';
import { DatabaseProvider } from './../providers/database/database';
import { TabsPage } from './../pages/tabs/tabs';
import { LoginPage } from './../pages/login/login';
import { Component,ViewChild } from '@angular/core';
import { Platform, AlertController, NavController, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Network } from '@ionic-native/network';
import { HomePage } from '../pages/home/home';
import * as $ from 'jquery'
let firebase,candidate ; 
let caller_data ; let caller_data1 ; 
let temp ; 
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav : NavController
  rootPage = TabsPage ;

  constructor(public events:Events,public database:DatabaseProvider,public alertCtrl: AlertController,public network: Network,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase = this.database ; 
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
     
      
      
    });
    this.events.subscribe('callended', (user) => {
      console.log('temp set to undefined')
      temp = undefined ; 
    })
    document.addEventListener("pause", function() {
    firebase.set_active(Date.now());
  }, true);
    document.addEventListener("resume", function() {
    firebase.set_active("true");
  }, true);
     
    //network = this.network ; 
    this.init () ; 
    // this.test() ; 

  }

  init () {
    let connectSubscription = this.network.onConnect().subscribe(() => {
     console.log("connected")
 

});

// stop connect watch
connectSubscription.unsubscribe();
let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
  let alert = this.alertCtrl.create({
      title: 'Error',
      subTitle: 'Check Your Internet Connection And Try Again',
      buttons: ['OK']
    });
    alert.present();
});

// stop disconnect watch
disconnectSubscription.unsubscribe();

  }

ngOnInit () {

  firebase.user.subscribe (snapshot => {
    console.log(snapshot)

    if(snapshot == "logged") {
      if(localStorage.getItem('userid') == undefined) {
        this.nav.setRoot(LoginPage)
        
      }else {
        this.database.set_userid(localStorage.getItem('userid'));
        firebase.set_active("true");
      }
      
      
      this.database.incominglistener().subscribe (data => {
    
    console.log(data) ; 
    if(data != null) {  caller_data1 = data ; 
    if(data[0] != "undefined"){  
      this.database.caller_data_listen().subscribe(data => {
        console.log('inside app component listener')
        caller_data = data ; 
          if(temp == undefined) {
          if(caller_data1.type == "video"){  
          console.log('video tab set root true')
          this.nav.setRoot(Videohandler2Page , {name:caller_data.name , avatar:caller_data.avatar , number:caller_data1.number  , remote : true});
     }else{  this.nav.setRoot(AudiohandlerPage , {name:caller_data.name , avatar:caller_data.avatar , number:caller_data1.number  , remote : true});
     }
           temp = caller_data1 ; }
       })
      }}
  
  
  })
this.nav.setRoot (TabsPage);
    }else if(snapshot == "not here") {
      this.database.incominglistener().subscribe (data => {
    
    console.log(data) ; 
    if(data != null) {  caller_data1 = data ; 
    if(data[0] != "undefined"){  
      this.database.caller_data_listen().subscribe(data => {
         
        caller_data = data ; 
         
        if(temp == undefined) {
          if(caller_data1.type == "video"){  
          console.log('video tab set root true')
          this.nav.setRoot(Videohandler2Page , {name:caller_data.name , avatar:caller_data.avatar , number:caller_data1.number  , remote : true});
     }else{  this.nav.setRoot(AudiohandlerPage , {name:caller_data.name , avatar:caller_data.avatar , number:caller_data1.number  , remote : true});
     }
           temp = caller_data1 ; }
        

        
       })
      }}
  
  
  })
      this.nav.setRoot(TabsPage);

  //     when deploying uncomment the next and comment above

     
      // this.nav.setRoot(LoginPage);
    }
  })

//   this.database.remotelisten('video').subscribe (data => {
// candidate = data ; 
// console.log(candidate)
// if(candidate != "undefined" && candidate != undefined) {
// //   var candidate = $.map(candidate, function(value, index) {
// //     return [value];
// // });
// console.log(candidate.ice)
//   if(candidate.ice == undefined){
// this.nav.setRoot(VideohandlerPage , {candidate : candidate.message , type : 'remote' , id: candidate.sender });
//     }
// } 
  
//   })


}
  
}

© 2017 GitHub, Inc.
Terms
Privacy
Security
Status
Help
Contact GitHub
API
Training
Shop
Blog
About