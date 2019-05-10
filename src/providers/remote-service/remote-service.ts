import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams } from '@angular/http';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { AlertController, LoadingController } from 'ionic-angular'
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
let alert1;
let userID = '25';
// var config = {
//     apiKey: "AIzaSyBECrQse7tXt8QiqiV_TJCxwLYOIwKWIW0",
//     authDomain: "arabface-ca807.firebaseapp.com",
//     databaseURL: "https://arabface-ca807.firebaseio.com",
//     projectId: "arabface-ca807",
//     storageBucket: "",
//     messagingSenderId: "826683338673"
//   };
let user;
/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
// /serverURL = 'http://udsolutions.co.uk/Arabface/api/'
let apiURL = 'https://arabface.online/api/89129812/';

@Injectable()
export class RemoteServiceProvider {
  public Id: number;
  deviceLanguage
  response;
  serverURL = 'https://arabface.online'
  KEY = '89129812'


  public xmlLang: any;
  constructor(public loadingctr: LoadingController, public alertctrl: AlertController, public http: Http, public platform: Platform) {

    this.init();
    //getremote = this.remoteid
    // firebase.initializeApp(config)
    alert1 = this.alertctrl;
  }
  // login = (data) => {
  //   let loader = this.loadingctr.create({
  //
  //     showBackdrop: false
  //   });
  //   loader.present();
  //   const url = this.serverURL + '/api/' + this.KEY + '/login?' + 'username=' + data.username + '&password=' + data.password;
  //   console.log(url)
  //
  //   var headers = new Headers();
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   this.http.post(url, headers).subscribe(data3 => {
  //     this.response = data3.text();
  //
  //     this.response = JSON.parse(this.response);
  //
  //
  //     if (this.response.status == 1) {
  //       localStorage.setItem('userid', this.response.id)
  //
  //       avatar = this.response.avatar;
  //       name = this.response.name;
  //       userID = this.response.id;
  //       firebase.auth().signInWithEmailAndPassword(data.username, data.password).then(() => {
  //
  //         loader.dismiss();
  //
  //       }).catch(function(error) {
  //         loader.dismiss();
  //
  //         // Handle Errors here.
  //         var errorCode = error.code;
  //
  //
  //
  //         if (errorCode == 'auth/user-not-found') {
  //
  //
  //           var storageRef = firebase.storage().ref();
  //
  //           // Create a reference to 'mountains.jpg'
  //
  //
  //
  //           var getFileBlob = function(url, cb) {
  //             var xhr = new XMLHttpRequest();
  //             xhr.open('GET', url);
  //             xhr.responseType = 'blob';
  //             xhr.addEventListener('load', function() {
  //               cb(xhr.response);
  //             });
  //             xhr.send();
  //           };
  //
  //           var blobToFile = function(blob, name) {
  //             blob.lastModifiedDate = new Date();
  //             blob.name = name;
  //             return blob;
  //           };
  //
  //           var getFileObject = function(filePathOrUrl, cb) {
  //             getFileBlob(filePathOrUrl, function(blob) {
  //               cb(blobToFile(blob, 'test.jpg'));
  //             });
  //           };
  //
  //           getFileObject(avatar, function(fileObject) {
  //             var uploadTask = storageRef.child('images/test.jpg').put(fileObject);
  //
  //             uploadTask.on('state_changed', function(snapshot) {
  //
  //             }, function(error) {
  //
  //             }, function() {
  //               downloadURL = uploadTask.snapshot.downloadURL;
  //
  //
  //               firebase.auth().createUserWithEmailAndPassword(data.username, data.password).then(() => {
  //                 loader.dismiss();
  //                 var user = firebase.auth().currentUser;
  //                 user.updateProfile({
  //
  //                   displayName: name,
  //                   photoURL: downloadURL,
  //                 }).then(function() {
  //
  //                 }).catch(function(error) {
  //                   // An error happened.
  //                 });
  //               }).catch(function(error) {
  //                 // Handle Errors here.
  //                 var errorCode = error.code;
  //                 var errorMessage = error.message;
  //                 let alert = alert1.create({
  //                   title: 'Error',
  //                   subTitle: errorMessage,
  //                   buttons: ['OK']
  //                 });
  //                 alert.present();
  //               });
  //
  //
  //
  //
  //             });
  //           });
  //
  //
  //           firebase.database().ref(userID + '/chats').set({ 0: 'undefined' });
  //           firebase.database().ref(userID + '/incoming').set({ 0: 'undefined' });
  //
  //         }
  //
  //       });
  //     } else {
  //       loader.dismiss();
  //       let alert = alert1.create({
  //         title: 'Error',
  //         subTitle: 'User Not Found',
  //         buttons: ['OK']
  //       });
  //       alert.present();
  //     }
  //   })
  //
  //
  // }


  set_userid(id) {
    userID = id.toString();
    console.log('userid is set to' + userID)
  }

  // creat1(email, password, name, data) {
  //   let loader = this.loadingctr.create({
  //
  //     showBackdrop: false
  //   });
  //   loader.present();
  //   let body = new URLSearchParams();
  //   body.append('firstname', data.firstname);
  //   body.append('lastname', data.lastname);
  //   body.append('username', name);
  //   body.append('email_address', data.email_address);
  //   body.append('password', password);
  //   let body1 = body.toString();
  //
  //
  //
  //   let url = this.serverURL + '/api/' + this.KEY + '/signup?' + 'firstname=' + data.firstname + '&lastname=' + data.lastname + '&username=' + name + '&email_address=' + data.email_address + '&password=' + password;
  //   let url2 = this.serverURL + '/api/' + this.KEY + '/signup';
  //
  //
  //   let headers = new Headers();
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   this.http.post(url2, body1, { headers: headers }).subscribe(data => {
  //
  //     let data1 = data.text();
  //     data = JSON.parse(data1);
  //     signupresult = data;
  //     localStorage.setItem('userid', signupresult.userid)
  //
  //     if (data.status == 1) {
  //
  //       done();
  //
  //     }
  //   });
  //   function done() {
  //
  //     firebase.auth().createUserWithEmailAndPassword(data.email_address, password).then(() => {
  //       loader.dismiss()
  //       user = firebase.auth().currentUser;
  //       user.updateProfile({
  //         displayName: data.username
  //       }).then(function() {
  //
  //
  //
  //
  //       }).catch(function(error) {
  //         // An error happened.
  //       });
  //     }).catch(function(error) {
  //       // Handle Errors here.
  //       var errorCode = error.code;
  //       var errorMessage = error.message;
  //       let alert = alert1.create({
  //         title: 'Error',
  //         subTitle: errorMessage,
  //         buttons: ['OK']
  //       });
  //       alert.present();
  //     });
  //
  //
  //   }
  //
  // }


  // public creat2(email, password, name, photo, firstname, lastname) {
  //   let url = this.serverURL + '/api/' + this.KEY + '/signup?' + 'firstname=' + firstname + 'lastname=' + lastname + 'username=' + name + 'email_address=' + email + 'password=' + password;
  //
  //   var headers = new Headers();
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   this.http.post(url, headers).subscribe(data => {
  //
  //     signupres = data;
  //     userID = signupres.id;
  //   });
  //   var storageRef = firebase.storage().ref();
  //
  //   // Create a reference to 'mountains.jpg'
  //
  //
  //
  //   var getFileBlob = function(url, cb) {
  //     var xhr = new XMLHttpRequest();
  //     xhr.open('GET', url);
  //     xhr.responseType = 'blob';
  //     xhr.addEventListener('load', function() {
  //       cb(xhr.response);
  //     });
  //     xhr.send();
  //   };
  //
  //   var blobToFile = function(blob, name) {
  //     blob.lastModifiedDate = new Date();
  //     blob.name = name;
  //     return blob;
  //   };
  //
  //   var getFileObject = function(filePathOrUrl, cb) {
  //     getFileBlob(filePathOrUrl, function(blob) {
  //       cb(blobToFile(blob, 'test.jpg'));
  //     });
  //   };
  //
  //   getFileObject(photo, function(fileObject) {
  //     var uploadTask = storageRef.child('images/test.jpg').put(fileObject);
  //
  //     uploadTask.on('state_changed', function(snapshot) {
  //
  //     }, function(error) {
  //
  //     }, function() {
  //       var downloadURL = uploadTask.snapshot.downloadURL;
  //
  //       // handle image here
  //     });
  //   });
  //
  //
  //   firebase.auth().createUserWithEmailAndPassword(email, password).then(() => {
  //
  //     user = firebase.auth().currentUser;
  //     user.updateProfile({
  //       displayName: name,
  //       photoURL: photo,
  //     }).then(function() {
  //
  //       firebase.database().ref(userID + '/chats').set({ 0: 'undefined' });
  //       firebase.database().ref(userID + '/incoming').set({ 0: 'undefined' });
  //
  //
  //     }).catch(function(error) {
  //       // An error happened.
  //     });
  //   }).catch(function(error) {
  //     // Handle Errors here.
  //     var errorCode = error.code;
  //     var errorMessage = error.message;
  //     let alert = alert1.create({
  //       title: 'Error',
  //       subTitle: errorMessage,
  //       buttons: ['OK']
  //     });
  //     alert.present();
  //   });
  //
  // }
  user = new Observable(observer => {
    // firebase.auth().onAuthStateChanged(function(user) {
    //
    //  if (user) {
    //
    //    // User is signed in.
    //    var displayName = user.displayName;
    //
    //    var email = user.email;
    //    var emailVerified = user.emailVerified;
    //    var photoURL = user.photoURL;
    //    var isAnonymous = user.isAnonymous;
    //    var uid = user.uid;
    //    var providerData = user.providerData;
    //
    //    observer.next('logged')
    //    observer.next({name:displayName})
    //  } else {
    //
    //   observer.next('not here')
    //  }
    // });

  });

  init() {



  }



  ///////// Login function Start ////////
  /* Function for handling user login in by   */
  loginPostData(sentData, type) {

    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('username', sentData.username);
      urlSearchParams.append('password', sentData.password);
      let body = urlSearchParams.toString()
      this.http.post(apiURL + type, body, { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });
  }

  ///////// Login function End ////////

  ///////// Signup function Start ////////

  signupPostData(sentData, type) {
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('firstname', sentData.firstname);
      urlSearchParams.append('lastname', sentData.lastname);
      urlSearchParams.append('username', sentData.firstname + sentData.lastname);
      urlSearchParams.append('email_address', sentData.email_address);
      urlSearchParams.append('password', sentData.password);

      let body = urlSearchParams.toString()
      this.http.post(apiURL + type, body, { headers: headers }).
        subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });

    });
  }
  ///////// Signup function End ////////


  /////////search api////////////////////
  search(term, type, userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/search?userid=' + userid + '&type=' + type + '&term=' + term)
      .map((res: Response) => res.json());
  }



  ///////// Friends function Start ////////
  friendsListApiCall(the_userid, id, term) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/profile/friends?userid=' + id + '&the_userid=' + the_userid + '&term=' + term)

      .map((res: Response) => res.json());
  }
  ///////// Friends function End ////////

  followers(userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/profile/getfollowers?userid=' + userid)
      .map((res: Response) => res.json());
  }
  following(userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/profile/getfollowing?userid=' + userid)
      .map((res: Response) => res.json());
  }

  follow(userid, to_userid, type) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/friend/follow?userid=' + userid + "&to_userid=" + to_userid + "&type=" + type)
      .map((res: Response) => res.json());
  }

