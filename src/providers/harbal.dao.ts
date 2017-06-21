import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { AbstractDao } from "./dao.abstract";
import { Http } from '@angular/http';
import { HarbalApi } from "./harbal.api";

@Injectable()
export class HarbalDao extends AbstractDao {

    constructor(public http: Http, public sqlite: SQLite) {
        super(sqlite, http);
    }

	
				
		public tableName() {
			return "harbal";
		}

		public tableColumns(): Array<string> {
        var columns = new Array();
			columns["name"] = "varchar";//中文学名
			columns["pic"] = "varchar";//图片
			columns["alias_name"] = "varchar";//别称
			columns["description"] = "varchar";//描述
			columns["used_part"] = "varchar";//入药部位
			columns["taste"] = "varchar";//性味
			columns["belong"] = "varchar";//归经
			columns["effect"] = "varchar";//功效
			columns["functions"] = "varchar";//主治
			columns["compatibility"] = "varchar";//相关配伍
			return columns;
		}
				
			   
	//获取药材列表，传入对应的搜索条件
	public list(search_condition, showLoadingModel: boolean = true) {
        let api: HarbalApi = new HarbalApi(this.http);
        return api.list(search_condition, showLoadingModel).then(data => {
            this.batchUpdate(data);
            return data;
        }).catch(e => {
            var keyword = search_condition["keyword"].split(" ");
            var array = new Array();
            array.push("name");
            array.push("alias_name");
            array.push("description");
            array.push("used_part");
            array.push("taste");
            array.push("belong");
            array.push("effect");
            array.push("functions");
            array.push("compatibility");
            var sql = "select * from " + this.tableName()+" where 1=2 ";
            for (let k of keyword) {
                k = k.replace("'", "''");
                for (let v of array) {
                    sql += " "+v+" like '%"+k+"%'";
                }
            }

            return this.getDbInstance().then((db: SQLiteObject) => {
                return db.executeSql(sql, sql).then(data => {
                    var ret = new Array();
                    for (var i = 0; i < data.rows.length; i++) {
                        ret.push(data.rows.item(i));
                    }
                    return ret;
                });
            });
            //return this.simpleQuery(search_condition);
        });
    }
	
	
	//获取药材列表，传入对应的搜索条件
    public sync(search_condition = null, showLoadingModel: boolean = true) {
        let api: HarbalApi = new HarbalApi(this.http);
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


    //获取药材详情, 传入对应的id
    public get(id, showLoadingModel: boolean = true) {
        let api: HarbalApi = new HarbalApi(this.http);
        return api.get(id, showLoadingModel).then(data => {
            
            var lst = Array();
            lst.push(data);
            this.batchUpdate(lst);

            return data;

        }).catch(e => {
            return this.getOne(id);
        });
    }



}