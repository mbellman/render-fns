import { ElementNames } from './constants';

export type ElementName = typeof ElementNames[number];

export type Props = Record<string, any>;

export type State = Record<string, any>;

export type PropsTransformer = (props: Props) => Props;

export type VirtualElement = Record<string | number | symbol, any> | string | number;

export type VirtualElementCreator = (propsOrFirstChild?: Props | VirtualElement, ...children: VirtualElement[]) => VirtualElement;

export type VirtualElementCreatorFactory = (name: ElementName) => VirtualElementCreator;

export type VirtualElementToolbox = Record<string, VirtualElementCreator>;

export type RenderFn<P, S = {}> = (toolbox: VirtualElementToolbox, props?: P, state?: S) => VirtualElement;

export interface RenderFnConfig<P, S> {
  injections: RenderFnInjections;
  renderFn: RenderFn<P, S>;
}

export type RenderFnInjections = Record<string, RenderFnConfig<any, any>>;

