import chai from 'chai';
import trigger from './tiny-trigger.js';
import Component from 'brindille-component';
import TestComponent from './components/TestComponent';

const expect = chai.expect;
const definitions = {
  TestComponent: TestComponent
};

describe('InteractiveComponent', () => {
  document.body.innerHTML = '<div data-ref="test" data-component="TestComponent" style="width: 100px; height: 100px; display: block;"></div>';
  const rootComponent = new Component(document.body, definitions);

  it('listens click event', () => {
    trigger(rootComponent.refs.test.$el, 'click');
    expect(rootComponent.refs.test.clickOK).to.be.true
  });

  it('listens mouseenter event', () => {
    trigger(rootComponent.refs.test.$el, 'mouseenter');
    expect(rootComponent.refs.test.mouseoverOK).to.be.true
  });

  it('listens mouseleave event', () => {
    trigger(rootComponent.refs.test.$el, 'mouseleave');
    expect(rootComponent.refs.test.mouseoutOK).to.be.true
  });

  it('listens touchstart event', () => {
    trigger(rootComponent.refs.test.$el, 'touchstart', true);
    expect(rootComponent.refs.test.touchstartOK).to.be.true
  });

  it('listens touchmove event', () => {
    trigger(rootComponent.refs.test.$el, 'touchmove', true);
    expect(rootComponent.refs.test.touchmoveOK).to.be.true
  });

  it('listens touchend event', () => {
    trigger(rootComponent.refs.test.$el, 'touchend', true);
    expect(rootComponent.refs.test.touchupOK).to.be.true
  });

});
