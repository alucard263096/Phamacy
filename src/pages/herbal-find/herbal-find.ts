import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HarbalDao } from "../../providers/harbal.dao";
import { AbstractPage } from "../../app/page.abstract";

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
export class HerbalFindPage extends AbstractPage {
    items = [];
    keyword: string = "";
    constructor(public navCtrl: NavController, public navParams: NavParams, public harbalDao: HarbalDao) {
        super();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HerbalFindPage');
    }
    onInput(ev: any) {
        //if(ev.target.value!=)
        alert(ev.target.value);
    }
    onCancel() {

    }
    update() {
        this.harbalDao.list({ "keyword": this.keyword }).then((data) => {
            this.items = data;
        });
    }
}
