export default class TicketListModel {
  constructor() {
    this.tickets = [];
    this.subscribers = new Map();
  }

  subscribe(el, ev) {
    if (this.subscribers.has(ev)) {
      const arr = this.subscribers.get(ev);
      if (arr.indexOf(el) == -1) {
        arr.push(el);
      }
    } else {
      const arr = [el];
      this.subscribers.set(ev, arr);
    }
  }

  notify(ev) {
    if (this.subscribers.has(ev)) {
      Array.from(this.subscribers.get(ev)).forEach(el => {
        el.dispatchEvent(new CustomEvent(ev, {detail: {data: this.tickets}}));  
      });
    }
  }


  getTicket(id) {
    
  }

  getAllTickets() {
    this.notify("refresh");  
  }

  createTicket(data) {

  }

  updateTicket(data) {

  }

  deleteTicket(id) {

  }
}