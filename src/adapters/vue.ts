import Vue, { VNodeChildren, CreateElement, VNode, VNodeData, ComponentOptions } from 'vue';
import { RenderFnConfig, VirtualElementCreatorFactory, VirtualElementToolbox, VirtualElement, Props, StateManager, RenderFnInjections, State } from '../types';
import { ElementNames } from '../constants';
import { arrayToObject, identity, mapObject } from '../utils';
import { createPropsTransformer } from './adapter-utils';

interface AdaptedVueConfiguration<S> extends ComponentOptions<Vue> {
  data: () => { state: S };
};

interface AdaptedVueInstance<S> extends Vue {
  state: S;
};

const isChildNode = (value?: any) => typeof value !== 'object' || 'children' in (value as VNode);

const transformEventHandlers = createPropsTransformer({
  change: 'input'
});

function createVueElementToolbox<P, S>(vm: AdaptedVueInstance<S>, injections: RenderFnInjections): VirtualElementToolbox {
  const createElement: CreateElement = vm.$createElement;

  const createVueElementCreator: VirtualElementCreatorFactory = type => {
    const isNativeElement = typeof type === 'string';

    return (propsOrFirstChild?: Props | VirtualElement, ...children: VirtualElement[]) => {
      if (isChildNode(propsOrFirstChild)) {
        children.unshift(propsOrFirstChild);

        if (isNativeElement) {
          return createElement(type, children as VNodeChildren[]);
        } else {
          return createElement(type, {
            attrs: {
              children
            }
          });
        }
      } else {
        const props = propsOrFirstChild || {} as any;

        const data: VNodeData = {
          attrs: props,
          on: transformEventHandlers(props.on)
        };

        return createElement(type, data, children as VNodeChildren[]);
      }
    };
  };

  return {
    ...arrayToObject(ElementNames, identity, createVueElementCreator),
    ...mapObject(injections, identity, injection => createVueElementCreator(createComponent(injection)))
  };
}

function createVueStateManager<S extends State = State>(vm: AdaptedVueInstance<S>): StateManager<S> {
  return {
    get state() {
      return vm.state as S;
    },
    set(field, value?) {
      function setComponentData(value: any) {
        if (field in vm.state) {
          vm.state[field] = value;
        } else {
          vm.$set(vm.state, field as string | number, value);
        }
      }

      if (value) {
        setComponentData(value);
      }

      return setComponentData;
    }
  };
}

export function createComponent<P, S>({ injections, renderFn }: RenderFnConfig<P, S>): AdaptedVueConfiguration<S> {
  return {
    inheritAttrs: false,
    data() {
      return {
        state: {} as S
      };
    },
    created() {
      this.elementToolbox = createVueElementToolbox(this, injections);
      this.stateManager = createVueStateManager(this);
    },
    render() {
      return renderFn(this.elementToolbox, this.$attrs, this.stateManager) as VNode;
    }
  };
}
