interface ButtonInit {
  button: Button;
  x: number;
  y: number;
}

class Menu {
  elements: {[id: string]: ButtonInit} = {};
  parent: Menu = null;

  constructor(parent = null) {
    this.parent = parent;
  }

  addElement(button: Button, x: number, y: number) {
    this.elements[button.name] = {button, x, y};
  }

  draw() {
    for (var elem in this.elements) {
      var content = this.elements[elem];
      content.button.draw(content.x, content.y);
    }
    if (this.parent !== null) {
      var back = new Sup.Actor("BackButton");
      back.textRenderer.setFont("Fonts/Main_font");
      back.textRenderer.setText("Back");
      back.textRenderer.setSize(42);
      back.setPosition(2, 2, 1);
    }
  }
}