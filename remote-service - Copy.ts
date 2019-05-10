import { Injectable } from '@angular/core';
import {Http ,Response ,Headers,URLSearchParams  } from '@angular/http';
import { IonicPage, NavController, NavParams ,Platform } from 'ionic-angular';
import xml2js from 'xml2js';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import {AlertController,LoadingController} from 'ionic-angular'
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import * as $ from 'jquery'
declare var firebase ;
let alert1,downloadURL,avatar,name ; let signupres ; let signupresult ;
let userID = '25'   ; let cids ; let result = [] ; let friends ; let result5 = []; let msgs ; let chatid = [] ; let insideget ;
let friends2 ;let addchat ;  let getremote  ; let remoteid ; let result34 ; let apichat ; let firebasemsgs ; let apimsgs ;
let config = {
    apiKey: "AIzaSyBvXvFFmIM--9WbD07aemNah3ONCY22Ml4",
    authDomain: "aracall-3cda0.firebaseapp.com",
    databaseURL: "https://aracall-3cda0.firebaseio.com",
    projectId: "aracall-3cda0",
    storageBucket: "aracall-3cda0.appspot.com",
    messagingSenderId: "712599379890"
  };
  let user ;
/*
  Generated class for the RemoteServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

let apiURL = 'http://192.168.1.252/arabface/api/14789632/';

@Injectable()
export class RemoteServiceProvider {
 public Id :number;
 deviceLanguage
 response ; 
 serverURL ="http://192.168.1.252"
 KEY = '14789632'


 public xmlLang :any;
  constructor(public loadingctr : LoadingController,public alertctrl:AlertController,public http: Http, public platform :Platform) {

    this.init() ;
    //getremote = this.remoteid
    firebase.initializeApp(config)
    alert1 = this.alertctrl ;
  }
  login = (data) => {
    let loader = this.loadingctr.create({

     showBackdrop : false
   });
   loader.present();
   const url = this.serverURL+'/arabface/api/'+this.KEY+'/login?' + 'username=' + data.username + '&password=' + data.password;
    console.log(url)

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
   this.http.post(url,headers).subscribe(data3 => {
     this.response = data3.text() ;

     this.response = JSON.parse(this.response) ;


     if(this.response.status == 1) {
      localStorage.setItem('userid' , this.response.id)

     avatar = this.response.avatar ;
     name = this.response.name ;
     userID = this.response.id ;
       firebase.auth().signInWithEmailAndPassword(data.username, data.password).then(() => {

         loader.dismiss();

       }).catch(function(error) {
        loader.dismiss();
        
 // Handle Errors here.
 var errorCode = error.code;



   if(errorCode == "auth/user-not-found"){


var storageRef = firebase.storage().ref();

// Create a reference to 'mountains.jpg'



var getFileBlob = function(url, cb) {
       var xhr = new XMLHttpRequest();
       xhr.open("GET", url);
       xhr.responseType = "blob";
       xhr.addEventListener('load', function() {
           cb(xhr.response);
       });
       xhr.send();
   };

   var blobToFile = function(blob, name) {
       blob.lastModifiedDate = new Date();
       blob.name = name;
       return blob;
   };

   var getFileObject = function(filePathOrUrl, cb) {
       getFileBlob(filePathOrUrl, function(blob) {
           cb(blobToFile(blob, 'test.jpg'));
       });
   };

   getFileObject(avatar, function(fileObject) {
       var uploadTask = storageRef.child('images/test.jpg').put(fileObject);

       uploadTask.on('state_changed', function(snapshot) {

       }, function(error) {

       }, function() {
           downloadURL = uploadTask.snapshot.downloadURL;


   firebase.auth().createUserWithEmailAndPassword(data.username, data.password).then (() => {
loader.dismiss();
      var user = firebase.auth().currentUser;
      user.updateProfile({

 displayName: name,
 photoURL:downloadURL ,
}).then(function() {

}).catch(function(error) {
 // An error happened.
});
   }).catch(function(error) {
 // Handle Errors here.
 var errorCode = error.code;
 var errorMessage = error.message;
 let alert = alert1.create({
     title: 'Error',
     subTitle: errorMessage,
     buttons: ['OK']
   });
   alert.present();
});




       });
   });


firebase.database().ref(userID + '/chats').set({ 0: "undefined" }) ;
firebase.database().ref(userID + '/incoming').set({ 0: "undefined" }) ;

 }

});
     }else {
       loader.dismiss();
        let alert = alert1.create({
     title: 'Error',
     subTitle: 'User Not Found',
     buttons: ['OK']
   });
   alert.present();
     }
   })


 }


 set_userid (id) {
  userID = id.toString() ;
  console.log('userid is set to' + userID)
}

 creat1 (email,password,name,data) {
let loader = this.loadingctr.create({

     showBackdrop : false
   });
   loader.present();
  let body = new URLSearchParams();
body.append('firstname', data.firstname);
body.append('lastname', data.lastname);
body.append('username', name);
body.append('email_address', data.email_address);
body.append('password', password);
let body1 = body.toString () ;



let url = this.serverURL+'/arabface/api/'+this.KEY+'/signup?' + 'firstname=' + data.firstname + '&lastname=' + data.lastname + '&username=' + name + '&email_address=' + data.email_address + '&password='+password ;
let url2 = this.serverURL+'/arabface/api/'+this.KEY+'/signup' ; 


let headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded');
this.http.post (url2,body1,{headers: headers}).subscribe(data => {

let data1 = data.text() ;
data = JSON.parse(data1) ;
signupresult = data ;
localStorage.setItem('userid' , signupresult.userid)

if (data.status == 1) {

done () ;

}
});
function done () {

firebase.auth().createUserWithEmailAndPassword(data.email_address, password).then (() => {
loader.dismiss()
      user = firebase.auth().currentUser;
      user.updateProfile({
 displayName: data.username
}).then(function() {




}).catch(function(error) {
 // An error happened.
});
   }).catch(function(error) {
 // Handle Errors here.
 var errorCode = error.code;
 var errorMessage = error.message;
 let alert = alert1.create({
     title: 'Error',
     subTitle: errorMessage,
     buttons: ['OK']
   });
   alert.present();
});


}

 }

 _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;


   }
   public creat2 (email,password,name,photo,firstname,lastname) {
      let url = this.serverURL+'/arabface/api/'+this.KEY+'/signup?' + 'firstname=' + firstname + 'lastname=' + lastname + 'username=' + name + 'email_address=' + email + 'password='+password ;

var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
this.http.post (url,headers).subscribe(data => {

 signupres = data ;
 userID = signupres.id;
});
var storageRef = firebase.storage().ref();

// Create a reference to 'mountains.jpg'



var getFileBlob = function(url, cb) {
       var xhr = new XMLHttpRequest();
       xhr.open("GET", url);
       xhr.responseType = "blob";
       xhr.addEventListener('load', function() {
           cb(xhr.response);
       });
       xhr.send();
   };

   var blobToFile = function(blob, name) {
       blob.lastModifiedDate = new Date();
       blob.name = name;
       return blob;
   };

   var getFileObject = function(filePathOrUrl, cb) {
       getFileBlob(filePathOrUrl, function(blob) {
           cb(blobToFile(blob, 'test.jpg'));
       });
   };

   getFileObject(photo, function(fileObject) {
       var uploadTask = storageRef.child('images/test.jpg').put(fileObject);

       uploadTask.on('state_changed', function(snapshot) {

       }, function(error) {

       }, function() {
           var downloadURL = uploadTask.snapshot.downloadURL;

           // handle image here
       });
   });


   firebase.auth().createUserWithEmailAndPassword(email, password).then (() => {

      user = firebase.auth().currentUser;
      user.updateProfile({
 displayName: name,
 photoURL:photo ,
}).then(function() {

firebase.database().ref(userID + '/chats').set({ 0: "undefined" }) ;
firebase.database().ref(userID + '/incoming').set({ 0: "undefined" }) ;


}).catch(function(error) {
 // An error happened.
});
   }).catch(function(error) {
 // Handle Errors here.
 var errorCode = error.code;
 var errorMessage = error.message;
 let alert = alert1.create({
     title: 'Error',
     subTitle: errorMessage,
     buttons: ['OK']
   });
   alert.present();
});

 }
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
//    observer.next("logged")
//    observer.next({name:displayName})
//  } else {
//
//   observer.next("not here")
//  }
// });

}) ;

 init() {



 }



  ///////// Login function Start ////////
  /* Function for handling user login in by   */
  loginPostData(sentData,type)
  {

    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('username', sentData.username);
      urlSearchParams.append('password', sentData.password);
      let body = urlSearchParams.toString()
      this.http.post(apiURL+type, body, {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });
  }

    ///////// Login function End ////////

    ///////// Signup function Start ////////

  signupPostData(sentData,type){
    return new Promise((resolve, reject) =>{
      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('firstname', sentData.firstname);
      urlSearchParams.append('lastname', sentData.lastname);
      urlSearchParams.append('username', sentData.firstname+sentData.lastname);
      urlSearchParams.append('email_address', sentData.email_address);
      urlSearchParams.append('password', sentData.password);

      let body = urlSearchParams.toString()
      this.http.post(apiURL+type, body, {headers: headers}).
      subscribe(res =>{
        resolve(res.json());
      }, (err) =>{
        reject(err);
      });

    });
  }
    ///////// Signup function End ////////

  getPhotos()
   {

          return  this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/page/browse')

          .do((res : Response ) => console.log(res.json()))
          .map((res : Response ) => res.json());

   }



    ///////// Friends function Start ////////
   friendsListApiCall(the_userid, id, term)
   {

    return  this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/friends?userid='+id + "&the_userid=" + the_userid + "&term=" + term)

    //.do((res : Response ) => console.log(res.json()))
    .map((res : Response ) => res.json());
   }
   ///////// Friends function End ////////

   followers(userid)
   {
    return  this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/profile/getfollowers?userid='+userid)

    //.do((res : Response ) => console.log(res.json()))
    .map((res : Response ) => res.json());
   }
   following(userid)
   {
    return  this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/profile/getfollowing?userid='+userid)

    //.do((res : Response ) => console.log(res.json()))
    .map((res : Response ) => res.json());
   }

    ///////// Friends Request function Start ////////
    friendsRequestListApiCall(id)
    {

     return  this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/friend/requests?userid='+id)

     //.do((res : Response ) => console.log(res.json()))
     .map((res : Response ) => res.json());
    }
    ///////// Friends Request function End ////////



    ///////// Friends Request function Start ////////
    friendsSuggestionListApiCall(id)
    {

     return  this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/friend/suggestions?limit=15&userid='+id)

     //.do((res : Response ) => console.log(res.json()))
     .map((res : Response ) => res.json());
    }
    ///////// Friends Request function End ////////

   ////////// Feeds function Start ///////////

   feedsListApiCall(id)
   {
      let numberOfPosts=30
      let offset = 0
    let url = this.serverURL+'/arabface/api/'+this.KEY+'/feeds?offset='+offset+'&limit='+numberOfPosts+'&userid='+id;

     return  this.http.get(url).map((res : Response ) => res.json());

   }
   ////////// Feeds function End             ///////////

   savedFeeds(id){
     let url = "http://192.168.1.252/arabface/api/14789632/feeds?type=saved&userid="+id;
     console.log(url);
     return  this.http.get(url)
     //do((res : Response ) => console.log(res.json()))
     .map((res : Response ) => res.json());
   }

   //////////  profile Api function start   ///////////

   profileDetailsApiCall(theUserId, id)
   {
     let url = this.serverURL+'/arabface/api/'+this.KEY+'/profile/details?userid='+id + '&the_userid=' + theUserId;

     return  this.http.get(url)
     //.do((res : Response ) => console.log(res.json()))
     .map((res : Response ) => res.json());

   }

    //////////  profile api  function End ///////////////
    profilePosts(id)
   {
    return  this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/feeds?type=timeline&limit=1200&type_id='+id)

    .map((res : Response ) => res.json());
   }

    //////////  messages api  function End ///////////////

    messagesApiCall(id)
    {
      let url = this.serverURL+'/arabface/api/'+this.KEY+'/chat/conversations?userid='+id;

     return  this.http.get(url)
     //.do((res : Response ) => console.log(res.json()))
     .map((res : Response ) => res.json());

    }

    //////////  messages api  function End ///////////////



   ////////// likes Api call function start  ////////////


   likeFeedApiCall(UserID,FeedID):any
  {

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('userid', UserID );
      urlSearchParams.append('type', "feed");
      urlSearchParams.append('type_id',FeedID );


      let body = urlSearchParams.toString()
     return this.http.post(this.serverURL+'/arabface/api/'+this.KEY+'/like/item', body, {headers: headers})

      //do((res : Response ) => console.log(res.json()))
     .map((res : Response ) => res.json());



  }

  ///////////// likes Api call function End  ////////////////////
  likeCommentApiCall(UserID,commentId):any
  {

      let headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      let urlSearchParams = new URLSearchParams();
      urlSearchParams.append('userid', UserID );
      urlSearchParams.append('type', "comment");
      urlSearchParams.append('type_id',commentId );


      let body = urlSearchParams.toString()
     return this.http.post(this.serverURL+'/arabface/api/'+this.KEY+'/like/item', body, {headers: headers})

      //do((res : Response ) => console.log(res.json()))
     .map((res : Response ) => res.json());



  }

  ///////////// chat messages Api call function start  ////////////////////

    usersCoversation(cID,userID):any
    {
      return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/chat/get/messages?cid='+cID+"&userid="+userID).

      do((res : Response ) => console.log(res.json()))
     .map((res : Response ) => res.json());
    }


   ///////////// chat messages Api call function end  ////////////////////

  sharePost(feedID,userID):any
  {
    console.log(feedID +userID)
    return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/feed/action?action=share&feed_id='+feedID+"&userid="+userID)

   .map((res : Response ) => res.json());
  }


 ///////////// chat messages Api call function end  ////////////////////


  ///////////  Send Messages between users start  ////////////


   ChatMessagesSend(cID,userID,msg):any
   {
    return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/chat/send/message?text='+msg+"&cid="+cID+"&userid="+userID).

    do((res : Response ) => console.log(res.json()))
   .map((res : Response ) => res.json());
   }

  ///////////  Send Messages between users End  ////////////

   ///////////// user photos Api call function start  ////////////////////

   userPhotosAlbumOnProfile(userID : number) :any
   {
     return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/profile/photos?the_userid='+userID).

     do((res : Response ) => console.log(res.json()))
    .map((res : Response ) => res.json());
   }


  ///////////// user photos Api call function end  ////////////////////



   ///////////// user profile page changing Api call function start  ////////////////////

   changeProfilePicture(userid , avatar)
   {
    let headers = new Headers();
    headers.append('Content-Type', 'multipart/form-data');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('avatar', avatar);
    urlSearchParams.append('userid', userid);
    let body = urlSearchParams.toString()
     return this.http.post(this.serverURL+'/arabface/api/'+this.KEY+'/profile/change/avatar', body, {headers: headers})

    //  do((res : Response ) => console.log(res.json()))
    .map((res : Response ) => res.json());
   }


  /////////////user profile page changing Api call function end  ////////////////////


  //////////// post in feed ///////////////////////

  feedPosting(userID,post,background='default')
  {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userid', userID );
    urlSearchParams.append('entity_id', userID );
    urlSearchParams.append('text', post);
    urlSearchParams.append('type', "feed" );
    urlSearchParams.append('background', background );
    urlSearchParams.append('entity_type', "user" );
    let body = urlSearchParams.toString()

   return this.http.post(this.serverURL+'/arabface/api/'+this.KEY+'/feed/add', body, {headers: headers})

    //do((res : Response ) => console.log(res.json()))
   .map((res : Response ) => res.json());
  }
  locationPosting(userID,location)
  {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userid', userID );
    urlSearchParams.append('entity_id', userID );
    urlSearchParams.append('type', "feed" );
    urlSearchParams.append('entity_type', "user" );
    urlSearchParams.append('feeling_type', "listening-to" );
    urlSearchParams.append('location', location );
    
    let body = urlSearchParams.toString()

   return this.http.post(this.serverURL+'/arabface/api/'+this.KEY+'/feed/add', body, {headers: headers})
    //do((res : Response ) => console.log(res.json()))
   .map((res : Response ) => res.json());
  }
  backgroundPosting(userID,location)
  {

    let headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('userid', userID );
    urlSearchParams.append('entity_id', userID );
    urlSearchParams.append('type', "feed" );
    urlSearchParams.append('entity_type', "user" );
    urlSearchParams.append('background', "listening-to" );
    
    let body = urlSearchParams.toString()

   return this.http.post(this.serverURL+'/arabface/api/'+this.KEY+'/feed/add', body, {headers: headers})
    //do((res : Response ) => console.log(res.json()))
   .map((res : Response ) => res.json());
  }
  ////////////////////////////////////////////////
  commentOnFeeds(postOwner,postID,whoCommented,comment)
  {
    return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/comment/add?userid='+whoCommented+"&entity_id="+postOwner+"&entity_type=user&text="+comment+"&type=feed&type_id="+postID)

    //do((res : Response ) => console.log(res.json()))
      .map((res : Response ) => res.json());
  }

    //////////// post in feed ///////////////////////
    ReplyOnComment(postOwner,commentID,whoCommented,reply)
    {
      return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/comment/add?userid='+whoCommented+"&entity_id="+postOwner+"&entity_type=user&text="+reply+"&type=comment&type_id="+commentID)

      //do((res : Response ) => console.log(res.json()))
        .map((res : Response ) => res.json());
    }

    ////////////////////////////////////////////////

    getUserData(attr, userid){
      return this.http.get("http://192.168.1.252/arabface/api/14789632/get/user/data?userid=" + userid + "&attr=" + attr)
      //do((res : Response ) => console.log(res.json()))
        .map((res : Response ) => res.json());
    }
  ////////////////////////////////////////////////


  //////////// post in feed ///////////////////////
  profilePost(userID,post)
  {

    console.log(userID,post)
    let url = this.serverURL+'/arabface/api/'+this.KEY+'/feed/add?type=feed&entity_type=user&text='+post+"&entity_id="+userID ;
console.log(url)
   return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/feed/add?type=feed&entity_type=user&text=ppppp&entity_id=25')

  .map((res : Response ) => res.json());
  }

  ////////////////////////////////////////////////

  ////////////// get notifications /////////////////
  getNotifications(userid)
  {
    return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/notifications?limit=13&userid='+userid)

    //do((res : Response ) => console.log(res.json()))
      .map((res : Response ) => res.json());
  }

  //////////////////////////////////////////////


  searchUsers(term){
    return this.http.get("http://192.168.1.252/arabface/api/14789632/search/users?term=" + term)
      .map((res : Response ) => res.json());
  }

  //////////////////// load comments ////////////////////

  loadComments(feedid)
  {
    return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/comment/load?type=feed&limit=10&type_id='+feedid)

    //do((res : Response ) => console.log(res.json()))
      .map((res : Response ) => res.json());
  }

  loadReplies(commentID)
  {
    return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/comment/load?type=comment&limit=10&type_id='+commentID)

    //do((res : Response ) => console.log(res.json()))
      .map((res : Response ) => res.json());
  }



  loadProfileComments(feedid)
  {
    return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/comment/load?type=feed&limit=5&type_id='+feedid)

    //do((res : Response ) => console.log(res.json()))
      .map((res : Response ) => res.json());
  }

  // feedposting (userID,post) :any {
  //     return new Promise ((resolve )=> {
  //       var settings = {
  //         "async": true,
  //         "crossDomain": true,
  //         "url": "http://192.168.1.252/arabface/api/14789632/feed/add?type=feed&entity_type=user&text="+post+"&entity_id="+userID,
  //         "method": "GET",
  //         "headers": {
  //           "x-devtools-emulate-network-conditions-client-id": "964b73d8-9467-4f26-bff0-ddb7029125a0",
  //           "accept-language": "en-US,en;q=0.8",
  //           "cache-control": "no-cache",
  //         }
  //       }

  //       $.ajax(settings).done(function (response) {
  //         console.log(response);
  //           resolve(response)

  //       });
  //     })
  // }



  /////////////////////////////////////////////////////


  feedsComment(postOwner,postID,whoCommented,comment)
  {
    return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/comment/add?userid='+whoCommented+"&entity_id="+postOwner+"&entity_type=user&text="+comment+"&type=feed&type_id="+postID)

    //do((res : Response ) => console.log(res.json()))
      .map((res : Response ) => res.json());
  }



   //////////////////// add friend ////////////////////

   addFriend(userid,friendID)
   {
     return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/friend/add?userid='+userid+"&to_userid="+friendID)

     //do((res : Response ) => console.log(res.json()))
       .map((res : Response ) => res.json());
   }



   /////////////////////////////////////////////////////
     //////////////////// load comments ////////////////////

     ConfirmFriendRequest(userid,friendID)
     {
       return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/friend/confirm?userid='+friendID+"&to_userid="+userid)
         .map((res : Response ) => res.json());
     }



     /////////////////////////////////////////////////////
       //////////////////// load comments ////////////////////

       deleteFriendRequest(userid,friendID)
       {
         return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/friend/remove?userid='+friendID+"&to_userid="+userid)

         //do((res : Response ) => console.log(res.json()))
           .map((res : Response ) => res.json());
       }



       /////////////////////////////////////////////////////
        onlineFriends(userid)
        {
           return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/friend/online?userid='+userid)
        //do((res : Response ) => console.log(res.json()))
          .map((res : Response ) => res.json());

        }

        saveItem(type, typeId, userid){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('type', type );
          urlSearchParams.append('type_id', typeId);
          urlSearchParams.append('userid', userid );
          let body = urlSearchParams.toString()

         return this.http.post("http://192.168.1.252/arabface/api/14789632/save/item", body, {headers: headers})
         .map((res : Response ) => res.json());
        }
        unsaveItem(type, typeId, userid){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('type', type );
          urlSearchParams.append('type_id', typeId);
          urlSearchParams.append('userid', userid );
          let body = urlSearchParams.toString()

         return this.http.post("http://192.168.1.252/arabface/api/14789632/unsave/item", body, {headers: headers})
         .map((res : Response ) => res.json());
        }
        isSaved(type, typeId, userid){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('type', type );
          urlSearchParams.append('type_id', typeId);
          urlSearchParams.append('userid', userid );
          let body = urlSearchParams.toString()

         return this.http.post("http://192.168.1.252/arabface/api/14789632/saved/item", body, {headers: headers})
         .map((res : Response ) => res.json());
        }

        /////////////// get  pages /////////////////////////
        getPages(type, term, categoryId, userId){
          return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/page/browse?type=' + type + "&term=" + term + "&category_id=" + categoryId + "&userid=" + userId)
          .map((res : Response ) => res.json());
        }


        getPagesCategories(){
          return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/page/get/categories')
          .map((res : Response ) => res.json());
        }

        /////////////// create  page /////////////////////////
        createPage(title, description, category, userId){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('userid', userId );
          urlSearchParams.append('title', title);
          urlSearchParams.append('description', description );
          urlSearchParams.append('category', category );
          let body = urlSearchParams.toString()

         return this.http.post(this.serverURL+'/arabface/api/'+this.KEY+'/page/create', body, {headers: headers})
          //do((res : Response ) => console.log(res.json()))
         .map((res : Response ) => res.json());
        }


        editPage(title, description, category, pageId){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('page_id', pageId );
          urlSearchParams.append('title', title);
          urlSearchParams.append('description', description );
          urlSearchParams.append('category', category );
          let body = urlSearchParams.toString()

         return this.http.post(this.serverURL+'/arabface/api/'+this.KEY+'/page/edit', body, {headers: headers})
          //do((res : Response ) => console.log(res.json()))
         .map((res : Response ) => res.json());
        }

        likePage(userId, pageId, type):any{
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('userid', userId );
          urlSearchParams.append('type', "page");
          urlSearchParams.append('type_id',pageId );
          let body = urlSearchParams.toString()
          if(type == "like")
         return this.http.post(this.serverURL+'/arabface/api/'+this.KEY+'/like/item', body, {headers: headers})
          //do((res : Response ) => console.log(res.json()))
         .map((res : Response ) => res.json());
         else
         return this.http.post(this.serverURL+'/arabface/api/'+this.KEY+'/dislike/item', body, {headers: headers})

          //do((res : Response ) => console.log(res.json()))
         .map((res : Response ) => res.json());
        }


        deletePage(pageId, userId){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('page_id', pageId );
          urlSearchParams.append('userid', userId );
          let body = urlSearchParams.toString()
         return this.http.post(this.serverURL+'/arabface/api/'+this.KEY+'/page/delete', body, {headers: headers})
          //do((res : Response ) => console.log(res.json()))
         .map((res : Response ) => res.json());
        }

        getPageRoles(id, userid){
          return this.http.get("http://192.168.1.252/arabface/api/14789632/page/get/roles?userid=" + userid + "&id=" + id)
          .map((res : Response ) => res.json());
        }
        savePageRoles(pageId, roles, userid){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          for (var key in roles) {
            urlSearchParams.append('roles[' + key + ']', roles[key] );
          }
          // urlSearchParams.append('roles', roles );
          urlSearchParams.append('page_id', pageId );
          urlSearchParams.append('userid', userid );
          let body = urlSearchParams.toString();
          console.log(urlSearchParams);
         return this.http.post("http://192.168.1.252/arabface/api/14789632/page/save/roles", body, {headers: headers})
         .map((res : Response ) => res.json());
        }

        removePageRole(user, page_id, userid){
          return this.http.get("http://192.168.1.252/arabface/api/14789632/page/remove/role?userid=" + userid + "&user=" + user + "&page_id=" + page_id)
          .map((res : Response ) => res.json());
        }


        getGroups(type, term, filter, userId){
            return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/group/browse?type=' + type + "&term=" + term + "&filter=" + filter + "&userid=" + userId)

            .map((res : Response ) => res.json());

        }


        createGroup(title, description, name, privacy, userId){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('userid', userId );
          urlSearchParams.append('title', title);
          urlSearchParams.append('description', description );
          urlSearchParams.append('name', name );
          urlSearchParams.append('privacy', privacy );
          let body = urlSearchParams.toString()

         return this.http.post(this.serverURL+'/arabface/api/'+this.KEY+'/group/create', body, {headers: headers})

          //do((res : Response ) => console.log(res.json()))
         .map((res : Response ) => res.json());
        }
        editGroup(title, description, privacy, groupId, canPost, canAddMember){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('group_id', groupId );
          urlSearchParams.append('title', title);
          urlSearchParams.append('description', description );
          urlSearchParams.append('name', title );
          urlSearchParams.append('privacy', privacy );
          urlSearchParams.append('who_can_post', canPost );
          urlSearchParams.append('who_can_add_member', canAddMember );
          let body = urlSearchParams.toString()

         return this.http.post(this.serverURL+'/arabface/api/'+this.KEY+'/group/edit', body, {headers: headers})

          //do((res : Response ) => console.log(res.json()))
         .map((res : Response ) => res.json());
        }

        deleteGroup(groupId){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('group_id', groupId );
          let body = urlSearchParams.toString()
         return this.http.post(this.serverURL+'/arabface/api/'+this.KEY+'/group/delete', body, {headers: headers})
          //do((res : Response ) => console.log(res.json()))
         .map((res : Response ) => res.json());
        }

        joinGroup(group_id, status, userid):any{
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('userid', userid );
          urlSearchParams.append('status', status);
          urlSearchParams.append('group_id', group_id );
          let body = urlSearchParams.toString()

         return this.http.post(this.serverURL+'/arabface/api/'+this.KEY+'/group/join', body, {headers: headers})
          //do((res : Response ) => console.log(res.json()))
         .map((res : Response ) => res.json());
        }


        groupFeeding(id){
          return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/feeds?type=group&type_id='  + id)
          .map((res : Response ) => res.json());
        }

        /////////////////// Events /////////////////////////

        getEvents(type, categoryId, term, userId){
          if(type == ""){
            return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/event/browse?userid=' + userId + "&term=" + term + "&category_id=" + categoryId)
            .map((res : Response ) => res.json());
          }
          return this.http.get("http://192.168.1.252/arabface/api/14789632/event/browse?userid=" + userId + "&term=" + term + "&category_id=" + categoryId + "&type=" + type)
          .map((res : Response ) => res.json());
        
      }
        getEventCategories(){
          return this.http.get("http://192.168.1.252/arabface/api/14789632/event/get/categories")
          .map((res : Response ) => res.json());
        }

        createEvent(title,description,category_id,location,address,start_day,start_month,start_year,start_hour,start_minute,start_time_type,privacy,end_day,end_month,end_year,end_hour,end_minute,end_time_type,userid){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('title', title );
          urlSearchParams.append('description', description);
          urlSearchParams.append('category_id', category_id );
          urlSearchParams.append('location', location );
          urlSearchParams.append('address', address);
          urlSearchParams.append('start_day', start_day );
          urlSearchParams.append('start_month', start_month );
          urlSearchParams.append('start_year', start_year);
          urlSearchParams.append('start_hour', start_hour );
          urlSearchParams.append('start_minute', start_minute );
          urlSearchParams.append('start_time_type', start_time_type);
          urlSearchParams.append('privacy', privacy );
          urlSearchParams.append('end_day', end_day );
          urlSearchParams.append('end_month', end_month );
          urlSearchParams.append('end_year', end_year);
          urlSearchParams.append('end_hour', end_hour );
          urlSearchParams.append('end_minute', end_minute );
          urlSearchParams.append('end_time_type', end_time_type);
          urlSearchParams.append('userid', userid);
          let body = urlSearchParams.toString()

         return this.http.post("http://192.168.1.252/arabface/api/14789632/event/create", body, {headers: headers})
         .map((res : Response ) => res.json());
        }
        editEvent(title,description,category_id,location,address,start_day,start_month,start_year,start_hour,start_minute,start_time_type,privacy,end_day,end_month,end_year,end_hour,end_minute,end_time_type,userid, eventId){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('title', title );
          urlSearchParams.append('description', description);
          urlSearchParams.append('category_id', category_id );
          urlSearchParams.append('location', location );
          urlSearchParams.append('address', address);
          urlSearchParams.append('start_day', start_day );
          urlSearchParams.append('start_month', start_month );
          urlSearchParams.append('start_year', start_year);
          urlSearchParams.append('start_hour', start_hour );
          urlSearchParams.append('start_minute', start_minute );
          urlSearchParams.append('start_time_type', start_time_type);
          urlSearchParams.append('privacy', privacy );
          urlSearchParams.append('end_day', end_day );
          urlSearchParams.append('end_month', end_month );
          urlSearchParams.append('end_year', end_year);
          urlSearchParams.append('end_hour', end_hour );
          urlSearchParams.append('end_minute', end_minute );
          urlSearchParams.append('end_time_type', end_time_type);
          urlSearchParams.append('userid', userid);
          urlSearchParams.append('event_id', eventId);
          let body = urlSearchParams.toString()

         return this.http.post("http://192.168.1.252/arabface/api/14789632/event/edit", body, {headers: headers})
         .map((res : Response ) => res.json());
        }

        deleteEvent(event_id, userid){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('event_id', event_id );
          urlSearchParams.append('userid', userid );
          let body = urlSearchParams.toString()
          return this.http.post("http://192.168.1.252/arabface/api/14789632/event/delete", body, {headers: headers})
          .map((res : Response ) => res.json());

        }
        rsvp(event_id, rsvp, userid){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('event_id', event_id );
          urlSearchParams.append('rsvp', rsvp );
          urlSearchParams.append('userid', userid );
          let body = urlSearchParams.toString()
          return this.http.post("http://192.168.1.252/arabface/api/14789632/event/rsvp", body, {headers: headers})
          .map((res : Response ) => res.json());
        }
        ////////////////////////////////////////////////////

        /////////////////// Videos ////////////////////////

        getVideos(categoryId, term, type, filter, userId){
          return this.http.get(this.serverURL+'/arabface/api/'+this.KEY+'/videos/browse?userid=' + userId + "&term=" + term + "&category_id=" + categoryId + "&type=" + type + "&filter=" + filter)
          .map((res : Response ) => res.json());
        }
        getVideoCategories(){
          return this.http.get("http://192.168.1.252/arabface/api/14789632/videos/get/categories")
          .map((res : Response ) => res.json());
        }
        addNewVideo(title, description, privacy, link, category, userid){
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
          return this.http.post("http://192.168.1.252/arabface/api/14789632/video/create", body, {headers: headers})
          .map((res : Response ) => res.json());
        }
        deleteVideo(video_id, userid){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('video_id', video_id);
          urlSearchParams.append('userid', userid);
          let body = urlSearchParams.toString()
          return this.http.post("http://192.168.1.252/arabface/api/14789632/video/delete", body, {headers: headers})
          .map((res : Response ) => res.json());
        }
        editVideo(title, desc, privacy, category_id, video_id, userid){
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
          return this.http.post("http://192.168.1.252/arabface/api/14789632/video/edit", body, {headers: headers})
          .map((res : Response ) => res.json());
        }

        ///////////////////////////////////////////////////


         //////////////////// Settings /////////////////////
        getSettingsNotifications(userid){
          return this.http.get("http://192.168.1.252/arabface/api/14789632/settings/get/notifications?userid=" + userid)
          .map((res : Response ) => res.json());
        }

        setSettingsNotifications(following_you, site_mention_you, site_tag_you, site_comment,site_reply_comment, site_like,site_share_item, userid){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('notify-following-you', following_you );
          urlSearchParams.append('notify-site-mention-you', site_mention_you );
          urlSearchParams.append('notify-site-tag-you', site_tag_you );
          urlSearchParams.append('notify-site-comment', site_comment );
          urlSearchParams.append('notify-site-reply-comment', site_reply_comment );
          urlSearchParams.append('notify-site-like', site_like );
          urlSearchParams.append('notify-site-share-item', site_share_item );
          urlSearchParams.append('userid', userid);
          let body = urlSearchParams.toString()
          return this.http.post("http://192.168.1.252/arabface/api/14789632/settings/notifications", body, {headers: headers})
          .map((res : Response ) => res.json());
        }
        changePassword(current_password, new_password, userid){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('current_password', current_password );
          urlSearchParams.append('new_password', new_password );
          urlSearchParams.append('userid', userid );
          let body = urlSearchParams.toString()
          return this.http.post("http://192.168.1.252/arabface/api/14789632/settings/password", body, {headers: headers})
          .map((res : Response ) => res.json());
        }
        settingsPrivacy(wcvp, wcpp, wcsb, wcsm, wcsv, en, userid){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('who-can-view-profile', wcvp );
          urlSearchParams.append('who-can-post-profile', wcpp );
          urlSearchParams.append('who-can-see-birth', wcsb );
          urlSearchParams.append('who-can-send-message', wcsm )
          urlSearchParams.append('who-can-see-visitors', wcsv );
          urlSearchParams.append('email-notification', en )
          urlSearchParams.append('userid', userid );
          let body = urlSearchParams.toString()
          return this.http.post("http://192.168.1.252/arabface/api/14789632/settings/privacy", body, {headers: headers})
          .map((res : Response ) => res.json());
        }
        settingsGeneral(first, last, email, username, gender, country, city, state, bio, userid){

          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('first_name', first );
          urlSearchParams.append('last_name', last );
          urlSearchParams.append('email_address', email);
          urlSearchParams.append('username', username );
          urlSearchParams.append('gender', gender );
          urlSearchParams.append('state', state );
          urlSearchParams.append('country', country );
          urlSearchParams.append('city', city);
          urlSearchParams.append('bio', bio );
          urlSearchParams.append('userid', userid );
          let body = urlSearchParams.toString()
          return this.http.post("http://192.168.1.252/arabface/api/14789632/settings/general", body, {headers: headers})
          .map((res : Response ) => res.json());
        }

        ////////////////// Contact Us /////////////////////////
        contactUs(name, email, subject, message, userid){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('name', name );
          urlSearchParams.append('email', email );
          urlSearchParams.append('subject', subject);
          urlSearchParams.append('message', message );
          urlSearchParams.append('userid', userid );
          let body = urlSearchParams.toString()
          return this.http.post("http://192.168.1.252/arabface/api/14789632/contact", body, {headers: headers})
          .map((res : Response ) => res.json());
        }
        /////////////////////////////////////////////////////

        ////////////////// Trending /////////////////////////
        getHashtag(userid){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('userid', userid);
          let body = urlSearchParams.toString()
          return this.http.post("http://192.168.1.252/arabface/api/14789632/hashtag/get", body, {headers: headers})
          .map((res : Response ) => res.json());
        }
        ////////////////////////////////////////////////////////

        ////////////////// Blocking ///////////////////////////
        blockUser(id, userid){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('id', id );
          urlSearchParams.append('userid', userid);
          let body = urlSearchParams.toString()
          return this.http.post("http://192.168.1.252/arabface/api/14789632/block/user", body, {headers: headers})
          .map((res : Response ) => res.json());
        }
        unblockUser(id, userid){
          let headers = new Headers();
          headers.append('Content-Type', 'application/x-www-form-urlencoded');
          let urlSearchParams = new URLSearchParams();
          urlSearchParams.append('id', id );
          urlSearchParams.append('userid', userid);
          let body = urlSearchParams.toString()
          return this.http.post("http://192.168.1.252/arabface/api/14789632/unblock/user", body, {headers: headers})
          .map((res : Response ) => res.json());
        }
        isBlocked(id, userid){
          return this.http.get("http://192.168.1.252/arabface/api/14789632/blocked?id=" + id + "&userid=" + userid)
          .map((res : Response ) => res.json());
        }
        getAllBlocked(userid){
          return this.http.get("http://192.168.1.252/arabface/api/14789632/all/blocked?userid=" + userid)
          .map((res : Response ) => res.json());
        }
        ////////////////////////////////////////////////////
}
