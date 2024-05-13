// 1 =====================================================================
interface IDeprecationReason {
  reason: string;
  replaceMethod?: string;
}

function DeprecatedMethodWithReason(reason: IDeprecationReason) {
  return function DeprecatedMethod<T, A extends any[], R>(
    originalMethod: (...args: A) => R,
    context: ClassMethodDecoratorContext<T, (...args: A) => R>
  ) {
    if (context.kind !== "method") throw new Error("Method-only decorator");

    function replacementMethod(this: T, ...args: A): R {
      console.warn(
        `${String(
          context.name
        )} is deprecated and will be removed in a future version, becoause of the ${
          reason.reason
        }.`
      );

      if (reason.replaceMethod) {
        console.warn(`Please use ${reason.replaceMethod} instead.`);
      }
      return originalMethod.apply(this, args);
    }
    return replacementMethod;
  };
}

class ClassWithDeprecatedMethod {
  @DeprecatedMethodWithReason({
    reason: "some important reason",
    replaceMethod: "another cool method",
  })
  public someMethod(value: string): void {
    console.log("value :>> ", value);
  }
}

const objectWithDeprecatedMethod = new ClassWithDeprecatedMethod();
objectWithDeprecatedMethod.someMethod("some value"); //logs: someMethod is deprecated and will be removed in a future version, becoause of the some important reason.
//logs: Please use another cool method instead.
// logs: value :>> some value

// 2 =====================================================================
const MAX_LENGTH = 5;
const MIN_LENGTH = 3;

function maxLength<T, A extends any[], R>(
  originalMethod: (...args: A) => R,
  context: ClassMethodDecoratorContext<T, (...args: A) => R>
) {
  if (context.kind !== "method") throw new Error("Method-only decorator");
  function replacementMethod(this: T, ...args: A): R {
    // console.log("I am maxLength decorator");
    if (args[0] === undefined || typeof args[0] !== "string") {
      console.warn("Value should be defined and string!");
    }
    if (args[0].length > MAX_LENGTH) {
      console.warn(`Value should be less than ${MAX_LENGTH} characters!`);
    }
    return originalMethod.apply(this, args);
  }
  return replacementMethod;
}

function minLength<T, A extends any[], R>(
  originalMethod: (...args: A) => R,
  context: ClassMethodDecoratorContext<T, (...args: A) => R>
) {
  if (context.kind !== "method") throw new Error("Method-only decorator");
  function replacementMethod(this: T, ...args: A): R {
    // console.log("I am minLength decorator");
    if (args[0] === undefined || typeof args[0] !== "string") {
      console.warn("Value should be defined and string!");
    }
    if (args[0].length < MIN_LENGTH) {
      console.warn(`Value should be more than ${MIN_LENGTH} characters!`);
    }
    return originalMethod.apply(this, args);
  }
  return replacementMethod;
}

function isEmail<T, A extends any[], R>(
  originalMethod: (...args: A) => R,
  context: ClassMethodDecoratorContext<T, (...args: A) => R>
) {
  if (context.kind !== "method") throw new Error("Method-only decorator");
  function replacementMethod(this: T, ...args: A): R {
    // console.log("I am isEmail decorator");
    if (args[0] === undefined || typeof args[0] !== "string") {
      console.warn("Value should be defined and string!");
    }
    const emailRegex =
      /^[\w!#$%&'*+/=?^`{|}~-]+(?:\.[\w!#$%&'*+/=?^`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/;
    if (!emailRegex.test(args[0])) {
      console.warn(`Value should be an email!`);
    }
    return originalMethod.apply(this, args);
  }
  return replacementMethod;
}

class SomeClass {
  @maxLength
  @minLength
  @isEmail
  public someMethod(value: string): void {
    console.log("value :>> ", value);
  }
}

const someObject = new SomeClass();

someObject.someMethod("12"); // logs: Value should be more than 3 characters!
// logs: Value should be an email!

someObject.someMethod("12@bom.bom"); // logs: Value should be less than 5 characters!
// logs: value :>>  12@bom.bom
