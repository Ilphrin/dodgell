class Button {
  action: (parent: Menu)=>void;
  name: string;
  parent: Menu;

  constructor(parent = null, name, action: ()=> void) {
    this.parent = parent;
    this.name = name;
    this.action = action;
  }

  draw(x, y) {
    var actor = new Sup.Actor("Button" + this.name);
    actor.textRenderer.setFont("Fonts/Main_font");
    actor.textRenderer.setText(this.name);
    actor.textRenderer.setSize(42);
    actor.setPosition(x, y, 1);
    
  }
}