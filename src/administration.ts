import { Animal, IAnimal } from "./animals";
import { DB } from "./db";
import { Employee, IEmployee } from "./employees";
import { MarketingNotificationType } from "./marketingDepartment";
import { IColleague, Mediator } from "./utils";

export interface IAdministration {
  employees: Employee[];
  animals: Animal[];

  addEmployee(employee: IEmployee): void;
  removeEmployee(employee: IEmployee): void;

  addAnimal(animal: IAnimal): void;
  removeAnimate(animal: IAnimal): void;

  generateNewsMessage(): string;
  generateMarketingMessage(): string;
}

export class Administration implements IAdministration, IColleague {
  private mediator: Mediator | undefined;
  private db: DB;
  public employees: Employee[] = [];
  public animals: Animal[] = [];
  private administrationMessage: string = "";

  constructor(db: DB) {
    this.db = db;
    this.employees = db.employees.findAll();
    this.animals = db.animals.findAll();
  }

  public addEmployee(employee: IEmployee): void {
    this.db.employees.create(employee);
  }
  public removeEmployee(employee: IEmployee): void {
    this.db.employees.delete(employee.id);
  }
  public addAnimal(animal: IAnimal): void {
    this.db.animals.create(animal);
  }
  public removeAnimate(animal: IAnimal): void {
    this.db.animals.delete(animal.id);
  }

  public generateNewsMessage() {
    return "some News Message";
  }

  public generateMarketingMessage() {
    return "some Marketing Message";
  }

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }

  public createMessage(messageType: MarketingNotificationType) {
    this.administrationMessage =
      messageType === MarketingNotificationType.news
        ? this.generateNewsMessage()
        : this.generateMarketingMessage();
    this.send(this.administrationMessage);
  }

  public send(message: string): void {
    console.log(`ColleagueA sends: ${message}`);
    this.mediator && this.mediator.send(message, this);
  }

  public receive(message: string): void {
    console.log(`ColleagueA receives: ${message}`);
  }
}
