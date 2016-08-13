class PlayerBehavior extends Sup.Behavior {
  speed = 0.1;
  alive: boolean = true;
  maxX = 5;
  maxY = 4;
  
  awake() {
    let velocity = this.actor.arcadeBody2D.getVelocity();
    velocity.y = 0;
  }

  update() {
    if (this.alive) {
      let velocity = this.actor.arcadeBody2D.getVelocity();
      velocity.y = 0;
      velocity.x = 0;
      if (Sup.Input.isKeyDown("LEFT")) {
        velocity.x = -this.speed;
        this.actor.spriteRenderer.setHorizontalFlip(true);
      }
      else if (Sup.Input.isKeyDown("RIGHT")) {
        velocity.x = this.speed;
        this.actor.spriteRenderer.setHorizontalFlip(false);
      }
      
      if (Sup.Input.isKeyDown("UP")) {
        velocity.y = this.speed;
        this.actor.spriteRenderer.setVerticalFlip(false);
      }
      else if (Sup.Input.isKeyDown("DOWN")) {
        velocity.y = -this.speed;
        this.actor.spriteRenderer.setVerticalFlip(true);
      }
      
      let position = this.actor.getPosition();
      if (position.x > this.maxX) {
        position.x = this.maxX;
        velocity.x = 0;
      }
      else if (position.x < -this.maxX) {
        position.x = -this.maxX;
        velocity.x = 0;
      }
      
      if (position.y > this.maxY) {
        position.y = this.maxY;
        velocity.y = 0;
      }
      else if (position.y < -this.maxY) {
        position.y = -this.maxY;
        velocity.y = 0;
      }
      
      this.actor.arcadeBody2D.warpPosition(position);
      this.actor.arcadeBody2D.setVelocity(velocity);

    }
    else {
      if (this.actor.spriteRenderer.getAnimation() == "Explosion" && this.actor.spriteRenderer.getAnimationFrameIndex() == 63) {
        isPlayerDead = true;
      }
    }
  }

  endLife() {
    if (this.alive) {
      Sup.Audio.playSound("Player/Explosion");
      this.actor.spriteRenderer.setSprite("Player/Killed");
      this.actor.spriteRenderer.setAnimation("Explosion", false);
      let velocity = this.actor.arcadeBody2D.getVelocity();
      velocity.x = 0;
      this.actor.arcadeBody2D.setVelocity(velocity);
      this.alive = false;
    }
  }

}
Sup.registerBehavior(PlayerBehavior);