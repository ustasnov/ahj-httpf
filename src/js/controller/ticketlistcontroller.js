export default class TicketListController {
  constructor(model) {
    this.model = model;
  }

  subscribe(el, ev) {
    this.model.subscribe(el, ev);
  }

  getTicket(id) {
    return this.model.getTicket(id);
  }

  getAllTickets() {
    return this.model.getAllTickets();
  }

  createTicket(data) {
    this.model.createTicket(data);
  }

  updateTicket(data) {
    const ticketData = this.getTicket(data.id);
    if (ticketData && (ticketData.name != data.name || ticketData.description != data.description)) {
      this.model.updateTicket(data);
    }
  }

  deleteTicket(id) {
    this.model.deleteTicket(id);
  }
}
