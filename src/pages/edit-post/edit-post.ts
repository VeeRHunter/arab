import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { TranslateService } from '@ngx-translate/core';
import * as $ from "jquery"
/**
 * Generated class for the EditPostPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
const Tagedusers = []
@Component({
  selector: 'page-edit-post',
  templateUrl: 'edit-post.html',
})
export class EditPostPage {
  post
  bgshow = true
  tagedUsers
  searchedUsers
  chosenUsers
  listeningShow = true
  userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
  userAvatar = localStorage.getItem('userAvatar').slice(8, -1);
  users
  type
  typeId
  callback
  to_user_id
  constructor(public translate: TranslateService, public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, public loadingCtrl: LoadingController, public remoteService: RemoteServiceProvider) {
    this.post = navParams.get('post');
    console.log(this.post);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditPostPage');
  }



  selectPrivacy() {
    $(document).on('click', 'li', function() {
      if ($(this).text() == ' Public') {
        $('.privacy').attr('id', '1')
        $('#privacy').removeClass('fa fa-group');
        $('#privacy').removeClass('fa fa-lock');
        $('#privacy').addClass('fa fa-globe');

      } else if ($(this).text() == ' Friends only') {
        $('.privacy').attr('id', '2')
        $('#privacy').removeClass('fa fa-globe');
        $('#privacy').removeClass('fa fa-lock');
        $('#privacy').addClass('fa fa-group');
      }
      else {
        $('.privacy').attr('id', '3')
        $('#privacy').removeClass('fa fa-globe');
        $('#privacy').removeClass('fa fa-group');
        $('#privacy').addClass('fa fa-lock');
      }
    })
  }

  postSave() {
    this.remoteService.editPost(this.post.full_message, this.post.id, this.userId, this.post.privacy).subscribe((data) => {
      console.log(data);
      this.navCtrl.pop();
    })
  }
  check(text) {
    if (text.length == 0)
      return true;
    else
      return null;
  }

  locationPopUp() {
    let title, yourLocation, post, cancel, message;
    this.translate.get('location').subscribe(value => { title = value; })
    this.translate.get('your-location').subscribe(value => { yourLocation = value; })
    this.translate.get('post').subscribe(value => { post = value; })
    this.translate.get('cancel').subscribe(value => { cancel = value; })
    this.translate.get('location-message').subscribe(value => { message = value; })
    let locationAlert = this.alert.create(
      {
        title: title,
        message: message,
        inputs: [{
          name: 'location',
          placeholder: yourLocation
        }],
        buttons: [
          {
            text: post,
            handler: data => {
              this.remoteService.locationPosting(this.userId, data.location).subscribe(res => {
                console.log(res)
                this.callback(res.feed).then(() => {
                  this.navCtrl.pop();
                });
              })
            }
          }
        ]
      }
    )
    locationAlert.present()
  }
  backgroundShow() {
    this.bgshow = !this.bgshow
  }
  getColor() {
    $(document).on('click', 'li', function() {
      $('.postBody').attr('id', this.id)
      $('.p-0').attr('id', this.id)

    });

  }
  feelingsShow() {
    $('.dropdown-feeling').toggleClass('open');
  }
  selectFeeling() {
    $(document).on('click', '.dropdown-menu li a', function() {
      $('.feeling-div').attr('id', $(this).text())
      $(".feeling-div").show()
      $('.feelingText').text($(this).text())
    })

  }

  tagUsersDivShow() {
    $('.tag-div').toggle();

  }

  getFriendsListToTag(term) {
    if (term != "") {
      this.remoteService.friendsListApiCall(this.userId, this.userId, term).subscribe(res => {
        this.searchedUsers = res
      });
    }
  }
  selectUserToTag() {
    var users = []

    $(document).one('click', '.tagslist li', function(e) {
      e.preventDefault();
      let userName = $(this).find('a').text()
      let userID = $(this).find('p').text()
      // let userImage = $(this).find('img').attr('src')
      users

      Tagedusers.push(userID)
      $('.selectedUsersInTag').find("ul[class='chosenElments']").append('<li class="btn btn-theme btn-xs created-tag" style="margin:3px;">' + userName + '<p hidden>' + userID + '</p> <i class="fa fa-close"></i></li>')

    })
    $(document).on('click', '.created-tag>i', function() {
      let userid = $(this).parent().find('p').text()
      let index = Tagedusers.findIndex(item => item.id == userid)
      Tagedusers.splice(index, 1)
      $(this).parent().remove()

      console.log(index)
    })
    console.log(Tagedusers)

  }
  back() {
    this.navCtrl.pop()
  }

}
