// 1 ================================
type FunctionResultType<T> = T extends (...args: any[]) => infer R ? R : never;

const myFunction_1 = (a: number, b: number) => a + b;
const myFunction_2 = (a: Array<any>) => a.toString();
const myFunction_3 = (a: Array<any>) => console.log(a);

type myFunction_1_type = FunctionResultType<typeof myFunction_1>; // number
type myFunction_2_type = FunctionResultType<typeof myFunction_2>; // string
type myFunction_3_type = FunctionResultType<typeof myFunction_3>; // void
type notFunction = FunctionResultType<0>; // never

// 2 ================================

type FunctionParameters<T> = T extends (...args: infer P) => infer R
  ? [P, R]
  : never;

type myFunction_1_type_and_params = FunctionParameters<typeof myFunction_1>; // [[a: number, b: number], number]
type myFunction_2_type_and_params = FunctionParameters<typeof myFunction_2>; // [[a: any[]], string]
type myFunction_3_type_and_params = FunctionParameters<typeof myFunction_3>; // [[a: any[]], void]
type notFunction_type_and_params = FunctionResultType<0>; // never
