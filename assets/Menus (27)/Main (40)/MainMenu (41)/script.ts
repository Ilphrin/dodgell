class MainMenuBehavior extends Sup.Behavior {
  buttons: Sup.Actor[];
  actions = [];
  buttonsPositions: number[][] = [];
  currentButton = -1;
  baseColor;
  
  awake() {
    Game.music.stopAndAdd("ambianceTheme");
    this.buttons = Sup.getActor("Buttons").getChildren();
    for (var button of this.buttons) {
      this.buttonsPositions.push([button.getPosition().y, button.getPosition().y + 0.4]);      
    }
    this.baseColor = this.buttons[0].textRenderer.getColor();
    
    // We define here the action of each buttons, along their order in the Scene "Main" in Menus/Main. DONT'T CHANGE THE ORDER OF BUTTONS IN THE SCENE
    this.actions.push(()=>{
      Game.music.stopMusic();
      Sup.loadScene("Game");
    });
    this.actions.push(()=>{
      Sup.loadScene("Menus/Credits/Credits");
    });
  }

  update() {
    // Play an animation on each button to stand up the selected buttom and make the others sit.
    if (Sup.Input.isKeyDown("LEFT") && this.currentButton !== 0) {
      this.currentButton = 0;
      vertAnimation(this.buttons[this.currentButton], this.buttonsPositions[this.currentButton][1]);
      this.buttons[this.currentButton].textRenderer.setColor(Colors.white);
      for (var i in this.buttons) {
        if (parseInt(i) !== this.currentButton) {
          vertAnimation(this.buttons[parseInt(i)], this.buttonsPositions[parseInt(i)][0]);
        }
      }
      this.buttons[1].textRenderer.setColor(this.baseColor);
    }
    else if (Sup.Input.isKeyDown("RIGHT") && this.currentButton !== 1) {
      this.currentButton = 1;
      vertAnimation(this.buttons[this.currentButton], this.buttonsPositions[this.currentButton][1]);
      this.buttons[this.currentButton].textRenderer.setColor(Colors.white);
      for (var i in this.buttons) {
        if (parseInt(i) !== this.currentButton) {
          vertAnimation(this.buttons[parseInt(i)], this.buttonsPositions[parseInt(i)][0]);
        }
      }
      this.buttons[0].textRenderer.setColor(this.baseColor);
    }
    
    // If we press RETURN, then we launch the command corresponding to the currently selected button.
    if (Sup.Input.wasKeyJustPressed("RETURN")) {
      this.actions[this.currentButton]();
    }
  }
}

function vertAnimation(actor: Sup.Actor, dest:number) {
    var position = actor.getPosition();
    new Sup.Tween(actor, {position: position.y})
      .to({ position: dest}, 300)
      .onUpdate((object)=> {
        var position = actor.getPosition();
        position.y = object.position;
        actor.setPosition(position);
      })
      .start();
}

Sup.registerBehavior(MainMenuBehavior);
