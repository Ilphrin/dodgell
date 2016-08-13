class GameOverBehavior extends Sup.Behavior {
  awake() {
    Game.music.addMusic("GameOver/GameOver Theme");
  }

  update() {
      if (Sup.Input.wasKeyJustPressed("SPACE")) {
        isPlayerDead = false;
        score = 0;
        Game.music.stopMusic();
        Sup.loadScene("Game");
      }
  }
}
Sup.registerBehavior(GameOverBehavior);
