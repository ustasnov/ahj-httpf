export default class TicketListModel {
  constructor() {
    this.tickets = [
      { id: 1, name: "Задание 1", description: "Полное описание задания 1", status: 1, created: "10.04.24 10:00" },
      { id: 1, name: "Задание 2", description: "Полное описание задания 2", status: 0, created: "11.04.24 12:00" },
      { id: 1, name: "Задание 3", description: "Полное описание задания 3", status: 0, created: "13.04.24 14:00" }
    ];
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
        el.dispatchEvent(new CustomEvent(ev, { detail: { data: this.tickets } }));
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

  toggleTicketStatus(id) {

  }

  updateTicket(data) {

  }

  deleteTicket(id) {

  }
}