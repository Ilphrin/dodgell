class ModifiersBehavior extends Sup.Behavior {
  duration: number = 1.0;
  name: string;
  effect: (target) => { void };
  sprite: string;
  init = false;
  speed = 0.1;
  player = Sup.getActor("Player");
  time = 0;
  yPos = 0;

  awake() {

  }

  update() {
    if (this.init == true) {
      Sup.log("Coucou");
      let position = this.actor.getPosition();
      if (position.y < -6) {
        this.destroy();
      }
      Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.player.arcadeBody2D);
      let touches = this.actor.arcadeBody2D.getTouches();
      if (touches.bottom || touches.left || touches.right) {
        this.effect(Game);
        this.actor.spriteRenderer.destroy();
        let text = this.actor.getChildren()[0];
        text.textRenderer.setText(this.name);
        text.setPosition(-5, this.yPos, 1);
        text.textRenderer.setSize(256);
      }
    }
  }

  initMod(value, pos) {
    this.name = value["Name"];
    this.sprite = value["Sprite"];
    this.effect = value["Effect"];
    this.duration = value["Duraction"];
    this.yPos = value["YPos"];
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
  {"Name": "Point Multiplier", "Sprite": "Modifiers/Sprites/Multiplier", "Duration": 5.0, "YPos": 3, "Effect": (target) => {
    target.multiplier = 5;
  }},
  {"Name": "Point Divider", "Sprite": "Modifiers/Sprites/Divider", "Duration": 10.0, "YPos": 4, "Effect": (target) => {
    target.multiplier = 0.2;
  }},
]