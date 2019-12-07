import { PropsTransformer, Props } from '../types';

interface PropsMapper {
  [oldProp: string]: string | ((nestedPropName: string) => string);
}

export function createPropsTransformer(propsMapper: PropsMapper): PropsTransformer {
  return originalProps => {
    const transformedProps: Props = {};

    for (const propName in originalProps) {
      const propMapper = propName in propsMapper ? propsMapper[propName] : propName;

      if (typeof propMapper === 'function') {
        for (const nestedPropName in originalProps[propName]) {
          transformedProps[propMapper(nestedPropName)] = originalProps[propName][nestedPropName];
        }
      } else {
        transformedProps[propMapper] = originalProps[propName];
      }

    }

    return transformedProps;
  };
}
