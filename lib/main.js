import DOMNodeCollection from './dom_node_collection.js';

let docReady = false;
const docReadyCallbacks = [];

window.$l = arg => {
  let nodesList;

  if (typeof(arg) === 'string') {
    const nodes = document.querySelectorAll(arg);
    nodesList = Array.from(nodes);
  } else if (arg instanceof HTMLElement) {
    nodesList = [arg];
  } else if (typeof(arg) === 'function') {
    return docReady ? arg() : docReadyCallbacks.push(arg);
  }

  return new DOMNodeCollection(nodesList);
};

document.addEventListener('DOMContentLoaded', () => {
  docReady = true;
  docReadyCallbacks.forEach( callback => callback() );
});
