class Menu extends Element {
  elemList: Element[] = [];
  drawAsElem: ()=>{} = null;
  backButton: Element = null;

  constructor(parent= null, name="", drawAsElem = null) {
    super(parent);
    this.name = name;
    this.drawAsElem = drawAsElem;
    
    // If we are in a submenu, then we need to be able to go back
    // Then we create a backButton to go back to the parent and letting
    // him drawing himself again
    if(parent === null) {
      this.backButton = new Element(this);
      this.backButton.name = "Back";
      this.backButton.onclick = function() {
        for (var elem of this.parent.elemList) {
          elem.destroy();
        }
        this.parent.parent.draw();
      };
      this.backButton.draw = ()=> {
        this.actor = Sup.appendScene("Menus/ButtonPrefab")[0];
        this.actor.getChildren()[0].spriteRenderer.setSprite("Menus/Back");
        this.actor.getChildren()[1].textRenderer.setText("Back");
        this.actor.setPosition(4, -3, 1);
      };
      this.elemList.push(this.backButton);
    }
    
  }

  onclick = ()=> {
    this.draw();
  }
  
  addElement = (elem: Element)=> {
    this.elemList.push(elem);
  }
  
  drawContent = ()=> {
    for (var elem of this.elemList) {
      if (elem.draw !== undefined) {
        elem.draw();
      }
    }
    if (this.backButton !== null) {
      this.backButton.draw();
    }
  }
  
  destroy = ()=> {
    if (this.parent !== null) {
      for (var elem of this.elemList) {
        elem.destroy();
      }
    }
    if (this.backButton !== null) {
      this.backButton.destroy();
    }
  }
  
}

