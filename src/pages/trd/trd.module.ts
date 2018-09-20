import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrdPage } from './trd';

@NgModule({
  declarations: [
    TrdPage,
  ],
  imports: [
    IonicPageModule.forChild(TrdPage),
  ],
})
export class TrdPageModule {}
