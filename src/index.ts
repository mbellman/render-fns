import { RenderFnInjections, RenderFn, RenderFnConfig } from './types';

export function render<P, S, R extends RenderFn<P, S>>(renderFn: R): RenderFnConfig<P, S>;
export function render<P, S, R extends RenderFn<P, S>>(injections: RenderFnInjections, renderFn: R): RenderFnConfig<P, S>;
export function render<P, S, R extends RenderFn<P, S>>(injections: RenderFn<any, any> | RenderFnInjections, renderFn: R = injections as R) {
  return {
    injections: typeof injections === 'object' ? injections : {},
    renderFn
  };
}
