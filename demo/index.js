import TestComponent from './components/TestComponent';
import Component from 'brindille-component';

const definitions = {
  TestComponent
};
var rootComponent = new Component(document.body, definitions);

console.log('hello');
