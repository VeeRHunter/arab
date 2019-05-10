import { Component } from '@angular/core';
import { NavController, NavParams ,LoadingController} from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import {ChatPage} from '../chat/chat';
import {TabsPage} from '../tabs/tabs';


/**
 * Generated class for the MessagesPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  messages= [];
  chat;

  public userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");

  constructor(public navCtrl: NavController, public navParams: NavParams ,public loadingCtrl :LoadingController, public remoteService : RemoteServiceProvider) {

    this.getMessages(this.userId);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
  }

  getMessages(id)
  {
    let loading = this.loadingCtrl.create({
      content: "Loading",
    });
    loading.present()
    this.remoteService.messagesApiCall(id).subscribe(res =>{loading.dismiss();this.messages = res ;console.log(res)});

  }
  navigateToChat(cid,userid)
  {
    let loading = this.loadingCtrl.create({
      content: "Loading",
    });
    loading.present()
      this.remoteService.usersCoversation(cid,userid).subscribe(res => {loading.dismiss();this.chat =res;this.navCtrl.push(ChatPage,{"chat":this.chat , "cid":cid})});


  }
  back()
  {
    this.navCtrl.push(TabsPage);
  }

}
