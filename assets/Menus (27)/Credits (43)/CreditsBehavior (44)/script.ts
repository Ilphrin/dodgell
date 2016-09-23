class CreditsBehavior extends Sup.Behavior {
  awake() {
    
  }

  update() {
    if (Sup.Input.isKeyDown("ESCAPE")) {
      Sup.loadScene("Menus/Main/Main");
    }
  }
}
Sup.registerBehavior(CreditsBehavior);
