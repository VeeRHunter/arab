import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, AlertController} from 'ionic-angular';
import { RemoteServiceProvider} from './../../providers/remote-service/remote-service';
import {TabsPage} from '../tabs/tabs';
import {GroupPage} from '../group/group';
import {CreateGroupPage} from '../create-group/create-group';

/**
 * Generated class for the GroupsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-groups',
  templateUrl: 'groups.html',
})
export class GroupsPage {
  groups :any;
  userId :any;
  search
  filter
  page :number;
  type
  constructor(public alert:AlertController, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl:LoadingController,public toastCtrl :ToastController,public remoteService :RemoteServiceProvider) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.filter = 'all';
    this.search = '';
    this.page = 1;
    this.type = "recommend";
    this.getGroups(this.type, "", this.filter, this.userId, 1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupsPage');
  }

  getGroups(type, term, filter, userId, page){
    $('#noGroups1').hide();
    $('#noGroups2').hide();
    $('#noGroups3').hide();
    let loading = this.loadingCtrl.create({
      content: "Loading",
    });


    $('#active1, #active2, #active3').click(function(){
      $('select').val("all");
      filter = "all";
      if(this.id == 'active1'){
        type = "recommend";
      }else if(this.id == 'active2'){
        type = "member";
      }else{
        type = "yours";
      }
    });
    this.type = type;
    this.filter = filter;


    if(page > 1){
      this.remoteService.getGroups(type, term, filter, userId, page, 4).subscribe(res =>{
        if(res.length == 0){
            $('#all').hide();
            $('#member').hide();
            $('#my').hide();
        }

        for(let x of res){
          this.groups.push(x);
        }
      });
      this.page = page;
      console.log(page);

    }else{
      this.page = page;
      loading.present()
      this.remoteService.getGroups(type, term, filter, userId, page, 4).subscribe(res =>{
        if(res.length > 0){
            $('#all').show();
            $('#member').show();
            $('#my').show();
        }else{
          $('#noGroups1').show();
          $('#noGroups2').show();
          $('#noGroups3').show();
          $('#all').hide();
          $('#member').hide();
          $('#my').hide();
        }
          loading.dismiss();
          this.groups = res;
          console.log(res);
        });

      this.search = term;
    }
  }

  joinGroup(group_id, status, userId, index){
    console.log(group_id, status, userId, index);
    if(status == '0'){
      this.remoteService.joinGroup(group_id, '0', userId).subscribe(res =>{});
      this.groups[index].is_member = true;
    }else{

      let alert = this.alert.create({
        title: 'Leave',
        message: 'Do you want to leave group?',
        buttons: [
          {
            text: 'Yes',
            handler: () => {
              this.remoteService.joinGroup(group_id, '1', userId).subscribe(res =>{});
              this.groups[index].is_member = false;
            }
          },
          {
            text: 'No',
            role: 'cancel',
            handler: () => {
            }
          }
        ]
      });
      alert.present();
    }
  }

  newGroup(){
    this.navCtrl.push(CreateGroupPage);
  }

  groupPage(group){
    console.log(group);
    this.navCtrl.push(GroupPage,{
      group: group,
    });
  }
  back()
  {
    this.navCtrl.push(TabsPage);
  }

}
