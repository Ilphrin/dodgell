class LevelBehavior extends Sup.Behavior {
  ui: Sup.Actor = null;
  flyingStars: Sup.Actor[] = [];
  background: Sup.Actor = null;

  awake() {
    Game.music.addMusic("Levels/Main Theme");
    Game.initLevel();
    isPlayerDead = false;
    score = 0;
    Sup.setTimeout(7000, Game.popEnemy);
    Sup.setTimeout(2000, this.popDecoration);
    this.ui = Sup.getActor("HUD");
    this.background = Sup.getActor("Background");
  }

  update() {
    if (isPlayerDead == true) {
      Game.music.fade(1000);
      Game.endLevel();
    }
    else {
      this.ui.textRenderer.setText("Score: " + score);
    }

    for (let star of this.flyingStars) {
      let position = star.getPosition();
      if (position.y < -4) {
        var index = this.flyingStars.indexOf(star, 0);
        if (index > -1) {
          this.flyingStars.splice(index, 1);
        }
        star.destroy();
      }
      else {
        position.y -= .7;
        star.setPosition(position);
      }
    }
    let position = this.background.getPosition();
    if (position.y <= -200) {
      position.y = 15;
    }
    position.y -= 0.1;
    this.background.setPosition(position);
  }

  popDecoration = ()=> {
    let elem = Sup.appendScene("Levels/flyingStar Prefab")[0];
    elem.setPosition(Sup.Math.Random.float(-6, 6), 7);
    this.flyingStars.push(elem);
    Sup.setTimeout(100, this.popDecoration);
  }
}
Sup.registerBehavior(LevelBehavior);
