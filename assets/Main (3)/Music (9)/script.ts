module Dodgell {
  interface Audio {
    elem: Sup.Audio.SoundPlayer,
    asset: string
  }

  export class Music {
    musicLevel = 0.5;
    fadeOut: boolean = false;
    current: Audio[] = [];
    fadeInterval: number = 0;

    addMusic = (pathOrAsset: string) => {
      if (this.current.length > 0 && this.current[0].asset === pathOrAsset)
        return;

      this.current.push({elem: Sup.Audio.playSound(pathOrAsset, this.musicLevel, {loop: true}), asset: pathOrAsset});
      if (this.current.length == 1) {
        this.playNextMusic();
      }
    }

    stopMusic = () => {
      this.current[0].elem.stop();
      this.current.shift();
    }

    playNextMusic = () => {
      if (this.current.length == 0) {
        Sup.log("No more music to play");
      }
      else {
        this.current[0].elem.play();
      }
    }

    // We lower the volume power by 1% on each Sup.setTimeout call. Resulting in a fading effect with any time value you give it to eat
    fade = (time: number, fadeOut: boolean = true) => {
      this.fadeInterval = 1 / 100 * time;
      this.fadeOut = fadeOut;
      Sup.setTimeout(this.fadeInterval, this.fading);
    }
    fading = ()=> {
      this.musicLevel += 0.01 * (this.fadeOut? -1: 1);
      this.current[0].elem.setVolume(this.musicLevel);
      if (this.musicLevel > 0.0) {
        Sup.setTimeout(this.fadeInterval, this.fading);
      }
      else {
        this.stopMusic();
        this.playNextMusic();
      }
    }
    
    stopAndAdd = (pathOrAsset: string) =>  {
      if (this.current.length > 0 && this.current[0].asset !== pathOrAsset) {
        this.stopMusic();
        this.addMusic(pathOrAsset);
      }
      else if (this.current.length == 0) {
        this.addMusic(pathOrAsset);
      }
      // else we are willing to play the exact same music as before so we do nothing
    }
  }
}
