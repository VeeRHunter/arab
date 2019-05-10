import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { TimeProvider } from './../../providers/time/time';
import { VideosPage } from '../videos/videos';
import { EditVideoPage } from '../edit-video/edit-video';
import { SocialSharing } from '@ionic-native/social-sharing';

/**
 * Generated class for the VideoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-video',
  templateUrl: 'video.html',
})
export class VideoPage {

  video
  userId
  likes
  userAvatar
  comments
  comment = {
    'comment': '',
    'reply': '',
    'edited': '',
  }
  friendsMention
  constructor(public time: TimeProvider, public loadingCtrl: LoadingController, public alert: AlertController, private socialSharing: SocialSharing, public navCtrl: NavController, public navParams: NavParams, public remoteService: RemoteServiceProvider, public toastCtrl: ToastController) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.userAvatar = localStorage.getItem('userAvatar').slice(8, -1);
    this.userAvatar = "http://" + this.userAvatar;
    this.video = this.navParams.get('video');
    this.video.code = this.video.code.substring(this.video.code.indexOf("src=") + 5);
    this.video.code = this.video.code.substring(0, this.video.code.indexOf("\""));
    this.getComments('video', this.video.id, 10, 0);
    console.log(this.video.code);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad VideoPage');
  }

  getTime(time) {
    return this.time.getTime(time);
  }

  editVideoPage() {
    this.navCtrl.push(EditVideoPage, {
      'video': this.video
    });
  }

  selectedMention(username) {
    this.comment.comment = "@" + username;
    $('.dropdown-content').hide();
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      // if (openDropdown.classList.contains('show')) {
      openDropdown.classList.remove('show');
      // }
    }
  }

  deleteVideo(videoId) {
    this.remoteService.deleteVideo(videoId, this.userId).subscribe(res => {
      let toast = this.toastCtrl.create({
        message: 'Video deleted successfully',
        duration: 3000,
        position: 'top'
      });
      toast.present();
      this.navCtrl.push(VideosPage);
    });
  }
  regularShare() {
    // share(message, subject, file, url)
    this.socialSharing.share(this.video.title, "Arabface", "assets/images/logo.png", this.video.video_url);
  }

  getFriendsList(term = "", id) {
    console.log(term.charAt(1));
    if (term.charAt(0) == '@' && term.length > 1) {
      $('.dropdown-content').show();
      this.remoteService.friendsListApiCall(this.userId, this.userId, term.substr(1)).subscribe(res => {
        this.friendsMention = res;
        console.log(res);
        // document.getElementById("mention").classList.toggle("show");
      });
    }else{
      $('.dropdown-content').hide();
    }
  }

  reportVideo() {
    let alert = this.alert.create({
      title: 'Report',
      inputs: [
        {
          name: 'reason',
          placeholder: 'Reason ...'
        }
      ],
      buttons: [
        {
          text: 'Send',
          handler: data => {
            this.remoteService.reportItem("video", this.video.video_url, data.reason, this.userId).subscribe(res => {
              if (res.status == "1") {
                let toast = this.toastCtrl.create({
                  message: 'Report sent successfully',
                  duration: 2000,
                  position: 'top'
                });
                toast.present();
              } else {
                let toast = this.toastCtrl.create({
                  message: 'You have reported this video before',
                  duration: 2000,
                  position: 'top'
                });
                toast.present();
              }
            });

          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

  getComments(type, type_id, limit, offset) {
    this.remoteService.getComments(type, type_id, limit, offset, this.userId).subscribe(res => {
      this.comments = res;
      console.log(res);
    })
  }

  effects() {
    $(this).css('background-color', 'grey')
  }

  edit() {
    $(document).on('click', '.comment-edit', function() {
      $(this).parent().prev().find('.input-group').show();

    })
    $(document).on('click', '.cancel-edit', function() {
      $(this).parent().hide();

    })

  }
  reply() {
    $(document).on('click', '.comment-reply', function() {
      $(this).closest('.comment').find('.reply-input').show();

    })
    $(document).on('click', '.reply-close', function() {
      $(this).closest('.reply-input').hide();

    })
  }

  // ConfirmEditPost(text,feedid)
  // {
  //     this.remoteService.editPost(text,feedid,this.userId).subscribe((data) => {console.log(data)})
  // }

  replyOnComment(postindex, commentindex, postOwner, commentID, whoCommented = this.userId, comment = this.comment.reply) {
    let loading = this.loadingCtrl.create({
      content: "",
      spinner: "bubbles",
    });

    loading.present()
    this.remoteService.ReplyOnComment(postOwner, commentID, whoCommented, comment).subscribe(res => {

      res.postid = commentID
      this.comments[0][commentindex].repliesContent.push(res)
      this.remoteService.loadReplies(commentID).subscribe(res2 => { });

      this.comment.reply = ''
      loading.dismiss()
    })

  }

  deleteComment(commentId) {
    let alert = this.alert.create({
      title: 'Delete',
      message: 'Do you want to delete comment?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.remoteService.removeComment(commentId, this.userId).subscribe(res => {
              if (res.status == 1) {

                let toast = this.toastCtrl.create({
                  message: 'You deleted this comment ',
                  duration: 2000

                });
                toast.present();
              }
            })
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

  commentOnFeed(postID, whoCommented = this.userId, comment = this.comment.comment) {
    let loading = this.loadingCtrl.create({
      content: "",
      spinner: "bubbles",
    });
    loading.present()
    this.remoteService.commentOnFeeds(this.video.owner.id, postID, whoCommented, comment, 'video').subscribe(res => {
      res.postid = postID

      this.comments.push(res)
      this.remoteService.loadComments(postID, this.userId).subscribe(res2 => { });

      this.comment.comment = ''
      loading.dismiss()
    })

  }


  likeFeed(type) {
    this.remoteService.likeVideo(this.userId, this.video.id, type).subscribe(res => {
      this.video.like_count = res.likes;
      this.video.has_like = res.has_like;
    })
  }

  likeComment(userid = this.userId, commentID, postIndex, commentIndex) {
    this.remoteService.likeCommentApiCall(this.userId, commentID).subscribe(res => {
      this.likes = res;
      for (let i = 0; i < this.video.answers[0].length; i++) {
        if (this.video.answers[0][commentIndex].id == commentID) {
          this.video.answers[0][commentIndex].like_count = this.likes.likes;
          this.video.answers[0][commentIndex].has_like = this.likes.has_like;
          break
        }
      }
    })
  }

  sharePost(feedid, userID = this.userId) {
    let alert = this.alert.create({
      title: 'share',
      message: 'Do you want to share this post on your timeline ?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.remoteService.sharePost(feedid, userID).subscribe(res => {
            })
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

  back() {
    this.navCtrl.pop();
  }

}
