class EnemyBehavior extends Sup.Behavior {
  points = 5;
  player = Sup.getActor("Player");
  frame = 0;
  speed = 0.15;

  awake() {
    new Sup.SpriteRenderer(this.actor, "Enemy/EnemySprite");
    new Sup.ArcadePhysics2D.Body(this.actor, Sup.ArcadePhysics2D.BodyType.Box, { movable: true, width: 0.6, height: 0.7});
    this.actor.arcadeBody2D.warpPosition(Sup.Math.Random.float(-6, 6), 6);
    let velocity = this.actor.arcadeBody2D.getVelocity();
    velocity.y = -this.speed;
    this.actor.arcadeBody2D.setVelocity(velocity);
  }

  update() {
    let position = this.actor.getPosition();
    if (position.y < -6) {
      this.beKilled();
    }

    Sup.ArcadePhysics2D.collides(this.actor.arcadeBody2D, this.player.arcadeBody2D);
    let touches = this.actor.arcadeBody2D.getTouches();
    if (touches.bottom || touches.left || touches.right) {
      this.kill();
    }
  }

  beKilled() {
    Game.addScore(this.points);
    this.actor.destroy();
  }

  kill() {
    this.player.getBehavior(PlayerBehavior).endLife();
    this.actor.destroy();
  }
}
Sup.registerBehavior(EnemyBehavior);
