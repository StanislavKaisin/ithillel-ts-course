import { IDB_item } from "./db";

export enum EmployeeRole {
  manager = "manager",
  veterinarian = "veterinarian",
  zookeeper = "zookeeper",
}

export interface IEmployee extends IDB_item {
  role: EmployeeRole;
  name: string;
  department: string;
  salary: number;
  getSalary: (amount: number) => void;
  feedAnimal: (feed: string) => void;
}

export class Employee implements IEmployee {
  id: string;
  name: string;
  role: EmployeeRole;
  department: string;
  salary: number;
  constructor(
    name: string,
    role: EmployeeRole,
    department: string,
    salary: number
  ) {
    this.name = name;
    this.role = role;
    this.department = department;
    this.salary = salary;
    this.id = window.crypto.randomUUID();
  }
  getSalary(amount: number): void {
    console.log(`${this.name} got ${amount} salary`);
  }
  feedAnimal(feed: string): void {
    console.log(`${this.name} fed animal with ${feed}`);
  }
}
