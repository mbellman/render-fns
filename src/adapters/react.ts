import { createElement, Component, ReactElement } from 'react';
import { VirtualElementCreatorFactory, Props, VirtualElement, VirtualElementToolbox, RenderFnConfig, StateManager } from '../types';
import { capitalize, arrayToObject, mapObject, identity } from '../utils';
import { ElementNames } from '../constants';
import { createPropsTransformer } from './adapter-utils';

interface InternalReactElement extends ReactElement {
  $$typeof: Symbol;
}

const isChildNode = (value?: any) => typeof value !== 'object' || !!(value as InternalReactElement).$$typeof;

const transformReactProps = createPropsTransformer({
  class: 'className',
  on: eventName => `on${capitalize(eventName)}`
});

const createReactElementCreator: VirtualElementCreatorFactory = type => {
  return (propsOrFirstChild?: Props | VirtualElement, ...children: VirtualElement[]) => {
    if (isChildNode(propsOrFirstChild)) {
      return createElement(type, {}, propsOrFirstChild, ...children);
    } else {
      return createElement(type, transformReactProps(propsOrFirstChild as Props), ...children);
    }
  };
};

const createReactStateManager = <S>(component: React.Component<any, S>): StateManager<S> => {
  return {
    get state() {
      return component.state;
    },
    set(field, value?) {
      function setComponentState(value: any) {
        component.setState({
          [field]: value
        } as S);
      }

      if (value) {
        setComponentState(value);
      }

      return setComponentState;
    }
  };
};

const nativeElementToolbox = arrayToObject(ElementNames, identity, createReactElementCreator);

export function createComponent<P, S>(config: RenderFnConfig<P, S>): React.FunctionComponent<P> | React.ComponentClass<P, S>;
export function createComponent<P, S>({ injections, renderFn }: RenderFnConfig<P, S>): React.FunctionComponent<P> | React.ComponentClass<P, S> {
  const isStateful = renderFn.length === 3;

  const toolbox: VirtualElementToolbox = {
    ...nativeElementToolbox,
    ...mapObject(injections, identity, injection => createReactElementCreator(createComponent(injection)))
  };

  if (isStateful) {
    return class extends Component<P, S> {
      state: S = {} as S;
      stateManager: StateManager<S> = createReactStateManager(this);

      render() {
        return renderFn(toolbox, this.props as P, this.stateManager);
      }
    };
  } else {
    return props => renderFn(toolbox, props) as React.ReactElement;
  }
}
