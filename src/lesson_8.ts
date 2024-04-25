// 1 ================================

function filterArray<T>(
  array: Array<T>,
  condition: (element: T) => boolean
): T[] {
  let result: T[] = [];

  for (let index: number = 0; index < array.length; index++) {
    const element: T = array[index];
    if (condition(element)) {
      result.push(element);
    }
  }
  return result;
}

// 2 ================================

class Stack<T> {
  private _stack: Array<T> = [];

  push(element: T): void {
    this._stack.push(element);
  }

  pop(): T | undefined {
    return this._stack.pop();
  }

  peek(): T | undefined {
    return this._stack[this._stack.length - 1];
  }

  get length(): number {
    return this._stack.length;
  }
}

const stack = new Stack<string>();
stack.push("a");
stack.push("b");
stack.push("c");

console.log(stack.peek()); //c
console.log(stack.pop()); //c
console.log("stack.length :>> ", stack.length); //2

// 3 ================================
type K = string | number | symbol;

class Dictionary<K, V> {
  private _dictionary: Map<K, V> = new Map<K, V>();

  private isValidKey(key: K): boolean {
    return (
      typeof key === "string" ||
      typeof key === "number" ||
      typeof key === "symbol"
    );
  }

  set(key: K, value: V): void {
    if (!this.isValidKey(key)) {
      throw new Error("Invalid key type provided");
    }
    this._dictionary.set(key, value);
  }

  get(key: K): V | undefined {
    if (!this.isValidKey(key)) {
      throw new Error("Invalid key type provided");
    }
    return this._dictionary.get(key);
  }

  has(key: K): boolean {
    if (!this.isValidKey(key)) {
      throw new Error("Invalid key type provided");
    }
    return this._dictionary.has(key);
  }
}

const dictionary = new Dictionary<K, any>();

dictionary.set("a", 1);
console.log(dictionary.get("a")); //1
console.log(dictionary.has("a")); //true
console.log(dictionary.get("b")); //undefined
console.log(dictionary.has("b")); //false

dictionary.set([0, 1], "a"); // error
console.log(dictionary.get([0, 1])); //error
console.log(dictionary.has([0, 1])); //error
