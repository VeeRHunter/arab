import { SignupPage } from './../signup/signup';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams  , MenuController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the TermsAndConditionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-terms-and-conditions',
  templateUrl: 'terms-and-conditions.html',
})
export class TermsAndConditionsPage {

  constructor(
              public navCtrl: NavController,
              public navParams: NavParams,
              public menu :MenuController
            ) {
              this.menu.enable(false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsAndConditionsPage');
  }
  agreeTerms() {
    this.navCtrl.push(TabsPage)
  }
  back() {
    this.navCtrl.push(SignupPage);
  }
}
