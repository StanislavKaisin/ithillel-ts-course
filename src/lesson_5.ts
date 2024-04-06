abstract class Shape {
  public abstract calculateArea(): number;

  public readonly color: string;
  public readonly name: string;

  public constructor(name: string, color: string) {
    this.name = name;
    this.color = color;
  }
}

interface ObjectWithPrintFunction {
  print(): void;
}

class Circle extends Shape {
  private _radius: number;

  constructor(name: string, color: string) {
    super(name, color);
    this._radius = 0;
  }

  public calculateArea(): number {
    return Math.PI * this._radius ** 2;
  }

  get sideA(): number {
    return this._radius;
  }

  set radius(value: number) {
    this._radius = value;
  }
}

const circle = new Circle("circle", "blue");
circle.radius = 1;
circle.calculateArea();
console.log("circle area :>> ", circle.calculateArea());

class Square extends Shape implements ObjectWithPrintFunction {
  private _sideA: number;

  constructor(name: string, color: string) {
    super(name, color);
    this._sideA = 0;
  }

  public calculateArea(): number {
    return this.sideA ** 2;
  }

  print(): void {
    console.log(
      `Area formula for square with ${
        this.name
      } name is sideA ** 2 = ${this.calculateArea()}`
    );
  }

  get sideA(): number {
    return this._sideA;
  }

  set sideA(value: number) {
    this._sideA = value;
  }
}

const square = new Square("square", "red");
square.sideA = 10;
square.calculateArea();
square.print();
console.log("square area :>> ", square.calculateArea());

class Rectangle extends Shape implements ObjectWithPrintFunction {
  private _sideA: number;
  private _sideB: number;

  constructor(name: string, color: string) {
    super(name, color);
    this._sideA = 0;
    this._sideB = 0;
  }

  public calculateArea(): number {
    return this._sideA * this._sideB;
  }

  print(): void {
    console.log(
      `Area formula for rectangle with ${
        this.name
      } name is: sideA * sideB = ${this.calculateArea()}`
    );
  }

  get sideA(): number {
    return this._sideA;
  }
  get sideB(): number {
    return this._sideB;
  }
  set sideA(value: number) {
    this._sideA = value;
  }
  set sideB(value: number) {
    this._sideB = value;
  }
}

const rectangle = new Rectangle("rectangle", "green");
rectangle.sideA = 10;
rectangle.sideB = 20;
rectangle.calculateArea();
rectangle.print();
console.log("rectangle area :>> ", rectangle.calculateArea());

class Triangle extends Shape {
  private _sideA: number;
  private _sideB: number;

  constructor(name: string, color: string) {
    super(name, color);
    this._sideA = 0;
    this._sideB = 0;
  }

  public calculateArea(): number {
    return 0.5 * this._sideA * this._sideB;
  }

  get sideA(): number {
    return this._sideA;
  }
  get sideB(): number {
    return this._sideB;
  }
  set sideA(value: number) {
    this._sideA = value;
  }
  set sideB(value: number) {
    this._sideB = value;
  }
}

const traingle = new Triangle("triangle", "yellow");
traingle.sideA = 10;
traingle.sideB = 20;
traingle.calculateArea();
console.log("square triangle area :>> ", traingle.calculateArea());
