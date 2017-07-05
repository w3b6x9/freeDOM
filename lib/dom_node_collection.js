export default class DOMNodeCollection {
  constructor(nodes) {
    this.nodes = nodes;
  }

  each(cb) {
    this.nodes.forEach(cb);
  }

  html(html) {
    if (typeof html === 'string') {
      this.each(node => {
        node.innerHTML = html;
      })
    } else {
      if (this.nodes.length) {
        return this.nodes[0].innerHTML;
      }
    }
  }

  empty() {
    this.html('');
  }

  append(arg) {
    if (arg instanceof HTMLElement) {
      this.each(node => node.innerHTML += arg.outerHTML);
    } else if (typeof arg === 'string') {
      this.each(node => node.innerHTML += arg);
    } else if (arg instanceof DOMNodeCollection) {
      arg.each(domNode => {
        return this.each(node => {
          return node.innerHTML += domNode.outerHTML;
        });
      });
    }
  }

  attr(key, value) {
    if (typeof value === 'string') {
      this.each(node => node.setAttribute(key, value));
    } else {
      return this.nodes[0].getAttribute(key);
    }
  }

  addClass(className) {
    this.each(node => node.classList.add(className));
  }

  removeClass(className) {
    this.each(node => node.classList.remove(className));
  }

  children() {
    let childrenArray = [];

    this.each(node => {
      const children = Array.from(node.children);
      childrenArray = childrenArray.concat(children);
    });

    return new DOMNodeCollection(childrenArray);
  }

  parent() {
    let parentArray = [];

    this.each(node => {
      const parentNode = node.parentNode;

      if (!parentArray.includes(parentNode)) {
        parentArray.push(parentNode);
      }
    });

    return new DOMNodeCollection(parentArray);
  }

  find(selector) {
    let matchingNodes = [];

    this.each(node => {
      const nodeList = node.querySelectorAll(selector);
      matchingNodes = matchingNodes.concat(Array.from(nodeList));
    });

    return new DOMNodeCollection(matchingNodes);
  }

  remove() {
    this.each(node => node.remove());
  }
}
