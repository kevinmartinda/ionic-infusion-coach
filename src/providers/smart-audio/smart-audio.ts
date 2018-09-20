import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { NativeAudio } from '@ionic-native/native-audio';

/*
  Generated class for the SmartAudioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SmartAudioProvider {

	autioType: string = 'html5';
	sounds: any = [];

	constructor( public nativeAudio: NativeAudio, private platform: Platform ) {
    	
    	if(this.platform.is('android')){
    		this.autioType = 'native';
    	}
  	}

  	preload( key, asset ) {

  		if(this.autioType === 'html5') {

			let audio = {
				key: key,
				asset: asset,
				type: 'html5'
			};

			this.sounds.push(audio);

		} else {

			this.nativeAudio.preloadSimple(key, asset);

			let audio = {
				key: key,
				asset: asset,
				type: 'native'
			};

			this.sounds.push(audio);
		}   

  	}

  	play( key ) {

		let audio = this.sounds.find((sound) => {
			return sound.key === key;
		});

		if( audio.type === 'html5' ) {

			let audioAsset = new Audio(audio.asset);
			audioAsset.play();

		} else {

			this.nativeAudio.play(audio.asset).then((res) => {
				console.log(res);
			}, (err) => {
				console.log(err);
			});

		}

  	}

  	stop( key ) {

			let audio = this.sounds.find((sound) => {
				return sound.key === key;
			});

			if (audio.type === 'html5') {

				let audioAsset = new Audio(audio.asset);
				audioAsset.volume = 0;

			} else {

				this.nativeAudio.stop(audio.asset).then((res) => {
					console.log(res);
				}, (err) => {
					console.log(err);
				});

			}

  	}

}
