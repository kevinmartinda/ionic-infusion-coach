import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SecPage } from '../sec/sec';
import { TrdPage } from '../trd/trd';


/**
 * Generated class for the FrtPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-frt',
  templateUrl: 'frt.html',
})

export class FrtPage {
@ViewChild('canvas') canvas: ElementRef;
  private _CANVAS: any;
  private _CONTEXT: any;

  drIn2: number;
  TIME: any;
  TIME2: any;
  dripRate: number = 0;
  vol: number;
  interv: number = 0;
  specWidth: number;
  drIn: number;
  tt: number;
  pilIn: any;
  irIn: number;
  dfIn: number;
  condition: boolean = false;

  constructor( public navCtrl: NavController, public navParams: NavParams, private platform: Platform ) {
    let backAction = this.platform.registerBackButtonAction(() => {
      console.log("Fourth");
      this.navCtrl.pop();
      backAction();
    }, 4);
  }

  ionViewDidLoad() {
    this.initInstance();
    this.initCanvas();
    this.drawTheSecPad();
    this.drawMeterPad();
  }

  initInstance(){
    this.drIn = this.navParams.get('drIn');
    this.vol = this.navParams.get('tv');
    this.dfIn = this.navParams.get('dfIn');
    this.irIn = this.navParams.get('irIn');
    this.tt = this.navParams.get('tt');
    this.pilIn = this.navParams.get('pil');
    console.log("1 : " + this.drIn + ", 2 : " + this.vol + ", 3 : " + this.dfIn + ", 4 : " + this.irIn + ", 5 : " + this.tt + ", 6 : " + this.pilIn);
  }

  initCanvas(){
    this._CANVAS = this.canvas.nativeElement;
    this._CONTEXT = this._CANVAS.getContext('2d');
    this._CANVAS.width = 320;
    this._CANVAS.height = 80;
  }

  toHome(){
    this.navCtrl.setRoot(HomePage);
  }

  toSet(){
    this.navCtrl.push(SecPage, {
      drIn: this.drIn,
      tv: this.vol,
      tt: this.tt,
      irIn: this.irIn,
      dfIn: this.dfIn,
      pil: this.pilIn
    });
  }

  toWatch(){
    this.navCtrl.push(TrdPage, {
      drIn: this.drIn,
      tv: this.vol,
      tt: this.tt,
      irIn: this.irIn,
      dfIn: this.dfIn,
      pil: this.pilIn
    });
  }

  calcDrIn(){
    if (this.condition == false){
      this.startTime();
      this.condition = true;
    } else {
      this.pauseAndCalc();
    }
  }

  pauseAndCalc(){
    this.dripRate++;
    this.TIME2 = new Date();
    this.interv = (this.TIME2 - this.TIME) / 1000;
    this.calcDrip();
    this.calcSpecWidth();
    this._CONTEXT.clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
    this.drawTheSecPad();
    this.drawMeterPad();
    this.drawTheMeter();
  }

  drawMeterPad(){
    this._CONTEXT.beginPath();
    this._CONTEXT.rect(this._CANVAS.width * 5/11, 0, 30, this._CANVAS.height);
    this._CONTEXT.fillStyle = 'rgba(0, 255, 0, 0.5)';
    this._CONTEXT.fill();
  }

  drawTheSecPad() {
    this._CONTEXT.beginPath();
    this._CONTEXT.rect(0, 1 / 3 * this._CANVAS.height, this._CANVAS.width, 1 / 3 *this._CANVAS.height);
    this._CONTEXT.fillStyle = '#f2f5f9';
    this._CONTEXT.fill();

  }

  drawTheMeter(){
    this._CONTEXT.beginPath();
    this._CONTEXT.rect(0, 1 / 3 * this._CANVAS.height, this._CANVAS.width * this.specWidth, 1 / 3 * this._CANVAS.height);
    this._CONTEXT.fillStyle = 'rgba(34, 91, 183, 0.7)';
    this._CONTEXT.fill();

  }

  calcDrip(){
    this.drIn2 = this.roundIt((60 * this.dripRate / this.interv), 1);
  }

  calcSpecWidth(){
    this.specWidth = (this.drIn2 / this.drIn) * (50 / 100);
  }

  startTime(){
    this.TIME = new Date();
    console.log("starting time : " + this.TIME);
  }

  roundIt(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

}



