import { Payment } from "./accountingDepartment";
import { Animal } from "./animals";
import { Client, Visitor } from "./clients";
import { Employee } from "./employees";
import { Ticket } from "./tickets";
import { Repository } from "./utils";

export interface IDB_item {
  id: string;
}

export class DB {
  private static instance: DB;
  public tickets: Repository<Ticket> = new Repository<Ticket>();
  public visitors: Repository<Visitor> = new Repository<Visitor>();
  public clients: Repository<Client> = new Repository<Client>();
  public payments: Repository<Payment> = new Repository<Payment>();
  public employees: Repository<Employee> = new Repository<Employee>();
  public animals: Repository<Animal> = new Repository<Animal>();

  public static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB();
    }
    return DB.instance;
  }
}

export const db = DB.getInstance();
