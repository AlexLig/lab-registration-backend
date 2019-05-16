// function pick(obj: Object, keys: string[]) {
//   return { ...keys.map(k => (k in obj ? { [k]: obj[k] } : {})) };
// }
function pick(obj: object, props: string[]): object {
  return props.reduce(reducerPick(obj), {});
}
const reducerPick = (obj: { [key: string]: any }) => (acc: any, prop: any) => {
  if (prop in obj) acc = { ...acc, [prop]: obj[prop] };
  // if (key in obj) acc[key] = obj[key];
  return acc;
};

export function removeProps<T extends object>(obj: T, ...props: (keyof T)[]) {
  return Object.entries(obj).reduce((acc, entry) => {
    const [key, value] = entry;
    if (key in props) return acc;
    return { ...acc, [key]: value };
  }, {});
}
