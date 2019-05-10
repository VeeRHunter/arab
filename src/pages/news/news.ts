import { Component } from '@angular/core';
import { App, NavController, PopoverController, ToastController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { ProfilePage } from '../profile/profile';
import { PostFeatursPage } from '../post-featurs/post-featurs'
import { FriendProfilePage } from '../friend-profile/friend-profile'
import { DisplayPostPage } from '../display-post/display-post'
import { NotFound_404Page } from '../not-found-404/not-found-404';
import { TranslateService } from '@ngx-translate/core';
import { TimeProvider } from './../../providers/time/time';
import { EditPostPage } from '../edit-post/edit-post';
import { GroupPage } from '../group/group';
import { Page } from '../page/page';

//import $ from "jquery";

/**
 * Generated class for the NewsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-news',
  templateUrl: 'news.html',
})
export class NewsPage {
  // @ViewChild(Nav) nav: any;
  videoURL
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
  feed = { 'feedid': "" }
  userId
  userAvatar
  text
  friendsMention;
  emptyFeeds = true;
  constructor(public time: TimeProvider, public translate: TranslateService, private app: App, public navCtrl: NavController, public popOver: PopoverController, public toast: ToastController, public navParams: NavParams, public alert: AlertController, public loadingCtrl: LoadingController, public remoteService: RemoteServiceProvider) {
    if (localStorage.getItem('userDataID')) {
      this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "")
    }
    // if (localStorage.getItem('userAvatar')) {
    this.userAvatar = localStorage.getItem('userAvatar');
    // }
    this.getFeedsList(this.userId);
    // this.userAvatar = "http://" + this.userAvatar;


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewsPage');
  }

  viewPage(id) {
    this.remoteService.getPageDetails(this.userId, id).subscribe(res => {
      this.app.getRootNav().push(Page, {
        page: res
      })
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

  viewGroup(id) {
    this.remoteService.groupDetails(id, this.userId).subscribe(res => {
      this.app.getRootNav().push(GroupPage, {
        group: res
      })
    })
  }

  getTime(time) {
    return this.time.getTime(time);
  }

  getFeedsList(id, more = false, GotPosts = 30) {
    let loading = this.loadingCtrl.create({
      content: "",
      spinner: "bubbles",
      showBackdrop: true,
    });
    loading.present()
    this.remoteService.feedsListApiCall(id, '', 'feed', 10).subscribe(res => {

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

    let title, message, response, no, yes;
    this.translate.get('share').subscribe(value => { title = value; })
    this.translate.get('share-message').subscribe(value => { message = value; })
    this.translate.get('yes').subscribe(value => { yes = value; })
    this.translate.get('no').subscribe(value => { no = value; })
    this.translate.get('share-response').subscribe(value => { response = value; })

    let alert = this.alert.create({
      title: title,
      message: message,
      buttons: [
        {
          text: yes,
          handler: () => {
            this.remoteService.sharePost(feedid, userID).subscribe(res => {
              let toast = this.toast.create({
                message: response,
                duration: 2000
              });
              toast.present();

            })
          }
        },
        {
          text: no,
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    alert.present();

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


  /////////////////////////////////////////
  GoToProfile(id, userId) {
    let loading = this.loadingCtrl.create({
      content: "",
      spinner: "bubbles",
    });
    loading.present()

    this.remoteService.profileDetailsApiCall(id, userId).subscribe(res => {
      loading.dismiss(); this.userData = res;
      res.id = id;
      if (id == userId) {
        this.app.getRootNav().push(ProfilePage, {
          "userData": res
        });

      } else {
        this.remoteService.isBlocked(res.id, this.userId).subscribe(res2 => {
          if (res2.status == 1) {
            this.app.getRootNav().push(NotFound_404Page, {
              "userData": res,
              "blocked": true
            });
          } else {
            this.app.getRootNav().push(FriendProfilePage, {
              "userData": res,
              "blocked": false
            });
          }
        });
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

  postSave(index, privacy) {
    console.log(index, privacy);
    this.remoteService.editPost(this.feeds[index].full_message, this.feeds[index].id, this.userId, privacy).subscribe((data) => {
      console.log(data);
      this.feeds[index].privacy = privacy;
    })
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

  unsavePost(feedid, index) {
    this.remoteService.unsaveItem('feed', feedid, this.userId).subscribe(res => {
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

  unHidePost(feedid, index, userID = this.userId) {
    this.remoteService.unHidePost(feedid, userID).subscribe(res => {

      if (res.status == 1) {
        // this.feeds.splice(index, 0, )
        this.feeds[index].hidden = false;
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

  showPost(feed) {
    this.postToDisplay = feed
    console.log(this.postToDisplay)
    this.app.getRootNav().push(DisplayPostPage, { 'post': this.postToDisplay })
  }
  //////////////////////////////////////////
  effects() {
    $(this).css('backgMath.round-color', 'grey')
  }

  goToPost() {
    this.app.getRootNav().push(PostFeatursPage, {
      type: 'feed',
      type_id: '',
      callback: this.myCallbackFunction
    });
  }

  editPostView(index) {
    this.app.getRootNav().push(EditPostPage, {
      post: this.feeds[index]
    });
  }

  showComments(id) {
    $('#' + id).show();
    console.log('#' + id);
  }

  myCallbackFunction = (post) => {
    return new Promise((resolve, reject) => {
      post.answers[0] = [];
      post.answers[0] = []
      this.feeds.unshift(post);
      resolve();
    });
  }
  doRefresh(refresher) {
    this.getFeedsList(this.userId);
    if (refresher != 0)
      refresher.complete();
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
}
