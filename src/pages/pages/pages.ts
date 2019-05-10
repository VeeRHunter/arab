import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { RemoteServiceProvider } from './../../providers/remote-service/remote-service';
import { Page } from '../page/page';
import { CreatePagePage } from '../create-page/create-page'

/**
 * Generated class for the PagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-pages',
  templateUrl: 'pages.html',
})
export class PagesPage {
  pages: any
  categories
  userId: any;
  search
  category
  type
  page: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public remoteService: RemoteServiceProvider) {
    this.userId = localStorage.getItem('userDataID').replace(/[^0-9]/g, "");
    this.category = 'all';
    this.type = "all";
    this.page = 1;
    this.getPages(this.type, "", this.category, this.userId, 1);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PagesPage');

  }

  getPages(type, term, categoryId, Id, page) {
    let loading = this.loadingCtrl.create({
      content: "Loading",
    });

    $('#noPages1').hide();
    $('#noPages2').hide();
    $('#active1, #active2').click(function() {
      if (this.id == 'active1') {
        type = "all";
      } else {
        type = "mine";
      }
    });
    this.type = type;
    this.category = categoryId;
    console.log(page);
    if (page > 1) {

      this.remoteService.getPages(type, term, categoryId, Id, page, 4).subscribe(res => {
        if (res.pages.length == 0) {
          // if(type == "all" || type == "search")
          $('#all').hide();
          // else
          $('#my').hide();
        }
        for (let x of res.pages) {
          this.pages.push(x);
        }
        console.log(res);
      });
      this.page = page;
    } else {
      this.page = page;
      loading.present()
      this.remoteService.getPages(type, term, categoryId, Id, page, 4).subscribe(res => {
        if (res.pages.length > 0) {
          // if(type == "all" || type == "search")
          $('#all').show();
          // else
          $('#my').show();
        } else {
          $('#noPages1').show();
          $('#noPages2').show();
          $('#my').hide();
          $('#all').hide();
        }
        loading.dismiss();
        console.log(type);
        console.log(term);
        console.log(categoryId);
        this.pages = res.pages;
        this.categories = res.categories;
        console.log(res);
      });
      this.search = term;
    }
  }

  likePage(userId, pageId, type, index) {
    this.remoteService.likePage(userId, pageId, type).subscribe(res => {
      if (type == "like") {
        this.pages[index].has_like = true;
      } else {
        this.pages[index].has_like = false;
      }

    });

    // var like = "#like"+pageId;
    // var dislike = "#dislike"+pageId;
    //
    // if(type == "like"){
    //   $(like).html("<i class=\"fa fa-thumbs-o-up\"></i> Liked");
    //
    // }else{
    //   $(dislike).html("<i class=\"fa fa-thumbs-o-up\"></i> Like");
    //
    // }
  }

  pagePage(page) {
    //console.log(page);
    this.navCtrl.push(Page, {
      page: page,
    });
  }

  newPage() {
    this.navCtrl.push(CreatePagePage);
  }

  back() {
    this.navCtrl.pop();
  }

}
