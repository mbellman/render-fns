import { RenderFn } from './types';

export function render<P, R extends RenderFn<P>>(renderFn: R): R {
  return renderFn;
}
