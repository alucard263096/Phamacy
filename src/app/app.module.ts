import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule } from '@angular/http'; //for 3.0
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SQLite } from '@ionic-native/sqlite';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { BannerDao } from "../providers/banner.dao";
import { HarbalDao } from "../providers/harbal.dao";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
      HttpModule,
    BrowserModule,
    IonicModule.forRoot(MyApp, {
        tabsPlacement: 'top',
        backButtonText: '返回'
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
      SQLite,
      HarbalDao,
      BannerDao,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
