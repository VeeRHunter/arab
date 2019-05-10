import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { RemoteServiceProvider} from './../../providers/remote-service/remote-service';


/**
 * Generated class for the InviteFriendPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-invite-friend',
  templateUrl: 'invite-friend.html',
})
export class InviteFriendPage {
  userId
  friends
  page
  event
  group
  search
  invited :boolean
  constructor(public navCtrl: NavController, public navParams: NavParams, public remoteService :RemoteServiceProvider, public toastCtrl :ToastController) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.page = navParams.get("page");
    this.event = navParams.get("event");
    this.group = navParams.get("group");
    this.friendsListApiCall(this.userId, this.userId, '');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad InviteFriendPage');
  }
  friendsListApiCall(the_userid, id, term)
  {
    this.remoteService.friendsListApiCall(the_userid, id, term).subscribe(res =>
      {
        this.friends = res

      for(let i = 0; i < res.length; i++)
      {
          console.log(res[i].id)
          if(this.page)
          {
            console.log('page');
            this.remoteService.isInvitedPage(this.page.id, res[i].id, this.userId).subscribe(res2 =>
              {
                console.log(res[i].id);
                if(res2.status == 1)
                  res[i].invited = true
                else
                  res[i].invited = false
            })
          }else if(this.event){
            console.log('event');
            this.remoteService.isInvitedEvent(this.event.id, res[i].id, this.userId).subscribe(res2 => {
              console.log(res2);
              if(res2.status == 1)
                res[i].invited = true
              else
                res[i].invited = false
            });
          }else if(this.group){
            console.log('group');
            this.remoteService.isMember(this.group.id, res[i].id, this.userId).subscribe(res2 => {
              console.log(res2);
              if(res2.status == 1)
                res[i].added = true
              else
                res[i].added = false
            });
          }
      }
      console.log(this.friends);
    });
  }


  inviteFriendTolikepage(invited_id, index){
    this.remoteService.inviteFriendTolikepage(this.userId, this.page.id, invited_id).subscribe(res =>{
      console.log(res);
      if(res.status == 1)
        this.friends[index].invited = true;
      else if(res.status == 0 && res.message == "user-already-liked"){
        let toast = this.toastCtrl.create({
          message: 'User already liked',
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    });
  }
  inviteFriendToEvent(invited_id, index){
    this.remoteService.inviteFriendToEvent(this.event.id, invited_id, this.userId).subscribe(res =>{
      console.log(res);
      if(res.status == 1)
        this.friends[index].invited = true;
      // else if(res.status == 0 && res.message == "user-already-liked"){
      //   let toast = this.toastCtrl.create({
      //     message: 'User already liked',
      //     duration: 3000,
      //     position: 'top'
      //   });
      //   toast.present();
      // }
    });
  }
  addMember(id, index){
    this.remoteService.addMember(this.group.id, id, this.userId).subscribe(res =>{
      console.log(res);
      if(res.status == 1)
        this.friends[index].added = true;
      // else if(res.status == 0 && res.message == "user-already-liked"){
      //   let toast = this.toastCtrl.create({
      //     message: 'User already liked',
      //     duration: 3000,
      //     position: 'top'
      //   });
      //   toast.present();
      // }
    });
  }

  back(){
    this.navCtrl.pop();
  }

}
