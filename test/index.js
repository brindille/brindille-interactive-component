import chai from 'chai';
import Component from '..';
import TestComponent from './components/TestComponent';
import AnotherComponent from './components/AnotherComponent';

const expect = chai.expect;
const definitions = {
  TestComponent: TestComponent,
  AnotherComponent: AnotherComponent
};
const templates = {
  fake: '<div data-component="ComponentThatDoesNotExist"></div>',
  simple: '<div data-component="TestComponent"></div>',
  nested: '<div data-component="TestComponent"><div data-component="AnotherComponent"></div></div>',
  refs: '<div data-component="TestComponent" data-ref="test"></div>',
  nestedRefs: '<div data-component="TestComponent" data-ref="test"><div data-component="AnotherComponent" data-ref="another"></div></div>'
}

describe('Component', () => {
  var rootComponent = new Component(document.body);

  it('Constructing root component from empty body', () => {
    expect(rootComponent).to.be.ok;
  });

  it('Should be able to handle a data-component value that does not match a valid component', () => {
    document.body.innerHTML = templates.fake;
    var rootComponent = new Component(document.body);
    expect(rootComponent._componentInstances.length).to.equal(0);
  });

  it('Should be able to handle a data-component value that matches a valid component', () => {
    document.body.innerHTML = templates.simple;
    var rootComponent = new Component(document.body, definitions);
    expect(rootComponent._componentInstances.length).to.equal(1);
  });

  it('Should be able to handle simple nested component', () => {
    document.body.innerHTML = templates.nested;
    var rootComponent = new Component(document.body, definitions);
    expect(rootComponent._componentInstances.length).to.equal(1);
    expect(rootComponent._componentInstances[0]._componentInstances.length).to.equal(1);
  });

  it('Nested components should be passed main definitions', () => {
    document.body.innerHTML = templates.nested;
    var rootComponent = new Component(document.body, definitions);
    expect(rootComponent.definitions).to.equal(definitions);
    expect(rootComponent._componentInstances[0].definitions).to.equal(definitions);
  });

  it('Refs attribute should be registered in parent', () => {
    document.body.innerHTML = templates.refs;
    var rootComponent = new Component(document.body, definitions);
    expect(rootComponent.refs.test).to.equal(rootComponent._componentInstances[0]);
  });

  it('Nested refs should only be attributed to direct parent', () => {
    document.body.innerHTML = templates.nestedRefs;
    var rootComponent = new Component(document.body, definitions);
    expect(rootComponent.refs.test).to.equal(rootComponent._componentInstances[0]);
    expect(rootComponent.refs.test.refs.another).to.equal(rootComponent._componentInstances[0]._componentInstances[0]);
    expect(rootComponent.refs.another).to.be.undefined;
  });

  it('Dispose method should destroy component dom node', () => {

  });

  it('Dispose called on parent should also dispose all children', () => {

  });

  it('replaceContent should launch a new parse on component', () => {

  });

  it('replaceContent should clear out refs and _componentInstances to replace them with new ones', () => {

  });

  it('findInstance should return proper instance for a given component', () => {

  });

  it('findInstance should return null if component was not found among instances', () => {

  });

});
