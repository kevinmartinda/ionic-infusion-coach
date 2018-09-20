import { Component, ElementRef, ViewChild } from '@angular/core';
import { Platform, IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SmartAudioProvider } from '../../providers/smart-audio/smart-audio';

/**
 * Generated class for the TrdPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-trd',
  templateUrl: 'trd.html',
})
export class TrdPage {
@ViewChild('canvas') canvas: ElementRef;
	private _CANVAS: any;
	private y: number;
	private dy: number;
  private condition: boolean = true;

  constructor(public alertCtrl: AlertController, public platform: Platform, public nav: NavController, public navParams: NavParams, public smartAudio: SmartAudioProvider) {
    let backAction = this.platform.registerBackButtonAction(() => {
      console.log("third");
      this.nav.pop();
      backAction();
    }, 3);
  }

  toHome(){
    this.presentAlert();
    this.condition = false;
    cancelAnimationFrame(requestAnimationFrame(this.drawCircle));
    this.smartAudio.stop('sfxWater');
  	return this.nav.setRoot(HomePage);
  }

  toPrev(){
    this.condition = false;
    cancelAnimationFrame(requestAnimationFrame(this.drawCircle));
    this.smartAudio.stop('sfxWater');
    return this.nav.pop();
  }

initPos() : void
{
	this.y = (1 / 4 * this._CANVAS.height);
}

drawBg() : void{
  var bg = new Image();
  bg.src = './assets/imgs/bg.png';
  this._CANVAS.getContext('2d').align = 'center';
  this._CANVAS.getContext('2d').drawImage(bg, 0, 0);
}

drawTetes() : void {
  var img = new Image();
  img.src = './assets/imgs/tetes.png';
  this._CANVAS.getContext('2d').drawImage(img, (2 / 2.8 * this._CANVAS.width), this.y);
}

initCanvas() : void {
  this._CANVAS.getContext('2d').clearRect(0, 0, this._CANVAS.width, this._CANVAS.height);
}

textCalc() : void {
  this._CANVAS.getContext('2d').textAlign = 'center';
  this._CANVAS.getContext('2d').font = 'bold 30pt calibri';
  this._CANVAS.getContext('2d').fillText(this.roundIt(this.dy, 1), (1 / 2.9 * this._CANVAS.width), (1 / 2.6 * this._CANVAS.height));
}

drawCircle = () => 
   {
     if (this.condition == true) {
       if (this.y < (1 / 1.3 * this._CANVAS.height)) {
         this.initCanvas();
         this._CANVAS.getContext('2d').beginPath();
         this.drawBg();
         this.drawTetes();
         requestAnimationFrame(this.drawCircle);
         this.y += 15;
       } else {
         this.smartAudio.play('sfxWater');
         this.initCanvas();
         this.drawBg();
         this.initPos();
         setTimeout(this.drawCircle, 60000 / this.dy);
       }
     this.textCalc();
     this.textIt();
     } else {
     this.smartAudio.stop('sfxWater');
     console.log("stopped");

     }
   }

   presentAlert() {
  let alert = this.alertCtrl.create({
    title: 'Low battery',
    subTitle: '10% of battery remaining',
    buttons: ['Dismiss']
  });
  alert.present();
}

   roundIt(value, precision) {
    var multiplier = Math.pow(10, precision || 0);
    return Math.round(value * multiplier) / multiplier;
  }

  textIt() : void{
    this._CANVAS.getContext('2d').font = '8pt calibri';
    this._CANVAS.getContext('2d').fillText('drop/min', (1 / 2.9 * this._CANVAS.width), (1 / 2.4 * this._CANVAS.height));
  }

  ionViewDidLoad()
   {
      this._CANVAS          = this.canvas.nativeElement;
      this._CANVAS.width    = 412;
      this._CANVAS.height   = 430;

    this.initPos();
    this.dy = this.navParams.get('drIn');
    console.log(this.dy);
    this.drawCircle();
   }

}
