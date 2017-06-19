import { Injectable } from '@angular/core';
import { SQLite } from '@ionic-native/sqlite';
import { AbstractDao } from "./dao.abstract";
import { Http } from '@angular/http';
import { BannerApi } from "./banner.api";

@Injectable()
export class BannerDao extends AbstractDao {

    constructor(public http: Http, public sqlite: SQLite) {
        super(sqlite, http);
    }

	
				
		public tableName() {
			return "banner";
		}

		public tableColumns(): Array<string> {
        var columns = new Array();
			columns["markcode"] = "varchar";//识别标记
			columns["seq"] = "int";//序号
			columns["title"] = "varchar";//标题
			columns["link"] = "varchar";//跳转内容
			columns["pic"] = "varchar";//图片广告
			columns["content"] = "varchar";//文字广告
			columns["status"] = "varchar";//状态
			columns["status_name"] = "varchar";//状态
			return columns;
		}
				
			   
	//获取广告列表，传入对应的搜索条件
	public list(search_condition, showLoadingModel: boolean = true) {
        let api: BannerApi = new BannerApi(this.http);
        return api.list(search_condition, showLoadingModel).then(data => {
            this.batchUpdate(data);
            return data;
        }).catch(e => {
            return this.simpleQuery(search_condition);
        });
    }
	
	
	//获取广告列表，传入对应的搜索条件
    public sync(search_condition = null, showLoadingModel: boolean = true) {
        let api: BannerApi = new BannerApi(this.http);
        return this.getLastestUpdatedTime().then((updatedate) => {
            if (updatedate == undefined) {
                return this.list(search_condition, showLoadingModel);
            }
            return api.list({ "lastupdatecalltime": updatedate }, showLoadingModel).then(data => {
                alert(JSON.stringify(data));
                return this.batchUpdate(data).then(() => {
                    this.updateLatestUpdatedTime();
                    if (search_condition == null) {
                        return null;
                    }
                    return this.simpleQuery(search_condition);
                });
            }).catch(() => {
                if (search_condition == null) {
                    return null;
                }
                this.simpleQuery(search_condition);
            });
        }).catch(e => {
            if (search_condition == null) {
                return null;
            }
            return this.simpleQuery(search_condition);
        });
    }



}