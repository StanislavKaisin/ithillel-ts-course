enum EmployeeStatus {
  Active,
  Inactive,
  OnUnpaidLeave,
}

enum EmployeeType {
  PreHiredEmployee,
  Employee,
}

class PreHiredEmployee {
  private firstName: string;
  private lastName: string;
  private salary: number;
  private bankAccountNumber: string;
  // Discriminant type
  discriminantType: EmployeeType = EmployeeType.PreHiredEmployee;

  constructor(
    firstName: string,
    lastName: string,
    salary: number,
    bankAccountNumber: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.salary = salary;
    this.bankAccountNumber = bankAccountNumber;
  }
  getFirstName(): string {
    return this.firstName;
  }
  getLastName(): string {
    return this.lastName;
  }
  getSalary(): number {
    return this.salary;
  }
  getBankAccountNumber(): string {
    return this.bankAccountNumber;
  }
  getDiscriminantType(): EmployeeType {
    return this.discriminantType;
  }
  setFirstName(firstName: string): void {
    this.firstName = firstName;
  }
  setLastName(lastName: string): void {
    this.lastName = lastName;
  }
  setSalary(salary: number): void {
    this.salary = salary;
  }
  setBankAccountNumber(bankAccountNumber: string): void {
    this.bankAccountNumber = bankAccountNumber;
  }
}

class Employee extends PreHiredEmployee {
  status: EmployeeStatus = EmployeeStatus.Active;
  departmentName: string | null = null;
  constructor(
    firstName: string,
    lastName: string,
    salary: number,
    bankAccountNumber: string,
    status: EmployeeStatus = EmployeeStatus.Active,
    departmentName: string | null = null
  ) {
    super(firstName, lastName, salary, bankAccountNumber);
    this.status = status;
    this.departmentName = departmentName;
    this.discriminantType = EmployeeType.Employee;
  }
  getStatus(): EmployeeStatus {
    return this.status;
  }
  getDepartment(): string | null {
    return this.departmentName;
  }
  setStatus(status: EmployeeStatus): void {
    this.status = status;
  }
  setDepartment(department: string | null): void {
    this.departmentName = department;
  }
}

function isEmployee(
  employee: Employee | PreHiredEmployee
): employee is Employee {
  return employee.discriminantType === EmployeeType.Employee;
}

class Department {
  private name: string;
  private domain: string;
  private budget: {
    debit: number;
    credit: number;
  };
  personnel: (Employee | PreHiredEmployee)[];

  constructor(name: string, domain: string) {
    this.name = name;
    this.domain = domain;
    this.personnel = [];
    this.budget = { debit: 0, credit: 0 };
  }

  getName(): string {
    return this.name;
  }
  getDomain(): string {
    return this.domain;
  }
  getPersonnel(): (Employee | PreHiredEmployee)[] {
    return this.personnel;
  }
  getBudget(): { debit: number; credit: number } {
    return this.budget;
  }

  setName(name: string): void {
    this.name = name;
  }
  setDomain(domain: string): void {
    this.domain = domain;
  }
  setPersonnel(personnel: (Employee | PreHiredEmployee)[]): void {
    this.personnel = personnel;
  }
  setBudget(budget: { debit: number; credit: number }): void {
    this.budget = budget;
  }

  calculateBalance(): number {
    return this.budget.credit - this.budget.debit;
  }

  addPersonnel(person: Employee | PreHiredEmployee): void {
    this.personnel.push(person);
    this.budget.debit = this.budget.debit + person.getSalary();
  }

  convertEmployee(preHiredEmployee: PreHiredEmployee): Employee | void {
    if (!isEmployee(preHiredEmployee)) {
      const employee = new Employee(
        preHiredEmployee.getFirstName(),
        preHiredEmployee.getLastName(),
        preHiredEmployee.getSalary(),
        preHiredEmployee.getBankAccountNumber(),
        EmployeeStatus.Active,
        this.name
      );
      this.removePersonnel(preHiredEmployee);
      this.addPersonnel(employee);
      return employee;
    }
    console.log(
      `Person ${preHiredEmployee.getFirstName()} is already an employee`
    );
  }

  removePersonnel(person: Employee | PreHiredEmployee): void {
    const personIndex = this.personnel.findIndex(
      (p) => JSON.stringify(p) === JSON.stringify(person)
    );
    if (personIndex !== -1) {
      this.personnel.splice(personIndex, 1);
      if (isEmployee(person)) {
        this.budget.debit = this.budget.debit - person.getSalary();
      }
    } else {
      throw new Error("Person not found in department");
    }
  }
}

enum PaymentType {
  External,
  Internal,
}

function isDepartment(
  entity: Employee | PreHiredEmployee | Department
): entity is Department {
  return entity.hasOwnProperty("domain");
}

class Accounting extends Department {
  private balance: number;

  constructor(name: string, domain: string) {
    super(name, domain);
    this.balance = 0;
  }
  getBalance(): number {
    return this.balance;
  }
  setBalance(balance: number): void {
    this.balance = balance;
  }

  takeOntoBalance(entity: Employee | PreHiredEmployee | Department): void {
    if (!isDepartment(entity)) {
      this.personnel.push(entity);
    } else if (isDepartment(entity)) {
      console.log(`Department ${entity.getName()} was added to balance`);
    } else {
      throw new Error("Invalid entity type for taking onto balance");
    }
  }

  removeFromBalance(entity: Employee | PreHiredEmployee | Department): void {
    if (!isDepartment(entity)) {
      this.removePersonnel(entity);
    } else if (isDepartment(entity)) {
      console.log(`Department ${entity.getName()} was removed from balance`);
    } else {
      throw new Error("Invalid entity type for removing from balance");
    }
  }

  processPayroll(): void {
    for (const person of this.personnel) {
      if (isEmployee(person)) {
        if (person.getStatus() === EmployeeStatus.Active) {
          this.makeInternalPayment(person.getSalary(), person.getFirstName());
        }
      } else {
        this.makeExternalPayment(person.getSalary(), person.getFirstName());
      }
    }
  }

  private makeInternalPayment(amount: number, name: string): void {
    if (this.balance >= amount) {
      this.balance = this.balance - amount;
      console.log(`Internal payment of ${amount} was made to employee ${name}`);
    } else {
      throw new Error("Insufficient balance for internal payment");
    }
  }

  private makeExternalPayment(amount: number, name: string): void {
    if (this.balance >= amount) {
      this.balance = this.balance - amount;
      console.log(
        `External payment of ${amount} was made to pre-hired employee ${name}`
      );
    } else {
      throw new Error("Insufficient balance for external payment");
    }
  }
}

class Company {
  private name: string;
  private departments: Department[];
  private preHiredEmployees: PreHiredEmployee[];
  private allPersonnel: (Employee | PreHiredEmployee)[];

  constructor(name: string) {
    this.name = name;
    this.departments = [];
    this.preHiredEmployees = [];
    this.allPersonnel = [];
  }
  getName(): string {
    return this.name;
  }
  getDepartments(): Department[] {
    return this.departments;
  }
  getPreHiredEmployees(): PreHiredEmployee[] {
    return this.preHiredEmployees;
  }
  getAllPersonnel(): Employee | PreHiredEmployee[] {
    return this.allPersonnel;
  }

  addDepartment(department: Department): void {
    this.departments.push(department);
  }
  addPreHiredEmployee(employee: PreHiredEmployee): void {
    this.preHiredEmployees.push(employee);
    this.allPersonnel.push(employee);
  }
  findDepartmentByName(name: string): Department | null {
    return (
      this.departments.find((department) => department.getName() === name) ||
      null
    );
  }
}