  ///////// Friends Request function Start ////////
  friendsRequestListApiCall(id) {

    return this.http.get(this.serverURL + '/api/' + this.KEY + '/friend/requests?userid=' + id)
      .map((res: Response) => res.json());
  }
  ///////// Friends Request function End ////////



  ///////// Friends Request function Start ////////
  friendsSuggestionListApiCall(id) {

    return this.http.get(this.serverURL + '/api/' + this.KEY + '/friend/suggestions?limit=10&userid=' + id)
      .map((res: Response) => res.json());
  }
  ///////// Friends Request function End ////////

  ////////// Feeds function Start ///////////

  feedsListApiCall(id, type_id, type, limit) {
    let url = this.serverURL + '/api/' + this.KEY + '/feeds?type=' + type + '&type_id=' + type_id + '&limit=' + limit + '&userid=' + id;

    return this.http.get(url).map((res: Response) => res.json());

  }
  ////////// Feeds function End             ///////////

  savedFeeds(id) {
    let url = this.serverURL + '/api/' + this.KEY + '/feeds?type=saved&userid=' + id;
    console.log(url);
    return this.http.get(url).map((res: Response) => res.json());
  }

  //////////  profile Api function start   ///////////

  profileDetailsApiCall(theUserId, userid) {
    let url = this.serverURL + '/api/' + this.KEY + '/profile/details?userid=' + userid + '&the_userid=' + theUserId;

    return this.http.get(url).map((res: Response) => res.json());

  }

