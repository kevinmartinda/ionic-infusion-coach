import { Component } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { SecPage } from '../sec/sec';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public nav: Nav, public platform: Platform) {
  	this.platform.registerBackButtonAction(() => {
     console.log("HomePage");
    },1);
  }

  toSec(){
  	return this.nav.setRoot(SecPage);
  }

}
