type ObjectKey = string | number | symbol;

export function identity<T>(v: T): T {
  return v;
}

export function arrayToObject<T, K extends ObjectKey, T2>(
  array: Readonly<T[]>,
  keyMapper: (v: T) => K,
  valueMapper: (v: T) => T2 = identity as (v: T) => T2
): Record<K, T2> {
  return array.reduce((object, element) => {
    object[keyMapper(element)] = valueMapper(element);

    return object;
  }, {} as Record<K, T2>);
}

export function mapObject<K extends ObjectKey, V>(
  object: any,
  keyMapper: (k: ObjectKey) => K,
  valueMapper: (v: any) => V
): Record<K, V> {
  return arrayToObject(Object.keys(object), keyMapper, key => valueMapper(object[key]));
}

export const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);
