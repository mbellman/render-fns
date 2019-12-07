import { createElement } from 'react';
import { RenderFn, VirtualElementCreatorFactory, Props, VirtualElement } from '../types';
import { capitalize, arrayToObject } from '../utils';
import { ElementNames } from '../constants';
import { createPropsTransformer } from './adapter-utils';

const transformReactProps = createPropsTransformer({
  class: 'className',
  on: eventName => `on${capitalize(eventName)}`
});

const createReactElementCreator: VirtualElementCreatorFactory = name => {
  return (props: Props, ...children: VirtualElement[]) => {
    return createElement(name, transformReactProps(props), ...children);
  };
};

const reactVirtualElementToolbox = arrayToObject(ElementNames, name => name, createReactElementCreator);

export function createComponent<P extends Props>(renderFn: RenderFn<P>): React.FunctionComponent<P> {
  return props => renderFn(reactVirtualElementToolbox, props) as React.ReactElement;
}
