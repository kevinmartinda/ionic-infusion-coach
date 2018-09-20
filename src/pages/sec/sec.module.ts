import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SecPage } from './sec';

@NgModule({
  declarations: [
    SecPage,
  ],
  imports: [
    IonicPageModule.forChild(SecPage),
  ],
})
export class SecPageModule {}
