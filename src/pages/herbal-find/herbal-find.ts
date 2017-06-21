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
        //alert(ev.target.value);
    }
    onCancel() {

    }
    update() {
        var keyword = this.keyword;
        this.harbalDao.list({ "keyword": this.keyword }).then((data) => {

            data = this.sortByKeyword(keyword, data);

            this.items = data;
        });
    }
    sortByKeyword(keyword, data) {

        var keywords = keyword.split(" ");
        var newdata = new Array();
        var otherdata = new Array();
        for (let item of data) {
            var targetName = false;
            for (let key of keywords) {

                if (item.name.indexOf(key) > -1 || item.alias_name.indexOf(key) > -1) {
                    targetName = true;
                }

                item.title = item.name;
                item.name=item.name.replace(key, "<span class='keyword'>" + key + "</span>");
                item.alias_name ="又名"+item.alias_name.replace(key, "<span class='keyword'>" + key + "</span>");

                item.description_count = item.description.split(key).length - 1;
                item.description = item.description.replace(key, "<span class='keyword'>" + key + "</span>");

                item.used_part_count = item.used_part.split(key).length - 1;
                item.used_part ="入药部位"+item.used_part.replace(key, "<span class='keyword'>" + key + "</span>");

                item.taste_count = item.taste.split(key).length - 1;
                item.taste ="性味"+item.taste.replace(key, "<span class='keyword'>" + key + "</span>");

                item.belong_count = item.belong.split(key).length - 1;
                item.belong ="归经"+item.belong.replace(key, "<span class='keyword'>" + key + "</span>");

                item.effect_count = item.effect.split(key).length - 1;
                item.effect ="功效"+item.effect.replace(key, "<span class='keyword'>" + key + "</span>");

                item.functions_count = item.functions.split(key).length - 1;
                item.functions ="主治"+item.functions.replace(key, "<span class='keyword'>" + key + "</span>");

                item.compatibility_count = item.compatibility.split(key).length - 1;
                item.compatibility ="相关配伍"+item.compatibility.replace(key, "<span class='keyword'>" + key + "</span>");

                
            }
            if (targetName) {
                newdata.push(item);
            } else {
                otherdata.push(item);
            }
        }
        data = newdata.concat(otherdata);

        return data;
    }
    openHarbal(item) {
        this.navCtrl.push("HarbalPage", item);
    }
}