  //////////  profile api  function End ///////////////
  profilePosts(id) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/feeds?type=timeline&type_id=' + id)

      .map((res: Response) => res.json());
  }

  //////////  messages api  function End ///////////////

  messagesApiCall(id) {
    let url = this.serverURL + '/api/' + this.KEY + '/chat/conversations?userid=' + id;

    return this.http.get(url)
      //.do((res : Response ) => console.log(res.json()))
      .map((res: Response) => res.json());

  }

  //////////  messages api  function End ///////////////



  ////////// likes Api call function start  ////////////


  likeFeedApiCall(UserID, FeedID): any {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userid', UserID);
    urlSearchParams.append('type', 'feed');
    urlSearchParams.append('type_id', FeedID);


    let body = urlSearchParams.toString()
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/like/item', body, { headers: headers })

      //do((res : Response ) => console.log(res.json()))
      .map((res: Response) => res.json());



  }

  ///////////// likes Api call function End  ////////////////////
  likeCommentApiCall(UserID, commentId): any {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userid', UserID);
    urlSearchParams.append('type', 'comment');
    urlSearchParams.append('type_id', commentId);


    let body = urlSearchParams.toString()
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/like/item', body, { headers: headers })

      //do((res : Response ) => console.log(res.json()))
      .map((res: Response) => res.json());



  }

  ///////////// chat messages Api call function start  ////////////////////

  usersCoversation(cID, userID): any {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/chat/get/messages?cid=' + cID + '&userid=' + userID).

      do((res: Response) => console.log(res.json()))
      .map((res: Response) => res.json());
  }


  ///////////// chat messages Api call function end  ////////////////////

  sharePost(feedID, userID): any {
    console.log(feedID + userID)
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/feed/action?action=share&feed_id=' + feedID + '&userid=' + userID)

      .map((res: Response) => res.json());
  }


  editPost(text, feedID, userID, privacy): any {
    console.log(feedID + userID)
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/feed/save?text=' + text + '&id=' + feedID + '&userid=' + userID + "&privacy=" + privacy)

      .map((res: Response) => res.json());
  }
  unsubscribePost(feedID, userID): any {
    console.log(feedID + userID)
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/feed/action?action=unsubscribe&feed_id=' + feedID + '&userid=' + userID)

      .map((res: Response) => res.json());
  }
  subscribePost(feedID, userID): any {
    console.log(feedID + userID)
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/feed/action?action=subscribe&feed_id=' + feedID + '&userid=' + userID)

      .map((res: Response) => res.json());
  }

  removeComment(commentid, userID): any {
    console.log(commentid + userID)
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/comment/remove?&id=' + commentid + '&userid=' + userID)

      .map((res: Response) => res.json());
  }

  hidePost(feedID, userID): any {
    console.log(feedID + userID)
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/feed/action?action=hide&feed_id=' + feedID + '&userid=' + userID)
      .map((res: Response) => res.json());
  }

  unHidePost(feedID, userID): any {
    console.log(feedID + userID)
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/feed/action?action=unhide&feed_id=' + feedID + '&userid=' + userID)
      .map((res: Response) => res.json());
  }

  ///////////// chat messages Api call function end  ////////////////////

  removePost(feedID, userID): any {
    console.log(feedID + userID)
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/feed/action?action=remove&feed_id=' + feedID + '&userid=' + userID)

      .map((res: Response) => res.json());
  }
  ///////////  Send Messages between users start  ////////////


  ChatMessagesSend(cID, userID, msg): any {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/chat/send/message?text=' + msg + '&cid=' + cID + '&userid=' + userID).

      do((res: Response) => console.log(res.json()))
      .map((res: Response) => res.json());
  }

  ///////////  Send Messages between users End  ////////////

  ///////////// user photos Api call function start  ////////////////////

  userPhotosAlbumOnProfile(userID: number): any {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/profile/photos?the_userid=' + userID).

      do((res: Response) => console.log(res.json()))
      .map((res: Response) => res.json());
  }


  ///////////// user photos Api call function end  ////////////////////



  ///////////// user profile page changing Api call function start  ////////////////////

  changeProfilePicture(userid, avatar) {
    avatar = avatar.toJSON;
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('avatar', avatar);
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/profile/change/avatar', body, { headers: headers })

    //  do((res : Response ) => console.log(res.json()))
    // .map((res : Response ) => res.json());
  }


  /////////////user profile page changing Api call function end  ////////////////////


  //////////// post in feed ///////////////////////

  feedPosting(userID, post, feeling = 'none', postType = 'text', privacy = '1', background = 'default', tag: any = 'no', type, type_id, to_user_id = "") {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userid', userID);

    if (type == 'page') {
      urlSearchParams.append('entity_id', type_id);
      urlSearchParams.append('entity_type', 'page');

    } else {
      urlSearchParams.append('entity_id', userID);
      urlSearchParams.append('entity_type', 'user');

    }
    if (postType == 'feeling') {
      urlSearchParams.append('feeling_type', feeling);
      urlSearchParams.append('feeling_text', post);
    } else if (postType == 'feeling&text') {

      urlSearchParams.append('feeling_type', feeling);
      urlSearchParams.append('feeling_text', post.feeling);
      urlSearchParams.append('text', post.text);

    } else if (tag != 'no') {
      let tags = ''
      for (let x = 0; x < tag.length; x++) {
        tags += tag[x].toString() + ',';
      }
      urlSearchParams.append('tags', tags)
      urlSearchParams.append('text', post);

    }
    else {
      urlSearchParams.append('text', post);

    }
    urlSearchParams.append('privacy', privacy);

    urlSearchParams.append('type', type);
    urlSearchParams.append('type_id', type_id);
    urlSearchParams.append('background', background);
    urlSearchParams.append('to_user_id', to_user_id);

    let body = urlSearchParams.toString()

    return this.http.post(this.serverURL + '/api/' + this.KEY + '/feed/add', body, { headers: headers })

      //do((res : Response ) => console.log(res.json()))
      .map((res: Response) => res.json());
  }
  locationPosting(userID, location) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userid', userID);
    urlSearchParams.append('entity_id', userID);
    urlSearchParams.append('type', 'feed');
    urlSearchParams.append('entity_type', 'user');
    urlSearchParams.append('feeling_type', 'listening-to');
    urlSearchParams.append('location', location);

    let body = urlSearchParams.toString()

    return this.http.post(this.serverURL + '/api/' + this.KEY + '/feed/add', body, { headers: headers })
      //do((res : Response ) => console.log(res.json()))
      .map((res: Response) => res.json());
  }
  backgroundPosting(userID, location) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userid', userID);
    urlSearchParams.append('entity_id', userID);
    urlSearchParams.append('type', 'feed');
    urlSearchParams.append('entity_type', 'user');
    urlSearchParams.append('background', 'listening-to');

    let body = urlSearchParams.toString()

    return this.http.post(this.serverURL + '/api/' + this.KEY + '/feed/add', body, { headers: headers })
      //do((res : Response ) => console.log(res.json()))
      .map((res: Response) => res.json());
  }
  ////////////////////////////////////////////////
  commentOnFeeds(postOwner, postID, whoCommented, comment, type, entity_type = 'user') {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/comment/add?userid=' + whoCommented + '&entity_id=' + postOwner + '&entity_type=' + entity_type + '&text=' + comment + '&type=' + type + '&type_id=' + postID)
      .map((res: Response) => res.json());
  }

  //////////// post in feed ///////////////////////
  ReplyOnComment(postOwner, commentID, whoCommented, reply, entity_type = 'user') {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/comment/add?userid=' + whoCommented + '&entity_id=' + postOwner + '&entity_type=' + entity_type + '&text=' + reply + '&type=comment&type_id=' + commentID)
      .map((res: Response) => res.json());
  }

  ////////////////////////////////////////////////

  getUserData(attr, userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/get/user/data?userid=' + userid + '&attr=' + attr)
      //do((res : Response ) => console.log(res.json()))
      .map((res: Response) => res.json());
  }
  ////////////////////////////////////////////////


  //////////// post in feed ///////////////////////
  profilePost(userID, post) {

    console.log(userID, post)
    let url = this.serverURL + '/api/' + this.KEY + '/feed/add?type=feed&entity_type=user&text=' + post + '&entity_id=' + userID;
    console.log(url)
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/feed/add?type=feed&entity_type=user&text=ppppp&entity_id=25')

      .map((res: Response) => res.json());
  }

  ////////////////////////////////////////////////

  ////////////// get notifications /////////////////
  getNotifications(userid, limit, page) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/notifications?userid=' + userid + "&limit=" + limit + "&page=" + page)
      .map((res: Response) => res.json());
  }

  getUnreadNotifications(userid, limit, page) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/notifications/unread?userid=' + userid + "&limit=" + limit + "&page=" + page)
      .map((res: Response) => res.json());
  }

  deleteNotification(userid, id) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/notification/delete?userid=' + userid + "&id=" + id)
      .map((res: Response) => res.json());
  }

  markReadNotification(userid, id, type) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/notification/mark/read?userid=' + userid + "&id=" + id + "&type=" + type)
      .map((res: Response) => res.json());
  }

  //////////////////////////////////////////////


  searchUsers(term) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/search/users?term=' + term)
      .map((res: Response) => res.json());
  }

  //////////////////// load comments ////////////////////

  loadComments(feedid, userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/comment/load?type=feed&limit=10&type_id=' + feedid + "&userid=" + userid)
      .map((res: Response) => res.json());
  }
  getComments(type, type_id, limit, offset, userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/comment/load?userid=' + userid + '&limit=' + limit + '&type_id=' + type_id + '&offset=' + offset + '&type=' + type)
      .map((res: Response) => res.json());
  }

  loadReplies(commentID) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/comment/load?type=comment&limit=10&type_id=' + commentID)
      .map((res: Response) => res.json());
  }

  loadProfileComments(feedid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/comment/load?type=feed&limit=5&type_id=' + feedid)
      .map((res: Response) => res.json());
  }

  getProfileVisitors(userid, limit) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/get/lastvisitors?userid=' + userid + "&limit=" + limit)
      .map((res: Response) => res.json());
  }

  // feedposting (userID,post) :any {
  //     return new Promise ((resolve )=> {
  //       var settings = {
  //         'async': true,
  //         'crossDomain': true,
  //         'url': this.serverURL+'/api/'+this.KEY+'/feed/add?type=feed&entity_type=user&text='+post+'&entity_id='+userID,
  //         'method': 'GET',
  //         'headers': {
  //           'x-devtools-emulate-network-conditions-client-id': '964b73d8-9467-4f26-bff0-ddb7029125a0',
  //           'accept-language': 'en-US,en;q=0.8',
  //           'cache-control': 'no-cache',
  //         }
  //       }

  //       $.ajax(settings).done(function (response) {
  //         console.log(response);
  //           resolve(response)

  //       });
  //     })
  // }



  /////////////////////////////////////////////////////


  feedsComment(postOwner, postID, whoCommented, comment) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/comment/add?userid=' + whoCommented + '&entity_id=' + postOwner + '&entity_type=user&text=' + comment + '&type=feed&type_id=' + postID)

      //do((res : Response ) => console.log(res.json()))
      .map((res: Response) => res.json());
  }

  editComment(userid, id, text) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/comment/edit?userid=' + userid + '&id=' + id + "&text=" + text)
      .map((res: Response) => res.json());
  }



  //////////////////// add friend ////////////////////

  addFriend(userid, friendID) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/friend/add?userid=' + userid + '&to_userid=' + friendID)

      //do((res : Response ) => console.log(res.json()))
      .map((res: Response) => res.json());
  }



  /////////////////////////////////////////////////////
  //////////////////// load comments ////////////////////

  ConfirmFriendRequest(userid, friendID) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/friend/confirm?userid=' + userid + '&to_userid=' + friendID)

      //do((res : Response ) => console.log(res.json()))
      .map((res: Response) => res.json());
  }



  /////////////////////////////////////////////////////
  //////////////////// load comments ////////////////////

  deleteFriendRequest(userid, friendID) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/friend/remove?userid=' + userid + '&to_userid=' + friendID)

      //do((res : Response ) => console.log(res.json()))
      .map((res: Response) => res.json());
  }



  /////////////////////////////////////////////////////
  onlineFriends(userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/friend/online?userid=' + userid)
      //do((res : Response ) => console.log(res.json()))
      .map((res: Response) => res.json());

  }
  deleteAccount(userid, password) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/delete/account?userid=' + userid + "&password=" + password)
      .map((res: Response) => res.json());
  }

  saveItem(type, typeId, userid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('type', type);
    urlSearchParams.append('type_id', typeId);
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()

    return this.http.post(this.serverURL + '/api/' + this.KEY + '/save/item', body, { headers: headers })
      .map((res: Response) => res.json());
  }
  unsaveItem(type, typeId, userid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('type', type);
    urlSearchParams.append('type_id', typeId);
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()

    return this.http.post(this.serverURL + '/api/' + this.KEY + '/unsave/item', body, { headers: headers })
      .map((res: Response) => res.json());
  }
  isSaved(type, typeId, userid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('type', type);
    urlSearchParams.append('type_id', typeId);
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()

    return this.http.post(this.serverURL + '/api/' + this.KEY + '/saved/item', body, { headers: headers })
      .map((res: Response) => res.json());
  }
  reportItem(type, link, reason, userId) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/report?type=' + type + '&type=' + type + '&link=' + link + '&reason=' + reason + '&userid=' + userId)
      .map((res: Response) => res.json());
  }

  /////////////// get  pages /////////////////////////
  getPages(type, term, categoryId, userId, page, limit) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/page/browse?type=' + type + '&term=' + term + '&category_id=' + categoryId + '&page=' + page + '&limit=' + limit + '&userid=' + userId)
      .map((res: Response) => res.json());
  }

  getPageDetails(userid, id) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/page/get/details?userid=' + userid + '&id=' + id)
      .map((res: Response) => res.json());
  }

  getPagesCategories() {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/page/get/categories')
      .map((res: Response) => res.json());
  }

  /////////////// create  page /////////////////////////
  createPage(title, description, category, userId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userid', userId);
    urlSearchParams.append('title', title);
    urlSearchParams.append('description', description);
    urlSearchParams.append('category', category);
    let body = urlSearchParams.toString()

    return this.http.post(this.serverURL + '/api/' + this.KEY + '/page/create', body, { headers: headers })
      //do((res : Response ) => console.log(res.json()))
      .map((res: Response) => res.json());
  }


  editPage(title, description, category, pageId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('page_id', pageId);
    urlSearchParams.append('title', title);
    urlSearchParams.append('description', description);
    urlSearchParams.append('category', category);
    let body = urlSearchParams.toString()

    return this.http.post(this.serverURL + '/api/' + this.KEY + '/page/edit', body, { headers: headers })
      //do((res : Response ) => console.log(res.json()))
      .map((res: Response) => res.json());
  }

  likePage(userId, pageId, type): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userid', userId);
    urlSearchParams.append('type', 'page');
    urlSearchParams.append('type_id', pageId);
    let body = urlSearchParams.toString()
    if (type == 'like')
      return this.http.post(this.serverURL + '/api/' + this.KEY + '/like/item', body, { headers: headers })
        //do((res : Response ) => console.log(res.json()))
        .map((res: Response) => res.json());
    else
      return this.http.post(this.serverURL + '/api/' + this.KEY + '/dislike/item', body, { headers: headers })

        //do((res : Response ) => console.log(res.json()))
        .map((res: Response) => res.json());
  }


  deletePage(pageId, userId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('page_id', pageId);
    urlSearchParams.append('userid', userId);
    let body = urlSearchParams.toString()
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/page/delete', body, { headers: headers })
      //do((res : Response ) => console.log(res.json()))
      .map((res: Response) => res.json());
  }
  pageLikes(typeId, userId, likeType) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/count/likes?type=page&type_id=' + typeId + '&userid=' + userId + '&like_type=' + likeType)
      .map((res: Response) => res.json());
  }

  getPageRoles(id, userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/page/get/roles?userid=' + userid + '&id=' + id)
      .map((res: Response) => res.json());
  }
  savePageRoles(pageId, roles, userid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    for (var key in roles) {
      urlSearchParams.append('roles[' + key + ']', roles[key]);
    }
    // urlSearchParams.append('roles', roles );
    urlSearchParams.append('page_id', pageId);
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString();
    console.log(urlSearchParams);
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/page/save/roles', body, { headers: headers })
      .map((res: Response) => res.json());
  }

  removePageRole(user, page_id, userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/page/remove/role?userid=' + userid + '&user=' + user + '&page_id=' + page_id)
      .map((res: Response) => res.json());
  }
  inviteFriendTolikepage(userid, page_id, invited_id) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/page/invite/friend?userid=' + userid + '&user=' + user + '&page_id=' + page_id + '&invited_id=' + invited_id)
      .map((res: Response) => res.json());
  }
  isInvitedPage(page, user, userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/page/invited?userid=' + userid + '&page=' + page + '&user=' + user)
      .map((res: Response) => res.json());
  }


  getGroups(type, term, filter, userId, page, limit) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/group/browse?type=' + type + '&term=' + term + '&filter=' + filter + '&page=' + page + '&limit=' + limit + '&userid=' + userId)
      .map((res: Response) => res.json());

  }

  createGroup(title, description, name, privacy, userId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userid', userId);
    urlSearchParams.append('title', title);
    urlSearchParams.append('description', description);
    urlSearchParams.append('name', name);
    urlSearchParams.append('privacy', privacy);
    let body = urlSearchParams.toString()

    return this.http.post(this.serverURL + '/api/' + this.KEY + '/group/create', body, { headers: headers })

      //do((res : Response ) => console.log(res.json()))
      .map((res: Response) => res.json());
  }
  editGroup(title, description, privacy, groupId, canPost, canAddMember) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('group_id', groupId);
    urlSearchParams.append('title', title);
    urlSearchParams.append('description', description);
    urlSearchParams.append('name', title);
    urlSearchParams.append('privacy', privacy);
    urlSearchParams.append('who_can_post', canPost);
    urlSearchParams.append('who_can_add_member', canAddMember);
    let body = urlSearchParams.toString()

    return this.http.post(this.serverURL + '/api/' + this.KEY + '/group/edit', body, { headers: headers })

      //do((res : Response ) => console.log(res.json()))
      .map((res: Response) => res.json());
  }

  deleteGroup(groupId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('group_id', groupId);
    let body = urlSearchParams.toString()
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/group/delete', body, { headers: headers })
      //do((res : Response ) => console.log(res.json()))
      .map((res: Response) => res.json());
  }

  joinGroup(group_id, status, userid): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userid', userid);
    urlSearchParams.append('status', status);
    urlSearchParams.append('group_id', group_id);
    let body = urlSearchParams.toString()

    return this.http.post(this.serverURL + '/api/' + this.KEY + '/group/join', body, { headers: headers })
      //do((res : Response ) => console.log(res.json()))
      .map((res: Response) => res.json());
  }


  groupFeeding(id) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/feeds?type=group&type_id=' + id)
      .map((res: Response) => res.json());
  }

  groupMembers(group_id, userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/group/members?group_id=' + group_id + '&userid=' + userid)
      .map((res: Response) => res.json());
  }

  isMember(group_id, id, userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/group/member?group_id=' + group_id + '&id=' + id + '&userid=' + userid)
      .map((res: Response) => res.json());
  }
  addMember(group_id, id, userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/group/add/member?group_id=' + group_id + '&user_id=' + id + '&userid=' + userid)
      .map((res: Response) => res.json());
  }

  groupDetails(group_id, userid){
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/group/get/details?id=' + group_id + '&userid=' + userid)
      .map((res: Response) => res.json());
  }
  /////////////////// Events /////////////////////////

  getEvents(type, categoryId, term, userId, page, limit) {
    if (type == '') {
      return this.http.get(this.serverURL + '/api/' + this.KEY + '/event/browse?userid=' + userId + '&term=' + term + '&category_id=' + categoryId + '&page=' + page + '&limit=' + limit)
        .map((res: Response) => res.json());
    }
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/event/browse?userid=' + userId + '&term=' + term + '&category_id=' + categoryId + '&type=' + type + '&page=' + page + '&limit=' + limit)
      .map((res: Response) => res.json());

  }

  getBirthdays(userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/event/birthdays?userid=' + userid)
      .map((res: Response) => res.json());
  }
  getEventCategories() {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/event/get/categories')
      .map((res: Response) => res.json());
  }

  createEvent(title, description, category_id, location, address, start_day, start_month, start_year, start_hour, start_minute, start_time_type, privacy, end_day, end_month, end_year, end_hour, end_minute, end_time_type, userid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('title', title);
    urlSearchParams.append('description', description);
    urlSearchParams.append('category_id', category_id);
    urlSearchParams.append('location', location);
    urlSearchParams.append('address', address);
    urlSearchParams.append('start_day', start_day);
    urlSearchParams.append('start_month', start_month);
    urlSearchParams.append('start_year', start_year);
    urlSearchParams.append('start_hour', start_hour);
    urlSearchParams.append('start_minute', start_minute);
    urlSearchParams.append('start_time_type', start_time_type);
    urlSearchParams.append('privacy', privacy);
    urlSearchParams.append('end_day', end_day);
    urlSearchParams.append('end_month', end_month);
    urlSearchParams.append('end_year', end_year);
    urlSearchParams.append('end_hour', end_hour);
    urlSearchParams.append('end_minute', end_minute);
    urlSearchParams.append('end_time_type', end_time_type);
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()

    return this.http.post(this.serverURL + '/api/' + this.KEY + '/event/create', body, { headers: headers })
      .map((res: Response) => res.json());
  }
  editEvent(title, description, category_id, location, address, start_day, start_month, start_year, start_hour, start_minute, start_time_type, privacy, end_day, end_month, end_year, end_hour, end_minute, end_time_type, userid, eventId) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('title', title);
    urlSearchParams.append('description', description);
    urlSearchParams.append('category_id', category_id);
    urlSearchParams.append('location', location);
    urlSearchParams.append('address', address);
    urlSearchParams.append('start_day', start_day);
    urlSearchParams.append('start_month', start_month);
    urlSearchParams.append('start_year', start_year);
    urlSearchParams.append('start_hour', start_hour);
    urlSearchParams.append('start_minute', start_minute);
    urlSearchParams.append('start_time_type', start_time_type);
    urlSearchParams.append('privacy', privacy);
    urlSearchParams.append('end_day', end_day);
    urlSearchParams.append('end_month', end_month);
    urlSearchParams.append('end_year', end_year);
    urlSearchParams.append('end_hour', end_hour);
    urlSearchParams.append('end_minute', end_minute);
    urlSearchParams.append('end_time_type', end_time_type);
    urlSearchParams.append('userid', userid);
    urlSearchParams.append('event_id', eventId);
    let body = urlSearchParams.toString()

    return this.http.post(this.serverURL + '/api/' + this.KEY + '/event/edit', body, { headers: headers })
      .map((res: Response) => res.json());
  }

  deleteEvent(event_id, userid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('event_id', event_id);
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/event/delete', body, { headers: headers })
      .map((res: Response) => res.json());

  }
  rsvp(event_id, rsvp, userid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('event_id', event_id);
    urlSearchParams.append('rsvp', rsvp);
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/event/rsvp', body, { headers: headers })
      .map((res: Response) => res.json());
  }
  inviteFriendToEvent(event_id, invited_id, userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/event/invite/friend?userid=' + userid + '&event_id=' + event_id + '&invited_id=' + invited_id)
      .map((res: Response) => res.json());
  }
  isInvitedEvent(event_id, user, userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/event/invited?userid=' + userid + '&event_id=' + event_id + '&user=' + user)
      .map((res: Response) => res.json());
  }

  eventDetails(event_id, userid){
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/event/get/details?id=' + event_id + '&userid=' + userid)
      .map((res: Response) => res.json());
  }
  ////////////////////////////////////////////////////

  /////////////////// Videos ////////////////////////

  getVideos(categoryId, term, type, filter, userId, page, limit) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/videos/browse?userid=' + userId + '&term=' + term + '&category_id=' + categoryId + '&type=' + type + '&filter=' + filter + '&page=' + page + '&limit=' + limit)
      .map((res: Response) => res.json());
  }
  getVideoCategories() {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/videos/get/categories')
      .map((res: Response) => res.json());
  }
  addNewVideo(title, description, privacy, link, category, userid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('title', title);
    urlSearchParams.append('description', description);
    urlSearchParams.append('privacy', privacy);
    urlSearchParams.append('link', link);
    urlSearchParams.append('category', category);
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/video/create', body, { headers: headers })
      .map((res: Response) => res.json());
  }
  deleteVideo(video_id, userid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('video_id', video_id);
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/video/delete', body, { headers: headers })
      .map((res: Response) => res.json());
  }
  editVideo(title, desc, privacy, category_id, video_id, userid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('title', title);
    urlSearchParams.append('desc', desc);
    urlSearchParams.append('privacy', privacy);
    urlSearchParams.append('category_id', category_id);
    urlSearchParams.append('video_id', video_id);
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/video/edit', body, { headers: headers })
      .map((res: Response) => res.json());
  }

  likeVideo(userId, videoId, type): any {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userid', userId);
    urlSearchParams.append('type', 'video');
    urlSearchParams.append('type_id', videoId);
    let body = urlSearchParams.toString()
    if (type == 'like')
      return this.http.post(this.serverURL + '/api/' + this.KEY + '/like/item', body, { headers: headers })
        //do((res : Response ) => console.log(res.json()))
        .map((res: Response) => res.json());
    else
      return this.http.post(this.serverURL + '/api/' + this.KEY + '/dislike/item', body, { headers: headers })
        .map((res: Response) => res.json());
  }

  videoDetails(video_id, userid){
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/video/get/details?id=' + video_id + '&userid=' + userid)
      .map((res: Response) => res.json());
  }

  ///////////////////////////////////////////////////


  //////////////////// Settings /////////////////////
  getSettingsNotifications(userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/settings/get/notifications?userid=' + userid)
      .map((res: Response) => res.json());
  }

  setSettingsNotifications(following_you, site_mention_you, site_tag_you, site_comment, site_reply_comment, site_like, site_share_item, site_store, userid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('notify-following-you', following_you);
    urlSearchParams.append('notify-site-mention-you', site_mention_you);
    urlSearchParams.append('notify-site-tag-you', site_tag_you);
    urlSearchParams.append('notify-site-comment', site_comment);
    urlSearchParams.append('notify-site-reply-comment', site_reply_comment);
    urlSearchParams.append('notify-site-like', site_like);
    urlSearchParams.append('notify-site-share-item', site_share_item);
    urlSearchParams.append('notify-site-store', site_store);
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/settings/notifications', body, { headers: headers })
      .map((res: Response) => res.json());
  }
  changePassword(current_password, new_password, userid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('current_password', current_password);
    urlSearchParams.append('new_password', new_password);
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/settings/password', body, { headers: headers })
      .map((res: Response) => res.json());
  }
  settingsPrivacy(wcvp, wcpp, wcsb, wcsm, wcsv, en, userid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('who_can_view_profile', wcvp);
    urlSearchParams.append('who_can_post_profile', wcpp);
    urlSearchParams.append('who_can_see_birth', wcsb);
    urlSearchParams.append('who_can_send_message', wcsm)
    urlSearchParams.append('who_can_see_visitors', wcsv);
    urlSearchParams.append('email-notification', en)
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/settings/privacy', body, { headers: headers })
      .map((res: Response) => res.json());
  }
  settingsGeneral(first, last, email, username, gender, country, city, state, bio, userid, birth_day, birth_month, birth_year) {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('first_name', first);
    urlSearchParams.append('last_name', last);
    urlSearchParams.append('email_address', email);
    urlSearchParams.append('username', username);
    urlSearchParams.append('gender', gender);
    urlSearchParams.append('state', state);
    urlSearchParams.append('country', country);
    urlSearchParams.append('city', city);
    urlSearchParams.append('bio', bio);
    urlSearchParams.append('userid', userid);
    urlSearchParams.append('birth_day', birth_day);
    urlSearchParams.append('birth_month', birth_month);
    urlSearchParams.append('birth_year', birth_year);
    let body = urlSearchParams.toString()
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/settings/general', body, { headers: headers })
      .map((res: Response) => res.json());
  }

  ////////////////// Contact Us /////////////////////////
  contactUs(name, email, subject, message, userid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('name', name);
    urlSearchParams.append('email', email);
    urlSearchParams.append('subject', subject);
    urlSearchParams.append('message', message);
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/contact', body, { headers: headers })
      .map((res: Response) => res.json());
  }
  /////////////////////////////////////////////////////

  ////////////////// Trending /////////////////////////
  getHashtag(userid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/hashtag/get', body, { headers: headers })
      .map((res: Response) => res.json());
  }
  ////////////////////////////////////////////////////////

  ////////////////// Blocking ///////////////////////////
  blockUser(id, userid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/block/user', body, { headers: headers })
      .map((res: Response) => res.json());
  }
  unblockUser(id, userid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/unblock/user', body, { headers: headers })
      .map((res: Response) => res.json());
  }
  isBlocked(id, userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/blocked?id=' + id + '&userid=' + userid)
      .map((res: Response) => res.json());
  }
  getAllBlocked(userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/all/blocked?userid=' + userid)
      .map((res: Response) => res.json());
  }
  ////////////////////////////////////////////////////

  getPhotos(userid, album_id, limit, offset, the_userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/photo/album/photos?userid=' + userid + '&album_id=' + album_id + '&limit=' + limit + '&offset=' + offset + '&the_userid=' + the_userid)
      .map((res: Response) => res.json());
  }

  getAlbums(userid, limit, offset, type) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/photo/albums?userid=' + userid + '&limit=' + limit + '&offset=' + offset + '&type=' + type)
      .map((res: Response) => res.json());
  }

  createAlbum(title, desc, privacy, userid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('title', title);
    urlSearchParams.append('desc', desc);
    urlSearchParams.append('privacy', privacy);
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/photo/album/add', body, { headers: headers })
      .map((res: Response) => res.json());
  }

  editAlbum(title, desc, privacy, album_id, userid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('title', title);
    urlSearchParams.append('desc', desc);
    urlSearchParams.append('privacy', privacy);
    urlSearchParams.append('album_id', album_id);
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/photo/album/edit', body, { headers: headers })
      .map((res: Response) => res.json());
  }

  albumDetails(album_id, userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/photo/album/details?userid=' + userid + '&album_id=' + album_id)
      .map((res: Response) => res.json());
  }
  albumPhotos(id, limit, offset, userid) {
    return this.http.get(this.serverURL + '/api/' + this.KEY + '/photo/album/get/photos?userid=' + userid + '&id=' + id + "&limit=" + limit + "&offset=" + offset)
      .map((res: Response) => res.json());
  }

  deleteAlbum(id, userid) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('id', id);
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()
    return this.http.post(this.serverURL + '/api/' + this.KEY + '/photo/album/delete', body, { headers: headers })
      .map((res: Response) => res.json());
  }
}
