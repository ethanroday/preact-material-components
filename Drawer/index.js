var _extends =
  Object.assign ||
  function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

import { h } from "preact";
import MaterialComponent from "../MaterialComponent";
import { MDCTemporaryDrawer } from "@material/drawer/temporary";
import { MDCPersistentDrawer } from "@material/drawer/persistent";
import List from "../List";

class TemporaryDrawer extends MaterialComponent {
  constructor() {
    super();
    this.componentName = "temporary-drawer";
    this._open = this._open.bind(this);
    this._close = this._close.bind(this);
  }
  _open() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }
  _close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  componentDidMount() {
    this.MDComponent = MDCTemporaryDrawer.attachTo(this.control);
    this.MDComponent.listen("MDCTemporaryDrawer:open", this._open);
    this.MDComponent.listen("MDCTemporaryDrawer:close", this._close);
  }
  componentWillUnmount() {
    this.MDComponent.unlisten("MDCTemporaryDrawer:close", this._close);
    this.MDComponent.unlisten("MDCTemporaryDrawer:open", this._open);
    this.MDComponent.destroy && this.MDComponent.destroy();
  }
  materialDom(props) {
    return h(
      "aside",
      _extends(
        {
          className: "mdc-typography",
          ref: control => {
            this.control = control;
          }
        },
        props
      ),
      h("nav", { className: "mdc-temporary-drawer__drawer" }, props.children)
    );
  }
}

class TemporaryDrawerHeader extends MaterialComponent {
  constructor() {
    super();
    this.componentName = "temporary-drawer__header";
  }
  materialDom(props) {
    return h(
      "header",
      _extends(
        {
          ref: control => {
            this.control = control;
          }
        },
        props
      ),
      h(
        "div",
        { className: "mdc-temporary-drawer__header-content" },
        props.children
      )
    );
  }
}

class TemporaryDrawerContent extends MaterialComponent {
  constructor() {
    super();
    this.componentName = "temporary-drawer__content";
  }
  materialDom(props) {
    return h(
      "nav",
      _extends(
        {
          className: "mdc-list",
          ref: control => {
            this.control = control;
          }
        },
        props
      ),
      props.children
    );
  }
}

/**
 * @prop spacer = false
 */
class PermanentDrawer extends MaterialComponent {
  constructor() {
    super();
    this.componentName = "permanent-drawer";
  }
  materialDom(props) {
    return h(
      "nav",
      _extends({ className: "mdc-typography" }, props),
      props.spacer &&
        h("div", { className: "mdc-permanent-drawer__toolbar-spacer" }),
      h(
        "div",
        { className: "mdc-permanent-drawer__content" },
        h("nav", { className: "mdc-list" }, props.children)
      )
    );
  }
}

class PersistentDrawer extends MaterialComponent {
  constructor() {
    super();
    this.componentName = "persistent-drawer";
    this._open = this._open.bind(this);
    this._close = this._close.bind(this);
  }
  _open() {
    if (this.props.onOpen) {
      this.props.onOpen();
    }
  }
  _close() {
    if (this.props.onClose) {
      this.props.onClose();
    }
  }
  componentDidMount() {
    this.MDComponent = MDCPersistentDrawer.attachTo(this.control);
    this.MDComponent.listen("MDCPersistentDrawer:open", this._open);
    this.MDComponent.listen("MDCPersistentDrawer:close", this._close);
  }
  componentWillUnmount() {
    this.MDComponent.unlisten("MDCPersistentDrawer:close", this._close);
    this.MDComponent.unlisten("MDCPersistentDrawer:open", this._open);
    this.MDComponent.destroy && this.MDComponent.destroy();
  }
  materialDom(props) {
    return h(
      "aside",
      _extends(
        {
          className: "mdc-typography",
          ref: control => {
            this.control = control;
          }
        },
        props
      ),
      h("nav", { className: "mdc-persistent-drawer__drawer" })
    );
  }
}

class PersistentDrawerHeader extends MaterialComponent {
  constructor() {
    super();
    this.componentName = "persistent-drawer__header";
  }
  materialDom(props) {
    return h(
      "header",
      _extends(
        {
          ref: control => {
            this.control = control;
          }
        },
        props
      ),
      h(
        "div",
        { className: "mdc-persistent-drawer__header-content" },
        props.children
      )
    );
  }
}

class PersistentDrawerContent extends TemporaryDrawerContent {
  constructor() {
    super();
    this.componentName = "mdc-persistent-drawer__content";
  }
}

/**
 * @prop selected = false
 */
class DrawerItem extends List.LinkItem {
  constructor() {
    super();
  }
  materialDom(props) {
    const returnedNode = super.materialDom(props);
    /* Logic to add selected class */
    if (props.selected) {
      returnedNode.attributes["className"] =
        "mdc-temporary-drawer--selected mdc-permanent-drawer--selected";
    }
    return returnedNode;
  }
}

let Drawer = {};

Drawer.DrawerItem = DrawerItem;
Drawer.TemporaryDrawerHeader = TemporaryDrawerHeader;
Drawer.TemporaryDrawerContent = TemporaryDrawerContent;
Drawer.TemporaryDrawer = TemporaryDrawer;
Drawer.PermanentDrawer = PermanentDrawer;
Drawer.PermanentDrawer = PersistentDrawer;
Drawer.PersistentDrawer = PersistentDrawer;
Drawer.PersistentDrawerHeader = PersistentDrawerHeader;
Drawer.PersistentDrawerContent = PersistentDrawerContent;

export default Drawer;
