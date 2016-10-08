class ModifiersBehavior extends Sup.Behavior {
  duration: number = 1000;
  name: string;
  effect: (target) => { void };
  effectReverse: (target) => { void };
  sprite: string;
  init = false;
  used = false;
  speed = 0.1;
  player = Sup.getActor("Player");
  time = 0;
  yPos = 0;

  awake() {

  }

  update() {
    if (this.init == true) {
      if (this.used == true) {
        let date = new Date().getTime();
        if (date - this.time >= this.duration) {
          this.actor.getChildren()[0].destroy();
          this.endEffect();
          this.destroy();
        }
      }
      let position = this.actor.getPosition();
      if (position.y < -6) {
        this.destroy();
      }
      Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.player.arcadeBody2D);
      let touches = this.actor.arcadeBody2D.getTouches();
      if (touches.bottom || touches.left || touches.right) {
        this.effectAppender();
        this.actor.spriteRenderer.destroy();
        let text = this.actor.getChildren()[0];
        text.textRenderer.setText(this.name);
        text.setPosition(-5, this.yPos, 1);
        text.textRenderer.setSize(256);
      }
    }
  }

  effectAppender() {
    Sup.Audio.playSound("Modifiers/Up");
    this.effect(Game);
    this.time = new Date().getTime();
    this.used = true;
  }
  
  endEffect() {
    this.effectReverse(Game);
  }
  
  initMod(value, pos) {
    this.name = value["Name"];
    this.sprite = value["Sprite"];
    this.effect = value["Effect"];
    this.duration = value["Duration"];
    this.yPos = value["YPos"];
    this.effectReverse = value["EndEffect"];
    this.init = true;
    this.actor.spriteRenderer.setSprite(this.sprite);
    this.actor.setLocalScale(0.1, 0.1, 1);
    this.actor.arcadeBody2D.warpPosition(pos);
    let velocity = this.actor.arcadeBody2D.getVelocity();
    velocity.y = -this.speed;
    this.actor.arcadeBody2D.setVelocity(velocity);
  }
}
Sup.registerBehavior(ModifiersBehavior);

var allModifiers = [
  {"Name": "Point Multiplier", "Sprite": "Modifiers/Sprites/Multiplier", "Duration": 5000, "YPos": 3, "Effect": (target) => {
    target.multiplier = 5;
  }, "EndEffect": (target) => {
    target.multiplier = 1;
  }},
  {"Name": "Point Divider", "Sprite": "Modifiers/Sprites/Divider", "Duration": 5000, "YPos": 4, "Effect": (target) => {
    target.multiplier = 0.2;
  }, "EndEffect": (target) => {
    target.multiplier = 1;
  }},
]