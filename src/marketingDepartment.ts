import { Client } from "./clients";
import { DB } from "./db";
import { IColleague, Mediator, NotificationService } from "./utils";

export interface IMarketingDepartment {
  notifyClients(notificationType: MarketingNotificationType): void;
  performMarketingEvent(): void;
  performPromotionalEvent(): void;
}

export enum MarketingNotificationType {
  news = "news",
  marketingMessage = "marketing message",
}

export class MarketingDepartment implements IMarketingDepartment, IColleague {
  private mediator: Mediator | undefined;
  private db: DB;
  private notificationService: NotificationService;
  private clients: Client[] = [];
  private administrationMessage: string = "";
  constructor(db: DB, notificationService: NotificationService) {
    this.db = db;
    this.clients = this.db.clients.findAll();
    this.notificationService = notificationService;
    this.clients.forEach((client) => {
      this.notificationService.registerObserver(client);
    });
  }
  setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }

  send(message: string): void {
    console.log(`ColleagueA sends: ${message}`);
    this.mediator && this.mediator.send(message, this);
  }

  receive(message: string): void {
    console.log(`ColleagueA receives: ${message}`);
    this.administrationMessage = message;
  }

  notifyClients(): void {
    if (!this.administrationMessage) {
      console.log("No message to notify");
      return;
    }
    this.clients.forEach(() => {
      this.notificationService.notifyObservers(this.administrationMessage);
    });
  }

  performPromotionalEvent(): void {
    console.log("Promotional event");
    this.notifyClients();
    this.send("Promotional event performed");
  }

  performMarketingEvent(): void {
    console.log("Marketing event");
    this.notifyClients();
    this.send("Marketing event performed");
  }
}
