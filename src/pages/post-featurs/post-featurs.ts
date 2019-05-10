import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Platform, ActionSheetController, ToastController, Loading } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { TranslateService } from '@ngx-translate/core';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { FilePath } from '@ionic-native/file-path';
import * as $ from "jquery"

const Tagedusers = []
declare var cordova: any;

@Component({
  selector: 'page-post-featurs',
  templateUrl: 'post-featurs.html',
})
export class PostFeatursPage {
  post = {
    'text': "",
    'feeling': ''
  }
  bgshow = true
  tagedUsers
  searchedUsers = []
  chosenUsers
  listeningShow = true
  userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
  userAvatar = localStorage.getItem('userAvatar').slice(8, -1);
  users
  type
  typeId
  callback
  to_user_id
  imagePath
  lastImage: string = null;
  loading: Loading;
  constructor(public toast: ToastController, public actionSheetCtrl: ActionSheetController, public platform: Platform, private filePath: FilePath, private transfer: FileTransfer, private file: File, public camera: Camera, public translate: TranslateService, public navCtrl: NavController, public navParams: NavParams, public alert: AlertController, public loadingCtrl: LoadingController, public remoteService: RemoteServiceProvider) {
    this.type = navParams.get('type');
    this.typeId = navParams.get('type_id');
    this.to_user_id = navParams.get('to_user_id');
    console.log(this.type, this.typeId);
  }

