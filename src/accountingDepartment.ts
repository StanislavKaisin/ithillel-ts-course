import { DB, IDB_item } from "./db";

export class Payment implements IDB_item {
  id: string;
  amount: number;
  date: Date;
  description: string = "";
  constructor(amount: number, description: string) {
    this.amount = amount;
    this.date = new Date();
    this.id = window.crypto.randomUUID();
    this.description = description;
  }
}

export interface IAccountingDepartment {
  calculateIncome(day: Date): void;
  makePayment(amount: number, description: string): void;
  paySalary(): void;
  payZooMaintenance(maintenance: number): void;
  makeFinancialReport(): string;
}

export class AccountingDepartment implements IAccountingDepartment {
  private db: DB;
  private income!: Income;
  private budget!: Budget;

  constructor(db: DB, income: Income, budget: Budget) {
    this.db = db;
    this.income = income;
    this.budget = budget;
  }
  calculateIncome(day: Date): void {
    const income = this.income.calculateIncome(day);
    this.budget.updateDebit(income);
  }

  makePayment(amount: number, description: string): void {
    const payment = new Payment(amount, description);
    this.budget.updateCredit(amount);
    this.db.payments.create(payment);
  }

  paySalary(): void {
    const employees = this.db.employees.findAll();
    employees.forEach((employee) => {
      const salary = employee.salary;
      this.budget.updateCredit(salary);
      this.db.payments.create(
        new Payment(salary, `Salary for ${employee.name}`)
      );
    });
  }

  buyFeed(): void {
    const animals = this.db.animals.findAll();
    animals.forEach((animal) => {
      const feed = animal.feedPrice;
      this.budget.updateCredit(feed);
      this.db.payments.create(new Payment(feed, `Feed for ${animal.name}`));
    });
  }

  payZooMaintenance(maintenance: number): void {
    this.budget.updateCredit(maintenance);
    this.db.payments.create(new Payment(maintenance, "Zoo maintenance"));
  }

  makeFinancialReport(): string {
    const balance = this.budget.calculateBalance();
    return `Financial report: ${balance} on date ${
      new Date().toLocaleDateString
    }`;
  }
}

export class Income {
  private db: DB;
  constructor(db: DB) {
    this.db = db;
  }
  calculateIncome(day: Date): number {
    return this.db.tickets.findAll().reduce((acc, ticket) => {
      if (ticket.date.getDate() !== day.getDate()) return acc;
      return acc + ticket.price;
    }, 0);
  }
}

export interface IBudget {
  credit: number;
  debit: number;
  updateCredit(credit: number): void;
  updateDebit(debit: number): void;
  calculateBalance(): number;
}

export class Budget implements IBudget {
  public credit: number;
  public debit: number;
  constructor(credit: number, debit: number) {
    this.credit = credit;
    this.debit = debit;
  }
  updateCredit(credit: number): void {
    this.credit = this.credit + credit;
  }
  updateDebit(debit: number): void {
    this.debit = this.debit + debit;
  }
  calculateBalance(): number {
    return this.credit - this.debit;
  }
}
