import { IDB_item } from "./db";

export type TicketType = "family" | "adult" | "child";

export enum TicketPrice {
  family = 50,
  adult = 30,
  child = 20,
}

export interface ITicket extends IDB_item {
  type: TicketType;
  price: number;
  date: Date;
  finished: boolean;
}

export class Ticket implements ITicket {
  type: TicketType;
  id: string;
  price: number;
  date: Date;
  finished: boolean = false;
  constructor(type: TicketType, price: number) {
    this.type = type;
    this.price = price;
    this.date = new Date();
    this.id = window.crypto.randomUUID();
  }
  getPrice(): number {
    return this.price;
  }
  finish(): void {
    console.log("Ticket finished");
    if (new Date() > this.date) this.finished = true;
  }
}
