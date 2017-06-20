import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the HerbalFindPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-herbal-find',
  templateUrl: 'herbal-find.html',
})
export class HerbalFindPage {
    items = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HerbalFindPage');
  }
  onInput(ev:any) {
      //if(ev.target.value!=)
      alert(ev.target.value);
  }
  onCancel() {

  }
}
