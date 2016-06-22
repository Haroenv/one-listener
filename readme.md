# one-listener

big project?  
many contributors?  

too many event listeners on `window`?

This library aims to gather all handlers in one listener. This way the number of listeners are reduced.  
Performance intense listeners are wrapped in a `requestAnimationFrame`

available listeners

* scroll
* resize (includes orientationchange)
* mousewheel
* mousemove
* mouseup (not wrapped)


## installation
```bash
npm install one-listener
```

## Usage

```js

import { requestEventListener, cancelEventListener } from 'one-listener';


// request mousemove 
requestEventListener('mousemove', 'UNIQUE_ID_1', (e)=> {
  console.log({ x: e.pageX, y: e.pageY });
});

// request scroll
// and cancel mousemove on condition 
requestEventListener('scroll', 'UNIQUE_ID_2', (e)=> {
  console.log(window.scrollY);
  if (window.scrollY > 100) {
    cancelEventListener('mousemove','UNIQUE_ID_1');
  }
});

```
