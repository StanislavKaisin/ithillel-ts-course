import { IClient, IVisitor, Visitor } from "./clients";
import { DB } from "./db";
import { Ticket, TicketPrice, TicketType } from "./tickets";
import { NotificationService } from "./utils";

export interface ICacheDesk {
  sellTickets(ticketType: TicketType, data: IVisitor): void;
  sendNotification(): void;
  checkClosingTime(): void;
  sendNotification(): void;
  dailyClients: IClient[];
}

export class CacheDesk implements ICacheDesk {
  private closingTime = "20:00";
  private db: DB;
  private notificationService: NotificationService;
  public dailyClients: IClient[] = [];

  constructor(db: DB, notificationService: NotificationService) {
    this.db = db;
    this.notificationService = notificationService;
  }

  public sellTickets(ticketType: TicketType, data: IVisitor): void {
    const ticket = new Ticket(ticketType, TicketPrice[ticketType]);
    this.db.tickets.create(ticket);
    const clients = this.db.clients.findAll();
    if (clients.length > 0 && data.phone && data.phone.trim().length > 0) {
      const client = clients.find((client) => client.phone === data.phone);
      if (client) {
        client.ticketId = ticket.id;
        this.notificationService.registerObserver(client);
        this.dailyClients.push(client);
      } else {
        const visitor = new Visitor(
          ticket.type,
          data.name,
          data.age,
          data.phone,
          data.email
        );
        this.db.visitors.create(visitor);
        this.notificationService.registerObserver(visitor);
        this.dailyClients.push(visitor);
      }
    }
  }

  public checkClosingTime() {
    const now = new Date();
    const closingTime = new Date();
    closingTime.setHours(
      parseInt(this.closingTime.split(":")[0]),
      parseInt(this.closingTime.split(":")[1])
    );
    const closingTimeDiff =
      new Date(this.closingTime).getTime() - now.getTime();
    if (closingTimeDiff <= 15 * 60 * 1000) {
      this.notificationService.notifyObservers("Closing time is over");
    }
    if (closingTimeDiff <= 0) {
      this.dailyClients.forEach((client) => {
        this.notificationService.removeObserver(client);
      });
      this.dailyClients = [];
    }
  }

  public sendNotification(): void {
    setInterval(() => this.checkClosingTime(), 15 * 60 * 1000);
  }
}
