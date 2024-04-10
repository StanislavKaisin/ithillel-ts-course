// 1 ================================
interface IStringOrNumber {
  [key: string]: string | number;
}
const stringOrNumberObj: IStringOrNumber = {
  a: "a",
  b: 1,
  // ts error here
  // c: true
};

// 2 ================================
interface IFunctionsValues {
  [key: string]: (arg?: any) => void;
}
const functionsValObj: IFunctionsValues = {
  a: () => {},
  // ts error here
  // b: 1,
};

// 3 ================================
const enum SomeValues {
  VALUE_1 = 1,
  VALUE_2 = 2,
  VALUE_3 = 3,
}

interface IArrayLikeObject {
  [index: number]: SomeValues;
}

const arrayLikeObject: IArrayLikeObject = {
  1: SomeValues.VALUE_1,
  2: SomeValues.VALUE_2,
  // ts error here
  // a: SomeValues.VALUE_3,
};

// 4 ================================
interface ICertainKeysObject {
  name: string;
  [key: number]: string;
}

const certainKeysObj: ICertainKeysObject = {
  // ts error if "name" is not implemented
  name: "string",
  1: "value",
  2: "second value",
  // ts error here
  // someKey: "string",
};

// 5 ================================
interface IBaseInterface {
  [key: number]: any;
}

interface IExtendedInterface extends IBaseInterface {
  range: SomeValues;
}

const extendedObj: IExtendedInterface = {
  // ts error here
  // key: "string",
  1: "a",
  2: "b",
  // ts error if "range" key is not implemented
  range: SomeValues.VALUE_2,
};

// 6 ================================
function checkObjectWithIndexedSignature(obj: ICertainKeysObject) {
  const values = Object.values(obj);
  return values.every((value) => typeof value === "string");
}

const result = checkObjectWithIndexedSignature(certainKeysObj);
console.log("result :>> ", result); // true
