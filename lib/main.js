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

$l.extend = (base, ...options) => {
  options.forEach(obj => {
    for (let key in obj) {
      base[key] = obj[key];
    }
  });

  return base;
}

$l.ajax = options => {
  const request = new XMLHttpRequest();
  const base = {
    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
    method: 'GET',
    url: '',
    data: {},
    success: () => {},
    error: () => {},
  };

  options = $l.extend(base, options);
  options.method = options.method.toUpperCase();

  if (options.method === 'GET') {
    options.url += '?' + stringifiedQuery(options.data);
  }

  request.open(options.method, options.url, true);
  request.onload = e => {
    if (request.status === 200) {
      options.success(request.response);
    } else {
      options.error(request.response);
    }
  };

  request.send(JSON.stringify(options.data));
}

stringifiedQuery = obj => {
  let stringifiedResult = '';

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      stringifiedResult += key + '=' + obj[key] + '&';
    }
  }

  return stringifiedResult.slice(0, -1);
}

document.addEventListener('DOMContentLoaded', () => {
  docReady = true;
  docReadyCallbacks.forEach( callback => callback() );
});
