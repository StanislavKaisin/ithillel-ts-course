import { IDB_item } from "./db";
import { ITicket, TicketType } from "./tickets";

export interface IClient extends IDB_item {
  name: string;
  age: number;
  phone: string;
  email: string;
  ticketId?: string;
  buyTicket(ticket: ITicket): void;
  getNotification(message: string): void;
}

export interface IVisitor extends Partial<IClient> {
  ticketType: TicketType;
  ticketId: string;
}

export class Client implements IClient {
  public id: string;
  public name: string;
  public age: number;
  public phone: string;
  public email: string;
  public ticketType: TicketType | undefined;
  public ticketId: string | undefined;

  constructor(name: string, age: number, phone: string, email: string) {
    this.name = name;
    this.age = age;
    this.phone = phone;
    this.email = email;
    this.id = window.crypto.randomUUID();
  }

  buyTicket(ticket: ITicket): void {
    this.ticketType = ticket.type;
    this.ticketId = ticket.id;
  }
  getNotification(message: string) {
    console.log(`${this.name} got ${message}`);
  }
}

export class Visitor extends Client implements IVisitor {
  public ticketType: TicketType;
  declare ticketId: string;
  constructor(
    ticketType: TicketType,
    name?: string,
    age?: number,
    phone?: string,
    email?: string
  ) {
    super(name || "", age || 0, phone || "", email || "");
    this.ticketType = ticketType;
    this.id = window.crypto.randomUUID();
  }
  buyTicket(ticket: ITicket): void {
    this.ticketType = ticket.type;
    this.ticketId = ticket.id;
  }
}
