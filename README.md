# freeDOM #

freeDOM is a lightweight JavaScript DOM interaction library inspired by jQuery that enables users to:

- traverse and manipulate DOM elements
- handle events through `on` and `off` methods
- queue functions until document is ready
- submit AJAX requests

## Core Functionality ##

freeDOM's `$l` serves as a wrapper for all of the library's methods and provides the following functionality:

- select elements with CSS selectors
- create `DOMNodeCollection` objects
- queue functions to be run once document is ready

```javascript
const $l = arg => {
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
```

### DOM Manipulation ###

- `html(html)` takes in a string as argument to set `innerHTML` of selected elements. However, the return value is the `innerHTML` of the first element if no argument is provided.

- `empty()` removes the `innerHTML` of all selected elements.

- `append(arg)` checks the passed in argument and appends either an `HTMLElement`, string, `DOMNodeCollection` to every selected element.

- `attr(key, value)` will set the attribute of the passed in `key` and `value` to each selected element if the value is the string. Otherwise, the function will return the attribute the first element.

- `addClass(className)` adds class, passed in as argument, to all selected elements.

- `removeClass(className)` removes the specified class, passed in as argument, from each selected element.

### DOM Traversal ###

- `each` iterates through the nodes of a `DOMNodeCollection` and applies a callback function.

- `children()` returns `DOMNodeCollection` of all direct children elements of every selected element.

- `parent()` returns `DOMNodeCollection` of all parent elements of every selected element.

- `find(selector)` returns all elements matching the passed in CSS selector argument.

- `remove()` removes each element from DOM.

### Event Handling ###

- `on` adds an event listener to each selected elements.

- `off` removes event listener from each selected elements.

## AJAX Requests ##

freeDOM offers the functionality to send asynchronous HTTP requests.

- `$l.ajax({options})` takes a `Hash` object as argument with multiple attributes:

```javascript
$l.ajax({
  method: 'GET',
  url: 'https://jsonplaceholder.typicode.com/comments',
  data: { postId: '1' },
})
```
