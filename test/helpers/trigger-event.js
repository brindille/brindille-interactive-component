export function dispatchMouseEvent (element, event) {
  const evt = document.createEvent('MouseEvents')
  evt.initEvent(event, true, false)
  element.dispatchEvent(evt)
}
