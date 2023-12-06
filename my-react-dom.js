import ReactReconcilier from "react-reconciler";

const DEBUG = false;

// how to talk to the host environment
const hostConfig = {
  now: Date.now,
  supportsMutation: true,
  getRootHostContext: () => {},
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
  getChildHostContext: () => {},
  shouldSetTextContent: () => {},

  createInstance: (type, newProps) => {
    if (DEBUG) console.log("createInstance()", { type, newProps });
    const el = document.createElement(type);
    if (newProps.onClick) {
      el.addEventListener("click", newProps.onClick);
    }
    if (newProps.className) {
      el.className = newProps.className;
    }

    if (newProps.bgColor) {
      el.style.backgroundColor = newProps.bgColor;
    }
    if (newProps.padding) {
      el.style.padding = newProps.padding + "px";
    }
    return el;
  },
  createTextInstance: (text) => {
    if (DEBUG) console.log("createTextInstance()", text);
    return document.createTextNode(text);
  },

  appendChild: (parent, child) => {
    if (DEBUG) console.log("appendChild()", { parent, child });
    parent.appendChild(child);
  },
  appendChildToContainer: (container, child) => {
    if (DEBUG) console.log("appendChildToContainer()", { container, child });
    container.appendChild(child);
  },
  appendInitialChild: (parent, child) => {
    if (DEBUG) console.log("appendInitialChild()", { parent, child });
    parent.appendChild(child);
  },

  removeChild: (parent, child) => {
    if (DEBUG) console.log("removeChild()", { parent, child });
    parent.removeChild(child);
  },
  removeChildFromContainer: (container, child) => {
    if (DEBUG) console.log("removeChildFromContainer()", { container, child });
    container.removeChild(child);
  },
  insertBefore: (parent, child, before) => {
    if (DEBUG) console.log("insertBefore()", { parent, child, before });
    parent.insertBefore(child, before);
  },
  insertInContainerBefore: (container, child, before) => {
    if (DEBUG)
      console.log("insertInContainerBefore()", { container, child, before });
    container.insertBefore(child, before);
  },

  prepareUpdate: (instance, type, oldProps, newProps) => {
    if (DEBUG)
      console.log("prepareUpdate()", { instance, type, oldProps, newProps });
    const payload = {};
    if (oldProps.onClick !== newProps.onClick) {
      payload.onClick = newProps.onClick;
    }
    return payload;
  },
  commitUpdate: (instance, updatePayload, type, oldProps, newProps) => {
    console.log("commitUpdate()", {
      instance,
      updatePayload,
      type,
      oldProps,
      newProps,
    });
    if (updatePayload.onClick) {
      instance.addEventListener("click", updatePayload.onClick);
    }
  },
  commitTextUpdate: (textInstance, oldText, newText) => {
    console.log("commitTextUpdate()", { textInstance, oldText, newText });
    textInstance.nodeValue = newText;
  },

  finalizeInitialChildren: () => {},
  clearContainer: () => {},
};

const reconciler = ReactReconcilier(hostConfig);

const myReactDOM = {
  render(what, where) {
    const container = reconciler.createContainer(where, false, false);
    reconciler.updateContainer(what, container, null, null);
  },
};

export default myReactDOM;
