import { Component } from '@angular/core';
import { App, NavController, NavParams, ActionSheetController, Platform, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { TimeProvider } from './../../providers/time/time';
import { NotFound_404Page } from '../not-found-404/not-found-404';
import { Camera } from '@ionic-native/camera';
import { TabsPage } from '../tabs/tabs';
import { PhotosPage } from '../photos/photos'
import { FriendProfilePage } from '../friend-profile/friend-profile'
import { DisplayPostPage } from '../display-post/display-post'
import { PostFeatursPage } from '../post-featurs/post-featurs'
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import { UploadImagePage } from '../upload-image/upload-image';
import { TranslateService } from '@ngx-translate/core';
import { EditPostPage } from '../edit-post/edit-post';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { Page } from '../page/page';

/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
declare var cordova: any;

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userData = [];
  userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
  profileInfo = {
    'online_time': '',
    "gender": '',
    "birth": '',
    "bio": '',
    "city": '',
    "state": '',
    "country": ''
  }
  feeds = [];
  likes;
  cover
  userID
  photos
  show = true
  postToDisplay
  temp;
  likeNumbers;
  friendsMention
  picture = { 'path': '' }
  friendslist = []
  followers
  following
  likedPages
  imageURI: any;
  imageFileName: any;
  offset
  limit
  post = { 'text': "" }
  comment = {
    'comment': '',
    'reply': '',
    'edited': '',
  }
  hiddenPost
  feed = { 'feedid': "" }
  lastImage: string = null;
  videoURL
  text
  emptyFeeds=true;
  constructor(public photoViewer: PhotoViewer, private app: App, public translate: TranslateService, public time: TimeProvider, private filePath: FilePath, private file: File, public camera: Camera, public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, public loadingCtrl: LoadingController, public remoteService: RemoteServiceProvider, public toast: ToastController, public actionSheetCtrl: ActionSheetController, public platform: Platform) {
    console.log()
    this.limit = 4;
    this.offset = 1;
    this.photos = [];
    this.cover = localStorage.getItem('userCover');
    console.log(this.cover)
    this.getProfileData(this.userId, this.userId);
    this.getFeedsList(this.userId)
    this.getPhotsFromProvider(this.userID);
  }

  postSave(index, privacy) {
    console.log(index, privacy);
    this.remoteService.editPost(this.feeds[index].full_message, this.feeds[index].id, this.userId, privacy).subscribe((data) => {
      console.log(data);
      this.feeds[index].privacy = privacy;
    })
  }

  viewPhoto(url) {
    this.photoViewer.show(url);
  }

  viewPage(id) {
    this.remoteService.getPageDetails(this.userId, id).subscribe(res => {
      this.navCtrl.push(Page, {
        page: res
      })
    })
  }

  editPostView(index) {
    this.app.getRootNav().push(EditPostPage, {
      post: this.feeds[index]
    });
  }

  getTime(time) {
    return this.time.getTime(time);
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
        image: this.lastImage
      })
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

  editComment(id, text, feedIndex, commentIndex) {
    this.remoteService.editComment(this.userId, id, text).subscribe(res => {
      if (res.status == 1) {
        this.feeds[feedIndex].answers[0][commentIndex].text = text;
        $('.saveComment').parent().hide();
      }
    })
  }

  showComments(id) {
    $('#pro' + id).show();
    console.log('#pro' + id);
  }

  deleteFriend(id, index) {
    let alert = this.alert.create({
      title: 'Remove Friend',
      message: 'Do you want to remove this friend?',
      buttons: [
        {
          text: 'Yes',
          handler: data => {
            this.remoteService.deleteFriendRequest(id, this.userId).subscribe(res => {
              console.log(res);
              if (res.status == 1) {
                this.friendslist.splice(index, 1);
              }
            })
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



  loadMoreFeeds(feedlength) {
    console.log(feedlength)
    this.getFeedsList(this.userId, true, feedlength)
  }

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

  unHidePost(feedid, index, userID = this.userId) {
    this.remoteService.unHidePost(feedid, userID).subscribe(res => {

      if (res.status == 1) {
        // this.feeds.splice(index, 0, )
        this.feeds[index].hidden = false;
      }
    })
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



  unsavePost(feedid, index) {
    this.remoteService.saveItem('feed', feedid, this.userId).subscribe(res => {
      if (res.status == 1) {
        this.feeds[index].saved = false;
      }
    })
  }

  showPost(feed) {
    this.postToDisplay = feed
    console.log(this.postToDisplay)
    this.app.getRootNav().push(DisplayPostPage, { 'post': this.postToDisplay })
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

  getFriendList(Id, id, term = "") {
    this.friendslist = [];
    if (this.userID == null) {
      Id = id;
    }
    let loading = this.loadingCtrl.create({
      content: "Loading",
    });
    loading.present()
    this.remoteService.friendsListApiCall(this.userId, this.userId, term).subscribe(res => {
      for (let friend of res) {
        this.remoteService.profileDetailsApiCall(friend.id, this.userId).subscribe(res2 => {
          console.log(res2);
          friend.friend_status = res2.friend_status;
          this.friendslist.push(friend);
        });
      }
      // this.friendslist = res;
      console.log(this.friendslist);
    });

    this.remoteService.friendsListApiCall(this.userId, this.userId, term).subscribe(res1 => {
      loading.dismiss();
      console.log(res1);

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

  getFollowingAndLikes(userId) {
    this.offset = 1;
    if (this.userID == null) {
      userId = this.userId;
    } else {
      userId = this.userID;
    }
    let loading = this.loadingCtrl.create({
      content: "Loading",
    });
    loading.present()
    this.remoteService.following(userId).subscribe(res => { this.following = res; console.log(res) });
    this.remoteService.followers(userId).subscribe(res => { this.followers = res; console.log(res) });
    this.remoteService.getPages("likes", "", "all", userId, 1, 4).subscribe(res => { this.likedPages = res.pages; console.log(res) });
    loading.dismiss();
  }
  getMorePages(userId) {
    this.offset += 1;
    this.remoteService.getPages("likes", "", "all", userId, this.offset, this.limit).subscribe(res => {
      for (let x of res.pages) {
        this.likedPages.push(x);
      }
      console.log(res)
    });
  }
  isFriend(id) {
    //  return true;
    this.remoteService.profileDetailsApiCall(70, this.userId).subscribe(res => {

      console.log(res);
      return false;
    });
  }
  myProfile() {
    if (this.userID == null || this.userId == this.userID) {
      return true;
    } else {
      return false;
    }
  }

  getProfileData(id, theUserId) {
    this.remoteService.profileDetailsApiCall(id, theUserId).subscribe(res => {
      this.userData = res;
      for (var i = 0; i < res.profile_info.length; i++) {
        console.log(res.profile_info[i]);
        if (res.profile_info[i]) {
          if (res.profile_info[i].name == "online_time")
            this.profileInfo.online_time = res.profile_info[i].value;
          else if (res.profile_info[i].name == "gender")
            this.profileInfo.gender = res.profile_info[i].value;
          else if (res.profile_info[i].name == "birth")
            this.profileInfo.birth = res.profile_info[i].value;
          else if (res.profile_info[i].name == "bio")
            this.profileInfo.bio = res.profile_info[i].value;
          else if (res.profile_info[i].name == "country")
            this.profileInfo.country = res.profile_info[i].value;
          else if (res.profile_info[i].name == "city")
            this.profileInfo.city = res.profile_info[i].value;
          else if (res.profile_info[i].name == "state")
            this.profileInfo.state = res.profile_info[i].value;
        }
      }

    });

  }
  GoToProfile(id, userId) {
    let loading = this.loadingCtrl.create({
      content: "Loading",
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
        this.remoteService.isBlocked(res.id, this.userId).subscribe(res2 => {
          if (res2.status == 1) {
            this.navCtrl.push(NotFound_404Page, {
              "userData": res,
              "blocked": true
            });
          } else {
            this.navCtrl.push(FriendProfilePage, {
              "userData": res,
              "blocked": false
            });
          }
        });
      }

    });

  }
  getFeedsList(id, more = false, GotPosts = 30) {
    let loading = this.loadingCtrl.create({
      content: "",
      spinner: "bubbles",
      showBackdrop: true,
    });
    loading.present()
    this.remoteService.feedsListApiCall(this.userId, this.userId, 'timeline', 10).subscribe(res => {
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
  goToPhotos() {
    this.navCtrl.push(PhotosPage)
  }

  getPhotsFromProvider(userid) {
    if (this.userID == null) {
      userid = this.userId;
    } else {
      userid = this.userID;
    }
    let loading = this.loadingCtrl.create({
      content: "Loading",
    });
    this.remoteService.userPhotosAlbumOnProfile(userid).subscribe((res) => { loading.dismiss(); this.photos = res })
  }


  count = 1;

  setColor(btn) {
    var property = document.getElementById(btn);
    if (this.count == 0) {
      property.style.color = "gray"
      this.count = 1;
    }
    else {
      property.style.color = "blue"
      this.count = 0;
    }

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
    //this.navCtrl.pop();
    if(this.navCtrl.length() >= 2)
      this.navCtrl.pop();
    else
      this.app.getRootNav().setRoot(TabsPage);
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
    // let toast = this.toast.create({
    //   message: 'this post has saved !',
    //   duration : 2000,
    //   cssClass: 'alert'
    // });
    // toast.present();
    this.remoteService.saveItem('feed', feedid, this.userId).subscribe(res => {
      if (res.status == 1) {
        this.feeds[index].saved = true;
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

  //////////////////////////////////////////
  effects() {
    $(this).css('background-color', 'grey')
  }

  goToPost() {
    this.navCtrl.push(PostFeatursPage, {
      callback: this.myCallbackFunction
    })
  }
  myCallbackFunction = (post) => {
    return new Promise((resolve, reject) => {
      post.answers[0] = [];
      this.feeds.unshift(post);
      resolve();
    });
  }
}
