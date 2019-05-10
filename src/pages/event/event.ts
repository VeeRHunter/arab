import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, LoadingController, AlertController, ActionSheetController, Platform } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { TimeProvider } from './../../providers/time/time';
import { EditEventPage } from '../edit-event/edit-event';
import { InviteFriendPage } from '../invite-friend/invite-friend';
import { PostFeatursPage } from '../post-featurs/post-featurs'
import { FriendProfilePage } from '../friend-profile/friend-profile'
import { DisplayPostPage } from '../display-post/display-post'
import { ProfilePage } from '../profile/profile';
import { SocialSharing } from '@ionic-native/social-sharing';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { UploadImagePage } from '../upload-image/upload-image';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { EditPostPage } from '../edit-post/edit-post';
import { TranslateService } from '@ngx-translate/core';
/**
 * Generated class for the EventPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
declare var cordova: any;
@Component({
  selector: 'page-event',
  templateUrl: 'event.html',
})
export class EventPage {
  userId
  event
  saved
  feeds = [];
  likes;
  likeNumbers;
  userData;
  show = true
  postToDisplay
  feedComments
  havePosted = false
  post = { 'text': "" }
  comment = {
    'comment': '',
    'reply': '',
    'edited': '',
  }
  hiddenPost
  friendsMention
  userAvatar
  videoURL
  text
  feed = { 'feedid': "" }
  lastImage: string = null;
  emptyFeeds = true;
  constructor(public time: TimeProvider, public translate: TranslateService, public file: File, public filePath: FilePath, public platform: Platform, public camera: Camera, public actionSheetCtrl: ActionSheetController, private socialSharing: SocialSharing, public navCtrl: NavController, public toast: ToastController, public navParams: NavParams, public alert: AlertController, public loadingCtrl: LoadingController, public remoteService: RemoteServiceProvider) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.userAvatar = localStorage.getItem('userAvatar');

    this.event = navParams.get("event");
    this.isSaved(this.event.id);
    this.getFeedsList(this.userId)
  }

  getTime(time) {
    return this.time.getTime(time);
  }

  postSave(index, privacy) {
    console.log(index, privacy);
    this.remoteService.editPost(this.feeds[index].full_message, this.feeds[index].id, this.userId, privacy).subscribe((data) => {
      console.log(data);
      this.feeds[index].privacy = privacy;
    })
  }

  showComments(id) {
    $('#' + id).show();
    console.log('#' + id);
  }



  unHidePost(feedid, index, userID = this.userId) {
    this.remoteService.unHidePost(feedid, userID).subscribe(res => {

      if (res.status == 1) {
        // this.feeds.splice(index, 0, )
        this.feeds[index].hidden = false;
      }
    })
  }

  editComment(id, text, feedIndex, commentIndex) {
    this.remoteService.editComment(this.userId, id, text).subscribe(res => {
      if (res.status == 1) {
        this.feeds[feedIndex].answers[0][commentIndex].text = text;
        $('.saveComment').parent().hide();
      }
    })
  }

  public presentActionSheet(type) {
    let actionSheet = this.actionSheetCtrl.create({
      // title: 'Select Image Source',
      buttons: [
        {
          text: 'Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY, type);
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA, type);
          }
        }
      ]
    });
    actionSheet.present();

  }

  public takePicture(sourceType, type) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then((imagePath) => {
      // Special handling for Android library
      if (this.platform.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
        this.filePath.resolveNativePath(imagePath)
          .then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
            let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), type);

          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName(), type);

      }
    }, (err) => {
      this.presentToast('Error while selecting image.');
    });
  }

  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  private copyFileToLocalDir(namePath, currentName, newFileName, type) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      this.navCtrl.push(UploadImagePage, {
        type: type,
        image: this.lastImage,
        id: this.event.id
      })
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }
  presentToast(msg) {
    let toast = this.toast.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }


  // getFeedsList(id, more = false, GotPosts = 30) {
  //   let loading = this.loadingCtrl.create({
  //     content: "",
  //     spinner: "bubbles",
  //     showBackdrop: true,
  //   });
  //   loading.present()
  //   this.remoteService.feedsListApiCall(id, this.event.id, 'event', 10).subscribe(res => {
  //
  //     for (let i = 0; i < res.length; i++) {
  //       let newFeedID = res[i].id
  //       let newFeed = res[i].answers
  //       this.remoteService.loadComments(newFeedID, this.userId).subscribe(res2 => {
  //         newFeed.unshift(res2)
  //         for (let g = 0; g < newFeed[0].length; g++) {
  //           this.remoteService.loadReplies(newFeed[0][g].id).subscribe(res3 => {
  //
  //             newFeed[0][g]['repliesContent'] = res3
  //
  //           });
  //
  //         }
  //       });
  //
  //     }
  //     this.feeds = res
  //     if (GotPosts > 30) {
  //       console.log()
  //       this.feeds.push(res)
  //     }
  //     loading.dismiss();
  //     console.log(this.feeds)
  //
  //   });
  //
  // }

  getFeedsList(id, more = false, GotPosts = 30) {
    let loading = this.loadingCtrl.create({
      content: "",
      spinner: "bubbles",
      showBackdrop: true,
    });
    loading.present()
    this.remoteService.feedsListApiCall(id, this.event.id, 'event', 10).subscribe(res => {
      if (res.length == 0)
        this.emptyFeeds = false;
      //////////////////// looping to get comments and their replis ////////////////////////////////
      for (let i = 0; i < res.length; i++) {
        //check if post is saved or not-going

        res[i].hidden = false;
        this.remoteService.isSaved('feed', res[i].id, this.userId).subscribe(data => {
          if (data.status == 1) {
            res[i].saved = true;
          } else {
            res[i].saved = false;
          }
        });
        ///////////// video url handling ////////////////////////
        if (res[i].video_embed != '') {
          res[i].video_embed = res[i].video_embed.substring(res[i].video_embed.indexOf("src=") + 5);
          res[i].video_embed = res[i].video_embed.substring(0, res[i].video_embed.indexOf("\""));
          this.videoURL = res[i].video_embed;
        }
        ///////////////// split time string to words/////////////////

        // res[i].time = res[i].time.split(' ');

        /////////////////////////////////////////////////////
        let newFeedID = res[i].id
        let newFeed = res[i].answers
        this.remoteService.loadComments(newFeedID, this.userId).subscribe(res2 => {
          newFeed.unshift(res2)
          for (let g = 0; g < newFeed[0].length; g++) {
            this.remoteService.loadReplies(newFeed[0][g].id).subscribe(res3 => {

              newFeed[0][g]['repliesContent'] = res3

            });

          }
        });

      }
      this.feeds = res
      if (GotPosts > 30) {
        console.log()
        this.feeds.push(res)
      }
      loading.dismiss();
      console.log(this.feeds)

    });

  }

  loadMoreFeeds(feedlength) {
    console.log(feedlength)
    this.getFeedsList(this.userId, true, feedlength)
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

  selectedMention(username){
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

  ///////////////////// post feed //////////////

  likeFeed(userid = this.userId, feedid, postIndex) {

    this.remoteService.likeFeedApiCall(this.userId, feedid).subscribe(res => {

      this.feeds[postIndex].like_count = res.likes;
      this.feeds[postIndex].has_like = res.has_like;
    })


  }

  likeComment(userid = this.userId, commentID, postIndex, commentIndex) {


    this.remoteService.likeCommentApiCall(this.userId, commentID).subscribe(res => {
      this.likes = res;
      for (let i = 0; i < this.feeds[postIndex].answers[0].length; i++) {
        if (this.feeds[postIndex].answers[0][commentIndex].id == commentID) {
          this.feeds[postIndex].answers[0][commentIndex].like_count = this.likes.likes;
          this.feeds[postIndex].answers[0][commentIndex].has_like = this.likes.has_like;

          break
        }
      }


    })


  }
  likeReply(userid = this.userId, replyID, postIndex, commentIndex, replyIndex) {

    this.remoteService.likeCommentApiCall(this.userId, replyID).subscribe(res => {
      for (let i = 0; i < this.feeds[postIndex].answers[0][commentIndex].repliesContent.length; i++) {
        if (this.feeds[postIndex].answers[0][commentIndex].repliesContent[i].id == replyID) {
          this.feeds[postIndex].answers[0][commentIndex].repliesContent[i].like_count = res.likes;
          this.feeds[postIndex].answers[0][commentIndex].repliesContent[i].has_like = res.has_like;

          break
        }
      }


    })


  }
  // postFeed(userID=this.userId,postText=this.post.text)
  // {
  //   console.log(this.feeds)

  //   let loading = this.loadingCtrl.create({
  //     content: "",
  //     spinner: "bubbles",

  //   });
  //   loading.present()
  //   this.remoteService.feedPosting(userID,postText).subscribe( res => {
  //     this.feeds.unshift(res.feed)
  //     this.post.text= ""
  //     //this.getFeedsList(this.userId);
  //     loading.dismiss();
  //   });

  // }
  commentOnFeed(postOwner, postID, whoCommented = this.userId, comment = this.comment.comment) {
    let loading = this.loadingCtrl.create({
      content: "",
      spinner: "bubbles",
    });

    loading.present()
    this.remoteService.commentOnFeeds(this.userId, postID, whoCommented, comment, 'feed').subscribe(res => {
      res.postid = postID
      res['repliesContent'] = []
      for (let x in this.feeds) {
        if (this.feeds[x].id == res.postid) {
          this.feeds[x].answers[0].push(res)
        }
      }
      this.comment.comment = ''
      loading.dismiss()
    })
  }

  replyOnComment(postindex, commentindex, postOwner, commentID, whoCommented = this.userId, comment = this.comment.reply) {
    let loading = this.loadingCtrl.create({
      content: "",
      spinner: "bubbles",
    });

    loading.present()
    this.remoteService.ReplyOnComment(postOwner, commentID, whoCommented, comment).subscribe(res => {


      res.postid = commentID

      this.feeds[postindex].answers[0][commentindex].repliesContent.push(res)

      this.remoteService.loadReplies(commentID).subscribe(res2 => { });

      this.comment.reply = ''
      loading.dismiss()
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




  /////////////////////////////////////////
  GoToProfile(id, userId) {
    let loading = this.loadingCtrl.create({
      content: "",
      spinner: "bubbles",
    });
    loading.present()

    this.remoteService.profileDetailsApiCall(id, userId).subscribe(res => {
      loading.dismiss(); this.userData = res;
      console.log("---------------------------");
      res.id = id;
      console.log(res);
      console.log("----------------------------");
      if (id == userId) {
        this.navCtrl.push(ProfilePage, {
          "userData": res
        })
      } else {
        this.navCtrl.push(FriendProfilePage, {
          "userData": res
        })
      }

    });

  }


  edit(text) {
    this.text = text;
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
  //////////////////////////////////////////////
  back() {
    this.navCtrl.pop();
    //  this.navCtrl.push(TabsPage);
  }


  /* feed options
   which contain
   -i don't like post
   -edit post
   -delete post
   -view post
  */

  editPost() {
    $(document).on('click', '.comment-edit', function() {
      $(this).parent().prev().find('.input-group').show();

    })
    $(document).on('click', '.cancel-edit', function() {
      $(this).parent().hide();

    })
  }
  // ConfirmEditPost(text,feedid)
  // {
  //     this.remoteService.editPost(text,feedid,this.userId).subscribe((data) => {console.log(data)})
  // }

  savePost(feedid, index) {
    let toast = this.toast.create({
      message: 'this post has saved !',
      duration: 2000,
      cssClass: 'alert'
    });
    toast.present();
    this.remoteService.saveItem('feed', feedid, this.userId).subscribe(res => {
      if (res.status == 1) {
        this.feeds[index].saved = true;
      }
    })
  }

  unsavePost(feedid, index) {
    this.remoteService.saveItem('feed', feedid, this.userId).subscribe(res => {
      if (res.status == 1) {
        this.feeds[index].saved = false;
      }
    })
  }

  donotLikePost(feedid, index, userID = this.userId) {
    this.remoteService.hidePost(feedid, userID).subscribe(res => {
      // this.hiddenPost = res.status
      if (res.status == 1) {
        this.feeds[index].hidden = true;
        // this.feeds.splice(index, 1)

        let toast = this.toast.create({
          message: 'This post will no longer show to you',
          duration: 2000
        });
        toast.present();
      }
    })
  }

  deletePost(feedid, index, userID = this.userId) {
    let alert = this.alert.create({
      title: 'Delete',
      message: 'Do you want to delete this post?',

      buttons: [
        {
          text: 'Ok',
          handler: () => {

            this.remoteService.removePost(feedid, userID).subscribe(res => {
              if (res.status == 1) {
                this.feeds.splice(index, 1)
                let toast = this.toast.create({
                  message: 'You deleted this post ',
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

  deleteComment(commentId, feedIndex, commentIndex) {
    let title, ok, cancel, message;
    this.translate.get('delete-comment').subscribe(value => { title = value; })
    this.translate.get('delete-comment-question').subscribe(value => { message = value; })
    this.translate.get('ok').subscribe(value => { ok = value; })
    this.translate.get('cancel').subscribe(value => { cancel = value; })

    let alert = this.alert.create({
      title: title,
      message: message,
      buttons: [
        {
          text: ok,
          handler: () => {
            this.remoteService.removeComment(commentId, this.userId).subscribe(res => {
              if (res.status == 1) {
                this.feeds[feedIndex].answers[0].splice(commentIndex, 1);
              }
            })
          }
        },
        {
          text: cancel,
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();
  }

  turnOffNotifications(feedid, userID = this.userId) {
    this.remoteService.unsubscribePost(feedid, userID).subscribe((data) => { console.log(data) })
  }
  showPost(feed) {
    this.postToDisplay = feed
    console.log(this.postToDisplay)
    this.navCtrl.push(DisplayPostPage, { 'post': this.postToDisplay })
  }
  //////////////////////////////////////////
  effects() {
    $(this).css('background-color', 'grey')
  }

  goToPost() {
    //   let popover = this.popOver.create(PostFeatursPage, {}, {cssClass: 'contpopover'});
    //   popover.present({

    //   });
    this.navCtrl.push(PostFeatursPage, {
      type: 'event',
      type_id: this.event.id,
      callback: this.myCallbackFunction
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad EventPage');
  }
  editEventPage() {
    this.navCtrl.push(EditEventPage, {
      'event': this.event
    });
  }
  saveEvent(eventId) {
    this.remoteService.saveItem('event', eventId, this.userId).subscribe(res => {
      this.saved = true;
    });
  }
  unsaveEvent(eventId) {
    this.remoteService.unsaveItem('event', eventId, this.userId).subscribe(res => {
      this.saved = false;
    });
  }
  isSaved(eventId) {
    this.remoteService.isSaved('event', eventId, this.userId).subscribe(res => {
      if (res.status == 1) {
        this.saved = true;
      } else {
        this.saved = false;
      }
    });
  }
  rsvp(event_id, rsvp) {
    console.log(event_id, rsvp);
    this.remoteService.rsvp(event_id, rsvp, this.userId).subscribe(res => {
      this.event.rsvp = rsvp;
      console.log(res);
    });
  }

  report(index) {
    let title, reason, send, cancel, message;
    this.translate.get('report').subscribe(value => { title = value; })
    this.translate.get('report-reason').subscribe(value => { reason = value; })
    this.translate.get('send').subscribe(value => { send = value; })
    this.translate.get('cancel').subscribe(value => { cancel = value; })

    let alert = this.alert.create({
      title: title,
      inputs: [
        {
          name: 'reason',
          placeholder: reason
        }
      ],
      buttons: [
        {
          text: send,
          handler: data => {
            this.remoteService.reportItem("post", this.feeds[index].feed_url, data.reason, this.userId).subscribe(res => {
              if (res.status == "1") {
                this.translate.get('report-success').subscribe(value => { message = value; })
                let toast = this.toast.create({
                  message: message,
                  duration: 2000,
                  position: 'top'
                });
                toast.present();
              } else {
                this.translate.get('report-failure').subscribe(value => { message = value; })
                let toast = this.toast.create({
                  message: message,
                  duration: 2000,
                  position: 'top'
                });
                toast.present();
              }
            });

          }
        },
        {
          text: cancel,
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();

  }

  reportEvent() {
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
            this.remoteService.reportItem("event", this.event.event_url, data.reason, this.userId).subscribe(res => {
              if (res.status == "1") {
                let toast = this.toast.create({
                  message: 'Report sent successfully',
                  duration: 2000,
                  position: 'top'
                });
                toast.present();
              } else {
                let toast = this.toast.create({
                  message: 'You have reported this event before',
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
  regularShare() {
    // share(message, subject, file, url)
    this.socialSharing.share(this.event.title, "Arabface", "assets/images/logo.png", this.event.event_url);
  }
  inviteFriend() {
    this.navCtrl.push(InviteFriendPage, {
      event: this.event
    });
  }

  turnNotifications(feedid, index, feedType, userID = this.userId) {
    if (feedType == true) {
      this.remoteService.unsubscribePost(feedid, userID).subscribe((data) => {
        console.log(data)
        if (data.status == 1) {
          this.feeds[index].has_subscribed = !feedType
        }
      })

    } else {
      this.remoteService.subscribePost(feedid, userID).subscribe((data) => {
        console.log(data)
        if (data.status == 1) {
          this.feeds[index].has_subscribed = !feedType
        }
      })

    }
  }

  editPostView(index) {
    this.navCtrl.push(EditPostPage, {
      post: this.feeds[index]
    });
  }

  myCallbackFunction = (post) => {
    return new Promise((resolve, reject) => {
      post.answers[0] = [];
      this.feeds.unshift(post);
      resolve();
    });
  }


}