  ionViewWillEnter() {
    this.callback = this.navParams.get("callback")
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

  check(text) {
    if (text.length == 0 && !$('.feeling-div').attr('id'))
      return true;
    else if (this.post.feeling == "" && $('.feeling-div').attr('id'))
      return true;
    else
      return null;
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

  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      // title: 'Select Image Source',
      buttons: [
        {
          text: 'Library',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Camera',
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
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
            this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

          });
      } else {
        var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
        var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
        this.copyFileToLocalDir(correctPath, currentName, this.createFileName());

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

  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
      this.lastImage = newFileName;
      // this.navCtrl.push(UploadImagePage, {
      //   type: type,
      //   image: this.lastImage
      // })
    }, error => {
      this.presentToast('Error while storing file.');
    });
  }

  public pathForImage(img) {
    if (img === null) {
      return '';
    } else {
      return cordova.file.dataDirectory + img;
    }
  }

  public uploadImage() {
    let uploading, message;
    this.translate.get('uploading').subscribe(value => { uploading = value; })
    this.translate.get('successfully-uploaded').subscribe(value => { message = value; })
    var filename = this.lastImage;
    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);
    // Destination URL
    var url, options;
    url = "http://192.168.1.252/arabface/api/14789632/photo/album/upload";
    options = {
      fileKey: "image1",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: {
        'image1': filename
      }
    };

    const fileTransfer: FileTransferObject = this.transfer.create();
    this.loading = this.loadingCtrl.create({
      content: uploading,
    });
    this.loading.present();
    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options, true).then(data => {
      this.loading.dismissAll()
      let response = JSON.parse(data.response);

      if (response['status'] == 0) {
        this.presentToast('Error while uploading file.');
      }
      else {
        this.presentToast(message);
      }
    }, err => {
      this.loading.dismissAll()
      this.presentToast('Error while uploading file.');
    });

    this.navCtrl.pop();
  }

  postFeed(userID = this.userId, postText = this.post) {

    let privacy = $('.privacy').attr('id')
    let id = $('.postBody').attr('id')

    let loading = this.loadingCtrl.create({
      content: "Posting",
    });
    loading.present()
    //(userID,post,feeling='none',postType='text',privacy='1',background='default',tag :any='no', type, type_id, to_user_id="")
    if ($('.feeling-div').attr('id') && this.post.text == "") {
      let selectedFeeling = $('.feeling-div').attr('id')

      this.remoteService.feedPosting(userID, postText.feeling, selectedFeeling, 'feeling', privacy, id, 'no', this.type, this.typeId, this.to_user_id).subscribe(res => {
        // this.feeds.unshift(res.feed)
        this.post.text = ""
        //this.getFeedsList(this.userId);
        loading.dismiss();
        res.feed.hidden = false;
        this.callback(res.feed).then(() => {
          this.navCtrl.pop();
        });
      });

    } else if ($('.feeling-div').attr('id') && this.post.text != "") {
      let selectedFeeling = $('.feeling-div').attr('id')
      // $('.dropdown-feeling').toggleClass('open');
      this.remoteService.feedPosting(userID, postText, selectedFeeling, 'feeling&text', privacy, id, 'no', this.type, this.typeId, this.to_user_id).subscribe(res => {
        // this.feeds.unshift(res.feed)
        this.post.text = ""
        //this.getFeedsList(this.userId);
        res.feed.hidden = false;
        loading.dismiss();
        this.callback(res.feed).then(() => {
          this.navCtrl.pop();
        });
      });


    } else if (Tagedusers.length > 0) {
      this.remoteService.feedPosting(userID, postText.text, 'none', 'text', privacy, id, Tagedusers, this.type, this.typeId, this.to_user_id).subscribe(res => {

        // this.feeds.unshift(res.feed)
        this.post.text = ""
        //this.getFeedsList(this.userId);
        if (res.status == 1) Tagedusers.splice(0, Tagedusers.length)


        console.log(Tagedusers)
        loading.dismiss();
        res.feed.hidden = false;
        this.callback(res.feed).then(() => {
          this.navCtrl.pop();
        });
      });

    }
    else {
      console.log(userID, postText.text, 'none', 'text', privacy, id, 'no', this.type, this.typeId);
      this.remoteService.feedPosting(userID, postText.text, 'none', 'text', privacy, id, 'no', this.type, this.typeId, this.to_user_id).subscribe(res => {

        this.post.text = ""
        //this.getFeedsList(this.userId);
        console.log(res);
        loading.dismiss();
        res.feed.hidden = false;
        this.callback(res.feed).then(() => {
          this.navCtrl.pop();
        });
      });
    }
    // if(this.imagePath){
    //   this.imageUploading.uploadImage('feed', this.userId, id)
    // }

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
  ionViewDidLoad() {
    console.log('ionViewDidLoad PostFeatursPage');
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
    $('.dropdown-feeling').toggleClass('open');
  }

  tagUsersDivShow() {
    $('.tag-div').toggle();

  }

  getFriendsListToTag(term) {
    if (term != "") {
      this.remoteService.friendsListApiCall(this.userId, this.userId, term).subscribe(res => {
        this.searchedUsers = [];
        for (let i = 0; i < res.length; ++i) {
          console.log(Tagedusers.indexOf(res[i].id));
          if (Tagedusers.indexOf(res[i].id) == -1) {
            this.searchedUsers.push(res[i]);
          }
        }
        document.getElementById("myDropdown").classList.toggle("show");
        console.log(res);
      });
    }
  }
  selectUserToTag(userName, userID, userImage, index, searchedUsers) {
    this.tagedUsers = ''
    $(document).one('click', '.dropdown-content a', function(e) {
      e.preventDefault();
      // let userName = $(this).find('a').text()
      // let userID = $(this).find('p').text()
      // let userImage = $(this).find('img').attr('src')
      searchedUsers.splice(index, 1);
      console.log(userName, userID, userImage);
      Tagedusers.push(userID)
      $('.selectedUsersInTag').find("ul[class='chosenElments']").append('<li class="btn btn-theme btn-xs created-tag" style="margin:3px;">' + userName + '<p hidden>' + userID + '</p> <i class="fa fa-close"></i></li>')
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    })
    $(document).on('click', '.created-tag>i', function() {
      let userid = $(this).parent().find('p').text()
      let index = Tagedusers.findIndex(item => item.id == userid)

      searchedUsers.splice(index, 0, {
        name: userName,
        id: userID,
        avatar: userImage
      });
      Tagedusers.splice(index, 1);
      $(this).parent().remove()

      console.log(index)
    })
    console.log(Tagedusers)

  }
  back() {
    this.navCtrl.pop()
  }
}
