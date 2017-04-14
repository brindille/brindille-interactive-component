import test from 'ava'
import sinon from 'sinon'
import Component from 'brindille-component'
import templates from './fixtures/templates'
import definitions from './fixtures/definitions'
import {dispatchMouseEvent} from './helpers/trigger-event'

/* -------------------------------------------------------------------------------------
  UTILS
------------------------------------------------------------------------------------- */
// Creates a hierarchy of components containing our interactive-component and returns it
function createComponentContext (template = templates.simple) {
  document.body.innerHTML = template
  return new Component(document.body, definitions).refs.test
}

// Returns a mock click / touch event
function createTouchEvent (x = 0, y = 0) {
  return {touches: [{clientX: x, clientY: y}]}
}

// Creating a spy on console.warn displayed by our app
function spyOnWarnings (t) {
  t.context.warn = console.warn
  console.warn = sinon.spy()
  return console.warn
}

// Restoring console.warn from context
function restoreWarnings (t) {
  console.warn = t.context.warn
}

/* -------------------------------------------------------------------------------------
  TESTS
------------------------------------------------------------------------------------- */
test('click event was heard', t => {
  const component = createComponentContext()
  t.false(component.clickOK)
  dispatchMouseEvent(component.$el, 'click')
  t.true(component.clickOK)
})

test('mousenter event was heard', t => {
  const component = createComponentContext()
  t.false(component.mouseoverOK)
  dispatchMouseEvent(component.$el, 'mouseenter')
  t.true(component.mouseoverOK)
})

test('mouseleave event was heard', t => {
  const component = createComponentContext()
  t.false(component.mouseoutOK)
  dispatchMouseEvent(component.$el, 'mouseleave')
  t.true(component.mouseoutOK)
})

test('touchstart event was heard', t => {
  const component = createComponentContext()
  component.isMobile = true
  t.false(component.touchstartOK)
  component.handleTouchStart(createTouchEvent())
  t.true(component.touchstartOK)
})

test('touchend event was heard', t => {
  const component = createComponentContext()
  component.isMobile = true
  t.false(component.touchendOK)
  component.handleTouchStart(createTouchEvent())
  component.handleToucheEnd(createTouchEvent())
  t.true(component.touchendOK)
})

test('touchmove event was heard', t => {
  const component = createComponentContext()
  component.isMobile = true
  t.false(component.touchmoveOK)
  component.handleTouchStart(createTouchEvent())
  component.handleTouchMove(createTouchEvent(1, 1))
  component.handleTouchStart(createTouchEvent())
  component.handleTouchMove(createTouchEvent(-1, 1))
  component.handleTouchStart(createTouchEvent())
  component.handleTouchMove(createTouchEvent(1, -1))
  component.handleTouchStart(createTouchEvent())
  component.handleTouchMove(createTouchEvent(-1, -1))
  t.true(component.touchmoveOK)
})

test('warning on click for empty component', t => {
  const warnings = spyOnWarnings(t)
  const component = createComponentContext(templates.empty)
  dispatchMouseEvent(component.$el, 'click')
  t.true(warnings.calledOnce)
  restoreWarnings(t)
})

test('warning on mouseenter for empty component', t => {
  const component = createComponentContext(templates.empty)
  const warnings = spyOnWarnings(t)
  dispatchMouseEvent(component.$el, 'mouseenter')
  t.true(warnings.calledOnce)
  restoreWarnings(t)
})

test('warning on mouseleave for empty component', t => {
  const component = createComponentContext(templates.empty)
  const warnings = spyOnWarnings(t)
  dispatchMouseEvent(component.$el, 'mouseleave')
  t.true(warnings.calledOnce)
  restoreWarnings(t)
})

test('warning on touchstart for empty component', t => {
  const warnings = spyOnWarnings(t)
  const component = createComponentContext(templates.empty)
  component.isMobile = true
  component.handleTouchStart(createTouchEvent())
  t.true(warnings.calledOnce)
  restoreWarnings(t)
})

test('warning on touchend for empty component', t => {
  const component = createComponentContext(templates.empty)
  component.isMobile = true
  const warnings = spyOnWarnings(t)
  component.handleTouchStart(createTouchEvent())
  component.handleToucheEnd(createTouchEvent())
  t.is(warnings.callCount, 2)
  restoreWarnings(t)
})

test('warning on touchmove for empty component', t => {
  const component = createComponentContext(templates.empty)
  component.isMobile = true
  const warnings = spyOnWarnings(t)
  component.handleTouchStart(createTouchEvent())
  component.handleTouchMove(createTouchEvent())
  t.is(warnings.callCount, 2)
  restoreWarnings(t)
})

test('changing isMobile dynamically should update listeners', t => {
  const component = createComponentContext()
  component.isMobile = true
  dispatchMouseEvent(component.$el, 'click')
  t.false(component.clickOK)
  component.isMobile = false
  dispatchMouseEvent(component.$el, 'click')
  t.true(component.clickOK)
})

test('inherits window.isMobile', t => {
  window.isMobile = true
  const component = createComponentContext()
  t.true(component.isMobile)
})

test('handles empty touches event', t => {
  const component = createComponentContext()
  component.handleTouchStart({touches: []})
  component.handleTouchMove({touches: []})
  t.pass()
})

test('destoying', t => {
  const component = createComponentContext(templates.empty)
  component.dispose()
  t.pass()
})
