import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AbstractPage } from "../../app/page.abstract";
import { BannerDao } from "../../providers/banner.dao";
import { HarbalDao } from "../../providers/harbal.dao";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage extends AbstractPage {
    banners = [];
    constructor(public navCtrl: NavController, public bannerDao: BannerDao, public harbalDao: HarbalDao) {
        super();
    }

    ionViewDidLoad() {
        this.bannerDao.list({ "status": "A", "markcode": "index", "orderby": "seq" })
            .then((data) => {
                this.banners = data;
            });
        this.harbalDao.sync({},false);
    }
    gotoNameChecking() {
        this.navCtrl.push("HerbalFindPage");
    }

}
