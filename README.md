# brindille-interactive-component
Simple ES6 class to build interactive html components.

## Installation
```bash
npm install brindille-interactive-component --save
```

## Usage

`brindille-interactive-component` extends `brindille-component`. See the [usage of the latter](https://github.com/brindille/brindille-component/blob/master/README.md) before continuing.

```javascript
var InteractiveComponent = require('brindille-interactive-component');

var MyCustomButton = (function() {
  function MyCustomButton($el) {
    InteractiveComponent.call(this, $el);

    // Define custom behaviour here
  }

  MyCustomButton.prototype = new InteractiveComponent();
  MyCustomButton.prototype.constructor = MyCustomButton;

  // Define custom methods here
})();
```


## Methods
The InteractiveComponent class provides you methods you should override to handle interactions of your component's `$el`.

```javascript
onClick(evt) {
  // handle click event
}

onMouseOver(evt) {
  // handle mouseenter event
}

onMouseOut(evt) {
  // handle mouseleave event
}

onTouchStart(evt) {
  // handle touchstart event
}

onTouchUp(evt) {
  // handle touchend event
}

onTouchMove(evt) {
  // handle touchmove event
}
```

## Properties

The class provides you also some useful properties about user swiping to avoid you to recalulate them.
```javascript
this.swipe = {
  distanceX: 0, // distance swiped on X
  distanceY: 0, // distance swiped on Y
  directionX: 0, // 1: right, -1: left
  directionY: 0 // 1: top, -1: bottom
};
```
