module Dodgell {
  export class Music {
    musicLevel = 1.0;
    fadeOut: boolean = false;
    current: Sup.Audio.SoundPlayer[] = [];
    fadeInterval: number = 0;
        
    addMusic = (pathOrAsset: string|Sup.Sound)=> {
      this.current.push(Sup.Audio.playSound(pathOrAsset, this.musicLevel, {loop: true}));
      if (this.current.length == 1) {
        this.playNextMusic();
      }
    }

    stopMusic = ()=> {
      this.current[0].stop();
      this.current.shift();
    }

    playNextMusic = ()=> {
      this.musicLevel = 1.0;
      if (this.current.length == 0) {
        Sup.log("No more music to play");
      }
      else {
        this.current[0].play();
      }
    }

    // We lower the volume power by 1% on each Sup.setTimeout call. Resulting in a fading effect with any time value you give it to eat
    fade = (time: number, fadeOut: boolean = true)=> {
      this.fadeInterval = 1 / 100 * time;
      this.fadeOut = fadeOut;
      Sup.setTimeout(this.fadeInterval, this.fading);
    }

    fading = ()=> {
      this.musicLevel += 0.01 * (this.fadeOut? -1: 1);
      this.current[0].setVolume(this.musicLevel);
      if (this.musicLevel > 0.0) {
        Sup.setTimeout(this.fadeInterval, this.fading);
      }
      else {
        this.stopMusic();
        this.playNextMusic();
      }
    }
  }
}
