class Element {
  parent: Element;
  onclick = null;
  draw = null;
  destroy = null;
  actor: Sup.Actor = null;
  name = "";

  constructor(parent: Element = null) {
    this.parent = parent;
  }

}
