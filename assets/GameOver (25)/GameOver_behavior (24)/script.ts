class GameOverBehavior extends Sup.Behavior {
  awake() {
    Game.music.addMusic("ambianceTheme");
    Game.endLevel();
  }

  update() {
    if (Sup.Input.wasKeyJustPressed("SPACE")) {
      isPlayerDead = false;
      score = 0;
      Game.music.stopMusic();
      Sup.loadScene("Game");
    }
    else if (Sup.Input.wasKeyJustPressed("ESCAPE")) {
      Sup.loadScene("Menus/Main/Main");
    }
  }
}
Sup.registerBehavior(GameOverBehavior);
