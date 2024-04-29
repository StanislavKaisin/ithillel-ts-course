// 1 ================================

type DeepReadonly<T> = {
  readonly [K in keyof T]: DeepReadonly<T[K]>;
};

const obj = {
  property_1: "property1",
  property_2: {
    property_2_1: "property2_1",
    property_2_2: "property2_2",
  },
};

const readonlyObj: DeepReadonly<typeof obj> = {
  property_1: "property1",
  property_2: {
    property_2_1: "property2_1",
    property_2_2: "property2_2",
  },
};

obj.property_1 = "property_1 new value";
console.log("obj.property_1 :>> ", obj.property_1); //property_1 new value

// ts eror here
readonlyObj.property_1 = "property_1 new value"; //property_1 new value
console.log("readonlyObj.property_1 :>> ", readonlyObj.property_1);

// ts eror here
readonlyObj.property_2.property_2_1 = "property_2_1 new value";
console.log(
  "readonlyObj.property_2.property_2_1 :>> ",
  readonlyObj.property_2.property_2_1
); //property_2_1 new value

// 2 ================================

type DeepRequireReadonly<T> = {
  readonly [K in keyof T]-?: DeepRequireReadonly<T[K]>;
};

type TypeWithNotRequiredProperties = {
  property_1?: string;
  property_2?: {
    property_2_1?: string;
    property_2_2?: string;
  };
};

//ts error Property 'property_2' is missing in type '{ property_1: string; }'
const objWithRequiredProperties: DeepRequireReadonly<TypeWithNotRequiredProperties> =
  {
    property_1: "property1",
  };
//ts error Cannot assign to 'property_1' because it is a read-only property.
objWithRequiredProperties.property_1 = "property_1 new value";
//ts error Cannot assign to 'property_2_1' because it is a read-only property.ts(2540)
objWithRequiredProperties.property_2.property_2_1 = "property_2_1 new value";

// 3 ================================

type UpperCaseKeys<T> = {
  [K in keyof T]: K extends string ? Uppercase<K> : K;
};

type User = {
  name: string;
  age: number;
};

type UserUpperKeys = UpperCaseKeys<User>;

//ts error Type '"name"' is not assignable to type '"NAME"'
const userUpperKeys: UserUpperKeys = {
  name: "name",
  100: "100",
};

// 4 ================================

type ObjectToPropertyDescriptor<T> = {
  [K in keyof T]: PropertyDescriptor;
};

type DeepRequired<T> = {
  [K in keyof T]-?: DeepRequired<T[K]>;
};

type RequiredObjectToPropertyDescriptor<T> = {
  [K in keyof T]: DeepRequired<PropertyDescriptor>;
};

const userConfig: RequiredObjectToPropertyDescriptor<User> = {
  //ts error Type '{}' is missing the following properties from type
  // 'DeepRequired<PropertyDescriptor>': configurable, enumerable, value, writable, and 2 more.
  name: {
    // configurable: true,
    // enumerable: true,
    // writable: true,
    // value: "John Doe",
  },
};
