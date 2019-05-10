import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { TranslateService } from '@ngx-translate/core';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { TimeProvider } from './../../providers/time/time';
import { Page } from '../page/page';
import { EventPage } from '../event/event';
import { GroupPage } from '../group/group';
import { TabsPage } from '../tabs/tabs';
import { DisplayPostPage } from '../display-post/display-post';
import { EditPostPage } from '../edit-post/edit-post';

/**
 * Generated class for the SavedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-saved',
  templateUrl: 'saved.html',
})
export class SavedPage {
  userId
  type = "posts"
  pages: any
  groups: any
  events: any
  posts = []
  page
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
  userAvatar
  emptyFeeds = true;
  videoURL
  text
  feed = { 'feedid': "" }
  friendsMention
  constructor(public translate: TranslateService, public time: TimeProvider, public toast: ToastController, public alert: AlertController, public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public remoteService: RemoteServiceProvider) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.userAvatar = "http://" + localStorage.getItem('userAvatar').slice(8, -1);
    this.type = "posts"
    this.page = 1;
    this.pages = [];
    this.groups = [];
    this.events = [];
    this.getSavedPosts();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SavedPage');
  }

  getTime(time) {
    return this.time.getTime(time);
  }

  getSavedPosts(more = false, GotPosts = 30) {
    let loading = this.loadingCtrl.create({
      content: "",
      spinner: "bubbles",
      showBackdrop: true,
    });
    loading.present()
    this.remoteService.savedFeeds(this.userId).subscribe(res => {

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
      this.posts = res
      if (GotPosts > 30) {
        console.log()
        this.posts.push(res)
      }
      loading.dismiss();
      console.log(this.posts)
    });

  }

  likeFeed(userid = this.userId, feedid, postIndex) {

    this.remoteService.likeFeedApiCall(this.userId, feedid).subscribe(res => {

      this.posts[postIndex].like_count = res.likes;
      this.posts[postIndex].has_like = res.has_like;
    })


  }

  likeComment(userid = this.userId, commentID, postIndex, commentIndex) {
    this.remoteService.likeCommentApiCall(this.userId, commentID).subscribe(res => {
      this.likes = res;
      for (let i = 0; i < this.posts[postIndex].answers[0].length; i++) {
        if (this.posts[postIndex].answers[0][commentIndex].id == commentID) {
          this.posts[postIndex].answers[0][commentIndex].like_count = this.likes.likes;
          this.posts[postIndex].answers[0][commentIndex].has_like = this.likes.has_like;
          break
        }
      }
    })
  }

  likeReply(userid = this.userId, replyID, postIndex, commentIndex, replyIndex) {
    this.remoteService.likeCommentApiCall(this.userId, replyID).subscribe(res => {
      for (let i = 0; i < this.posts[postIndex].answers[0][commentIndex].repliesContent.length; i++) {
        if (this.posts[postIndex].answers[0][commentIndex].repliesContent[i].id == replyID) {
          this.posts[postIndex].answers[0][commentIndex].repliesContent[i].like_count = res.likes;
          this.posts[postIndex].answers[0][commentIndex].repliesContent[i].has_like = res.has_like;
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
      for (let x in this.posts) {
        if (this.posts[x].id == res.postid) {
          this.posts[x].answers[0].push(res)
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
      this.posts[postindex].answers[0][commentindex].repliesContent.push(res)
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

  editPost() {
    $(document).on('click', '.comment-edit', function() {
      $(this).parent().prev().find('.input-group').show();

    })
    $(document).on('click', '.cancel-edit', function() {
      $(this).parent().hide();

    })
  }

  // ConfirmEditPost(text,feedid) {
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
        this.posts[index].saved = true;
      }
    })
  }

  unsavePost(feedid, index) {
    this.remoteService.unsaveItem('feed', feedid, this.userId).subscribe(res => {
      if (res.status == 1) {
        this.posts[index].saved = false;
      }
    })
  }

  donotLikePost(feedid, index, userID = this.userId) {
    this.remoteService.hidePost(feedid, userID).subscribe(res => {
      // this.hiddenPost = res.status
      if (res.status == 1) {
        this.posts[index].hidden = true;
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
        this.posts[index].hidden = false;
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
                this.posts.splice(index, 1)
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
                this.posts[feedIndex].answers[0].splice(commentIndex, 1);
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

  editPostView(index) {
    this.navCtrl.push(EditPostPage, {
      post: this.posts[index]
    });
  }

  showComments(id) {
    $('#' + id).show();
    console.log('#' + id);
  }

  turnNotifications(feedid, index, feedType, userID = this.userId) {
    if (feedType == true) {
      this.remoteService.unsubscribePost(feedid, userID).subscribe((data) => {
        console.log(data)
        if (data.status == 1) {
          this.posts[index].has_subscribed = !feedType
        }
      })

    } else {
      this.remoteService.subscribePost(feedid, userID).subscribe((data) => {
        console.log(data)
        if (data.status == 1) {
          this.posts[index].has_subscribed = !feedType
        }
      })

    }
  }

  showPost(feed) {
    this.postToDisplay = feed
    console.log(this.postToDisplay)
    this.navCtrl.push(DisplayPostPage, { 'post': this.postToDisplay })
  }

  editComment(id, text, feedIndex, commentIndex) {
    this.remoteService.editComment(this.userId, id, text).subscribe(res => {
      if (res.status == 1) {
        console.log(this.posts[feedIndex]);
        this.posts[feedIndex].answers[0][commentIndex].text = text;
        $('.saveComment').parent().hide();
      }
    })
  }

  //////////////////////////////////////////
  effects() {
    $(this).css('background-color', 'grey')
  }

  getSavedPages(page) {
    if (page == 1)
      this.pages = [];
      $('#noPages').hide();
    let loading = this.loadingCtrl.create({
      content: "Loading",
    });
    loading.present()
    this.remoteService.getPages("saved", "", "all", this.userId, page, 4).subscribe(res => {
      loading.dismiss();
      if(res.pages.length == 0 || res.pages.length < 4)
        $('#morePages').hide();
      if(page == 1 && res.pages.length == 0)
        $('#noPages').show();
      for (let x of res.pages) {
        this.pages.push(x);
      }
      console.log(res);
    });
    this.page = page;
  }
  pagePage(page) {
    this.navCtrl.push(Page, {
      page: page
    });
  }
  likePage(userId, pageId, type, index) {
    this.remoteService.likePage(userId, pageId, type).subscribe(res => {
      if (type == "like") {
        this.pages[index].has_like = true;
      } else {
        this.pages[index].has_like = false;
      }

    });
  }

  getSavedGroups(page) {
    if (page == 1)
      this.groups = [];
      $('#noGroups').hide();
    let loading = this.loadingCtrl.create({
      content: "Loading",
    });
    loading.present()
    this.remoteService.getGroups("saved", "", "all", this.userId, page, 4).subscribe(res => {
      loading.dismiss();
      if(res.length == 0 || res.length < 4)
        $('#moreGroups').hide();
      if(page == 1 && res.length == 0)
        $('#noGroups').show();
      for (let x of res) {
        this.groups.push(x);
      }
      console.log(res);
    });
    this.page = page;
  }
  groupPage(group) {
    this.navCtrl.push(GroupPage, {
      group: group
    })
  }
  joinGroup(group_id, status, userId, index) {
    this.remoteService.joinGroup(group_id, status, userId).subscribe(res => {
      if (status == '0') {
        this.groups[index].is_member = true;
      } else {
        this.groups[index].is_member = false;
      }
    });

  }
  getSavedEvents(page) {
    if (page == 1)
      this.events = [];
    $('#noEvents').hide();
    let loading = this.loadingCtrl.create({
      content: "Loading",
    });
    loading.present()
    this.remoteService.getEvents("saved", "all", "", this.userId, page, 2).subscribe(res => {
      loading.dismiss();
      if(res.events.length == 0 || res.events.length < 4)
        $('#moreEvents').hide();
      if(page == 1 && res.events.length == 0)
        $('#noEvents').show();
      for (let x of res.events) {
        this.events.push(x);
      }
      console.log(res);
    });
    this.page = page;
  }

  goToEventPage(event) {
    this.navCtrl.push(EventPage, {
      event: event
    });
  }
  display(type) {
    if (type == 'posts')
      this.getSavedPosts();
    else if (type == 'groups')
      this.getSavedGroups(1);
    else if (type == 'events')
      this.getSavedEvents(1);
    else if (type == 'pages')
      this.getSavedPages(1);
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
            this.remoteService.reportItem("post", this.posts[index].feed_url, data.reason, this.userId).subscribe(res => {
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
  back() {
    this.navCtrl.push(TabsPage);
  }

}
