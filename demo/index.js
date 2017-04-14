import TestComponent from './components/TestComponent'
import Component from 'brindille-component'

const rootComponent = new Component(document.body, {TestComponent})
rootComponent.mobile = false
