import { IClient } from "./clients";

export interface IMediator {
  send(message: string, colleague: IColleague): void;
}

export interface IColleague {
  setMediator(mediator: IMediator): void;
  receive(message: string): void;
}

export class Mediator implements IMediator {
  private colleagues: IColleague[] = [];

  addColleague(colleague: IColleague): void {
    this.colleagues.push(colleague);
    colleague.setMediator(this);
  }

  send(message: string, sender: IColleague): void {
    for (const colleague of this.colleagues) {
      if (colleague !== sender) {
        colleague.receive(message);
      }
    }
  }
}

export interface IRepository<T extends { id: string }> {
  findById(id: string): T | null;
  findAll(): T[];
  create(item: T): T;
  update(id: string, data: Partial<T>): T | null;
  delete(id: string): T | undefined;
}

export class Repository<T extends { id: string }> implements IRepository<T> {
  private data: T[] = [];
  findById(id: string): T | null {
    return this.data.find((item) => item.id === id) || null;
  }
  findAll(): T[] {
    return this.data;
  }
  create(item: T): T {
    this.data.push(item);
    return item;
  }
  update(id: string, data: Partial<T>): T | null {
    const item = this.findById(id);
    if (item) {
      Object.assign(item, data);
      return item;
    }
    return null;
  }
  delete(id: string): T | undefined {
    const item = this.findById(id);
    if (item) {
      this.data = this.data.filter((item) => item.id !== id);
      return item;
    }
    return undefined;
  }
}

export interface INotificationService<T> {
  registerObserver(observer: T): void;
  removeObserver(observer: T): void;
  notifyObservers(message: string): void;
}

export class NotificationService implements INotificationService<IClient> {
  private observers: IClient[] = [];

  public registerObserver(observer: IClient): void {
    this.observers.push(observer);
  }

  public removeObserver(observer: IClient): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  public notifyObservers(message: string): void {
    this.observers.forEach((observer) => observer.getNotification(message));
  }
}
