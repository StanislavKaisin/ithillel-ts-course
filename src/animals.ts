import { IDB_item } from "./db";

export interface IAnimal extends IDB_item {
  kind: string;
  name: string;
  age: number;
  health: AnimalHealthState;
  feed: string;
  eatSomething: (feed: string) => void;
  feedPrice: number;
}

export type AnimalHealthState = "excellent" | "good" | "bad" | "very bad";

export interface IAnimals {
  animalsList: IAnimal[];
}

export class Animal implements IAnimal {
  public kind: string;
  public name: string;
  public age: number;
  public health: AnimalHealthState;
  public feed: string;
  public feedPrice: number;
  public id: string;
  constructor(
    kind: string,
    name: string,
    age: number,
    feed: string,
    feedPrice: number,
    health: AnimalHealthState
  ) {
    this.kind = kind;
    this.name = name;
    this.age = age;
    this.health = health;
    this.feed = feed;
    this.id = window.crypto.randomUUID();
    this.feedPrice = feedPrice;
  }

  public eatSomething(feed: string): void {
    if (feed !== this.feed) {
      throw new Error("Wrong feed");
    }
    console.log(`${this.name} eat ${feed}`);
  }
}
