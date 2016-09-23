class LevelBehavior extends Sup.Behavior {
  ui: Sup.Actor = null;
  flyingStars: Sup.Actor[] = [];
  background: Sup.Actor = null;
  modifierCooldown = 7500;
  modifierTime = 0.0;

  awake() {
    Game.music.addMusic("Levels/Main Theme");
    let high = Sup.getActor("HighScore");
    Game.initLevel(high);
    isPlayerDead = false;
    score = 0;
    Sup.setTimeout(7000, Game.popEnemy);
    Sup.setTimeout(2000, this.popDecoration);
    this.ui = Sup.getActor("HUD");
    this.background = Sup.getActor("Background");
    let date = new Date();
    this.modifierTime = date.getTime();
  }

  update() {
    if (isPlayerDead == true) {
      Game.music.fade(1000);
      Sup.loadScene("GameOver/GameOver");
    }
    else {
      this.ui.textRenderer.setText("Score: " + score);
    }

    // We add stars in the background here
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

    // We add powerups here!
    let date = new Date();
    if (date.getTime() - this.modifierTime >= this.modifierCooldown) {
      this.modifierTime = date.getTime();
      let mod = Sup.appendScene("Modifiers/Scene")[0];
      let elem = Sup.Math.Random.integer(0, 1);
      let pos = new Sup.Math.Vector3(Sup.Math.Random.integer(-3, 3), 7, 1);
      mod.getBehavior(ModifiersBehavior).initMod(allModifiers[elem], pos);
    }
  }

  popDecoration = ()=> {
    let elem = Sup.appendScene("Levels/flyingStar Prefab")[0];
    elem.setPosition(Sup.Math.Random.float(-6, 6), 7);
    this.flyingStars.push(elem);
    Sup.setTimeout(100, this.popDecoration);
  }
}
Sup.registerBehavior(LevelBehavior);
