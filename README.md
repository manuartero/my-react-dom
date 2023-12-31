# my-react-dom

custom tiny react-dom

### Steps

```js
import ReactReconcilier from "react-reconciler";

// how to talk to the host environment
const hostConfig = {};

const reconciler = ReactReconcilier(hostConfig);

const myReactDOM = {
  render(what, where) {
    const container = reconciler.createContainer(where, false, false);
    reconciler.updateContainer(what, container, null, null);
  },
};

export default myReactDOM;
```

```js
// how to talk to the host environment
const hostConfig = {
  now: Date.now,
  supportsMutation: true,
  getRootHostContext: () => {},
  prepareForCommit: () => {},
  resetAfterCommit: () => {},
  getChildHostContext: () => {},
  shouldSetTextContent: () => {},
  createInstance: () => {},
  createTextInstance: () => {},
  appendInitialChild: () => {},
  finalizeInitialChildren: () => {},
  clearContainer: () => {},
  appendChildToContainer: () => {},
};
```

```js
  createInstance: (type, newProps) => {
    console.log("createInstance()", type, newProps);
  },
```

```js
  createInstance: (type, newProps) => {
    console.log("createInstance()", type, newProps);
    const el = document.createElement(type);
    return { el };
  },
```

```js
  createTextInstance: (text) => {
    console.log("createTextInstance()", text);
  },
```

```js
  appendInitialChild: (parent, child) => {
    console.log("appendInitialChild()", { parent, child });
    parent.appendChild(child);
  },
  appendChildToContainer: (container, child) => {
    console.log("appendChildToContainer()", { container, child });
    container.appendChild(child);
  },
  appendChild: (parent, child) => {
    console.log("appendChild()", { parent, child });
    parent.appendChild(child);
  },
```

> NO LISTENERS

```js
 removeChild: (parent, child) => {
    if (DEBUG) console.log("removeChild()", { parent, child });
    parent.removeChild(child);
  },
  removeChildFromContainer: (container, child) => {
    if (DEBUG) console.log("removeChildFromContainer()", { container, child });
    container.removeChild(child);
  },
```

```js
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
```
