class GameGlobal {
  x = 1;
  enemyCount = 0;
  history;
  music: Dodgell.Music;
  
  constructor() {
    this.music = new Dodgell.Music();
  }

  initLevel = () => {
    // Load stuff like HighScore from the computer
    let high = Sup.getActor("HighScore");
    this.history = Sup.Storage.getJSON("history");
    if (this.history != undefined) {
      Sup.log("Found a HighScore on this Computer");
      high.textRenderer.setText("Best Score: " + this.history.best);
    }
    else {
      Sup.log("No previously saved game");
      high.textRenderer.setText("Best Score: 0");
    }
  }
  
  popEnemy = () => {
    // create a new ennemy
    this.enemyCount += 1;
    let newEnemy = Sup.appendScene("Enemy/EnemyPrefab")[0];
    this.x += this.x / 10;
    newEnemy.addBehavior(EnemyBehavior);
    if (Sup.getActor("Player").getBehavior(PlayerBehavior).alive == true) {
      Sup.setTimeout(Tools.intervalCalculation(this.x), this.popEnemy);
    }
  }

  endLevel = () => {
    Sup.loadScene("GameOver/GameOver");

    // Let save the potentially new HighScore =D
    let save;
    if (this.history == undefined || this.history["best"] < score) {
      save = {
        "best": score
      }      
    }
    else {
      save = {
        "best": this.history["best"]
      };
    }
    Sup.Storage.setJSON("history", save);
  }
  
  addScore = (points) => {
    if (isPlayerDead == false) {
      score += points;
    }
  }
}

var isPlayerDead: boolean = false;
var score;
var Game = new GameGlobal();
