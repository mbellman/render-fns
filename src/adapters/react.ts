import { createElement } from 'react';
import { RenderFn, VirtualElementCreatorFactory, ElementName, Props, VirtualElement } from '../types';
import { arrayToObject } from '../utils';
import { ElementNames } from '../constants';

const createReactElementCreator: VirtualElementCreatorFactory = (name: ElementName) => {
  return (props: Props, ...children: VirtualElement[]) => {
    return createElement(name, props, ...children);
  };
};

const reactVirtualElementToolbox = arrayToObject(ElementNames, name => name, createReactElementCreator);

export function createComponent<P extends Props>(renderFn: RenderFn<P>): React.FunctionComponent<P> {
  const render = renderFn(reactVirtualElementToolbox);

  return props => render(props) as React.ReactElement;
}
