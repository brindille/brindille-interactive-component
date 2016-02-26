
function dispatchMouseEvent(element, event) {
  var evt = document.createEvent('MouseEvents');
  evt.initEvent(event, true, false);
  element.dispatchEvent(evt);
}

function dispatchTouchEvent(element, event) {
  var evt = document.createEvent('TouchEvent');
  evt.initEvent(event, true, false);
  evt.touches = [{
    clientX: Math.random() * element.offsetWidth,
    clientY: Math.random() * element.offsetHeight
  }];
  element.dispatchEvent(evt);
}

module.exports = function(element, evt, mobile) {
  if (mobile) {
    dispatchTouchEvent(element, evt);
  } else {
    dispatchMouseEvent(element, evt);
  }
};
