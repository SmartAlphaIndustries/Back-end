const getQueryDescriptor = (target: any, key: string) => {
  const propDesc = Object.getOwnPropertyDescriptor(target, key);
  return {
    value: propDesc?.value,
    writable: propDesc?.writable,
    enumerable: propDesc?.enumerable,
    configurable: propDesc?.configurable,
  };
};

export default getQueryDescriptor;
