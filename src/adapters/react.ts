import { createElement, Component } from 'react';
import { VirtualElementCreatorFactory, Props, VirtualElement, VirtualElementToolbox, RenderFnConfig } from '../types';
import { capitalize, arrayToObject, mapObject, identity } from '../utils';
import { ElementNames } from '../constants';
import { createPropsTransformer } from './adapter-utils';

interface InternalReactElement {
  $$typeof: Symbol;
}

const isReactElement = (value: any) => !!(value as InternalReactElement).$$typeof;

const transformReactProps = createPropsTransformer({
  class: 'className',
  on: eventName => `on${capitalize(eventName)}`
});

const createReactElementCreator: VirtualElementCreatorFactory = type => {
  return (propsOrFirstChild: Props | VirtualElement, ...children: VirtualElement[]) => {
    if (isReactElement(propsOrFirstChild) || typeof propsOrFirstChild !== 'object') {
      return createElement(type, {}, propsOrFirstChild, ...children);
    } else {
      return createElement(type, transformReactProps(propsOrFirstChild as Props), ...children);
    }
  };
};

const reactElementToolbox = arrayToObject(ElementNames, identity, createReactElementCreator);

export function createComponent<P, S>(config: RenderFnConfig<P, S>): React.FunctionComponent<P> | React.ComponentClass<P, S>;
export function createComponent<P, S>({ injections, renderFn }: RenderFnConfig<P, S>): React.FunctionComponent<P> | React.ComponentClass<P, S> {
  const toolbox: VirtualElementToolbox = {
    ...reactElementToolbox,
    ...mapObject(injections, identity, injection => createReactElementCreator(createComponent(injection)))
  };

  if (renderFn.length === 2) {
    // Stateless functional component
    return props => renderFn(toolbox, props) as React.ReactElement;
  } else {
    // Stateful class component
    return <React.ComponentClass<P, S>>class extends Component {
      state = {};

      render() {
        return renderFn(toolbox, this.props as P, this.state as S);
      }
    };
  }
}
