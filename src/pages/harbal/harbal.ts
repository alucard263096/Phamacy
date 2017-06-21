import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AbstractPage } from "../../app/page.abstract";
import { HarbalDao } from "../../providers/harbal.dao";

/**
 * Generated class for the HarbalPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
    selector: 'page-harbal',
    templateUrl: 'harbal.html',
})
export class HarbalPage extends AbstractPage {
    info = { used_part: "", taste: "", belong: "", effect: "", functions: "", compatibility: ""};
    constructor(public navCtrl: NavController, public navParams: NavParams, public harbalDao: HarbalDao) {
        super();
        if (navParams.data.id != undefined) {

            this.info = navParams.data;

            this.info.used_part = this.info.used_part.substr(4).replace("\n", "<br />");
            this.info.taste = this.info.taste.substr(2).replace("\n", "<br />");
            this.info.belong = this.info.belong.substr(2).replace("\n", "<br />");
            this.info.effect = this.info.effect.substr(2).replace("\n", "<br />");
            this.info.functions = this.info.functions.substr(2).replace("\n", "<br />");
            this.info.compatibility = this.info.compatibility.substr(4).replace("\n", "<br />");
        }




    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad HarbalPage');
        if (this.navParams.data.id == undefined) {
            this.harbalDao.get(1).then((data) => {
                this.info = data;
                this.info["title"] = data.name;
            });
        }
    }
    

}