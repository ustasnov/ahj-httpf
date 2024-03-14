export default class TicketListModel {
  constructor(serverUrl) {
    this.tickets = [];
    this.subscribers = new Map();
    this.host = serverUrl;
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

  notify(ev, evData) {
    if (this.subscribers.has(ev)) {
      Array.from(this.subscribers.get(ev)).forEach((el) => {
        el.dispatchEvent(new CustomEvent(ev, { detail: { data: evData } }));
      });
    }
  }

  getTicket(id) {
    const notifyFunc = this.notify.bind(this);
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) {
        return;
      }
      const ticket = JSON.parse(xhr.responseText);
      notifyFunc("refreshTicket", ticket);
    };

    xhr.open("GET", `${this.host}?method=ticketById&id=${id}`);
    xhr.send();
  }

  getAllTickets() {
    const notifyFunc = this.notify.bind(this);
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) {
        return;
      }
      this.tickets = JSON.parse(xhr.responseText);
      notifyFunc("refresh", this.tickets);
    };

    xhr.open("GET", `${this.host}?method=allTickets`);
    xhr.send();
  }

  createTicket(data) {
    const notifyFunc = this.notify.bind(this);
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) {
        return;
      }
      const ticket = JSON.parse(xhr.responseText);
      notifyFunc("refreshTicket", ticket);
    };

    xhr.open("POST", `${this.host}?method=createTicket`);
    xhr.send(data);
  }

  toggleTicketStatus(id) {}

  updateTicket(data) {}

  deleteTicket(id) {}
}
