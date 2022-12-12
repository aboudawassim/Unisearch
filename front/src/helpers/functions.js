export const objectToArray = (MyObject) => {
  const arr = [];
  Object.keys(MyObject).forEach((key) =>
    arr.push({ name: key, value: MyObject[key] })
  );
  return arr;
};
