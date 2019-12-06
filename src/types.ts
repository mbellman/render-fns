import { ElementNames } from './constants';

export type ElementName = typeof ElementNames[number];

export type Props = Record<string, any>;

export type VirtualElement = Record<string | number | symbol, any>;

export type VirtualElementCreator = (props?: Props, ...children: VirtualElement[]) => VirtualElement;

export type VirtualElementCreatorFactory = (name: ElementName) => VirtualElementCreator;

export type VirtualElementToolbox = Record<ElementName, VirtualElementCreator>;

export type RenderFn<P extends Props> = (toolbox: VirtualElementToolbox) => (props: P) => VirtualElement;
