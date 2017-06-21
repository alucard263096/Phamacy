import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HarbalPage } from './harbal';

@NgModule({
  declarations: [
    HarbalPage,
  ],
  imports: [
    IonicPageModule.forChild(HarbalPage),
  ],
  exports: [
    HarbalPage
  ]
})
export class HarbalPageModule {}
