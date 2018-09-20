import { Component } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { TrdPage } from '../trd/trd';
import { FrtPage } from '../frt/frt';
import { HomePage } from '../home/home';

/**
 * Generated class for the SecPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sec',
  templateUrl: 'sec.html',
})
export class SecPage {
	drIn: number;
	irIn: number;
  tv  : number;
  tt  : number;
  pilIn: any;
  dfIn: number;
  constructor(private platform: Platform, public nav: NavController, public navParams: NavParams) {
    let backAction = this.platform.registerBackButtonAction(() => {
      if(this.nav.canGoBack() == false){
        this.nav.setRoot(HomePage);
      }
      this.nav.pop();
      backAction();
    }, 2);
  }

  toPrev(){
    return this.nav.setRoot(HomePage);
  }

  getHasil(df, tv, tt, pil){
        this.dfIn = df;
        this.tv = tv;
        this.pilIn = pil;
        this.tt = tt;
         
        if (this.tv == null || this.tt == null) {
          this.drIn == null;
          this.irIn == null;
        } else if (this.pilIn == 'hour') {
          this.drIn = this.roundIt((this.tv / (this.tt * 60) * this.dfIn / 1), 1);          
          this.irIn = this.roundIt((60 / ((this.tt * 60) / this.tv)), 1);
        } else {
          this.drIn = this.roundIt((this.tv / this.tt * this.dfIn / 1), 1);
          this.irIn = this.roundIt((60 / (this.tt / this.tv)), 1);
        }
       
        console.log("Drop Rate: " + this.drIn + " and Infusion Rate: " + this.irIn);
        return true;

  }

  toClear() : void
  {
    this.tt = null;
    this.tv = null;
    this.irIn = null;
    this.drIn = null;
  }

  roundIt(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }


  watchInfusion(){
  	return this.nav.push(TrdPage, {
      drIn: this.drIn
    });
  }

  setMeasure(){
    return this.nav.push(FrtPage, {
      drIn: this.drIn,
      tv: this.tv,
      tt: this.tt,
      irIn: this.irIn,
      dfIn: this.dfIn,
      pil: this.pilIn
    });
  }

  ionViewDidLoad() {
    console.log('Yuhuiiiiiiiiiiiii');
    this.dfIn = this.navParams.get("dfIn")
    this.drIn = this.navParams.get("drIn")
    this.irIn = this.navParams.get("irIn")
    this.tt = this.navParams.get("tt")
    this.tv = this.navParams.get("tv")
  }

}
