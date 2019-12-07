function identity<T>(v: T): T {
  return v;
}

export function arrayToObject<T, K extends string | number | symbol, U>(
  array: Readonly<T[]>,
  keyMapper: (v: T) => K,
  valueMapper: (v: T) => U = identity as (v: T) => U
): Record<K, U> {
  return array.reduce((object, element) => {
    object[keyMapper(element)] = valueMapper(element);

    return object;
  }, {} as Record<K, U>);
}

export const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);
