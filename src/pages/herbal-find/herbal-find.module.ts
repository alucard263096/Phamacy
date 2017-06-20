import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HerbalFindPage } from './herbal-find';

@NgModule({
  declarations: [
    HerbalFindPage,
  ],
  imports: [
    IonicPageModule.forChild(HerbalFindPage),
  ],
  exports: [
    HerbalFindPage
  ]
})
export class HerbalFindPageModule {}
