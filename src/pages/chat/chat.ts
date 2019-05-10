import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { RemoteServiceProvider} from './../../providers/remote-service/remote-service';

/**
 * Generated class for the ChatPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */


@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  user = {
     'message':''
  };
  Id ;
  cid;
  chatMessages
  chatResonse ;
  constructor(public navCtrl: NavController, public navParams: NavParams ,public remoteService : RemoteServiceProvider) {
    this.Id=localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.cid= this.navParams.get("cid")
    console.log(this.cid)
    console.log(this.Id)
    console.log(this.user.message)

     this.chatMessages= this.navParams.get("chat");
     console.log(this.chatMessages)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ChatPage');
  }

  sendMessageFunction()
  {


    this.remoteService.ChatMessagesSend(this.cid,this.Id,this.user.message).subscribe(res => {this.chatResonse =res});

  }

  back()
  {
    this.navCtrl.pop();
  }

}
