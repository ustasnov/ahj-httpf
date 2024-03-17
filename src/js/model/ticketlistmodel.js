export default class TicketListModel {
  constructor(serverUrl) {
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

  sendQuery(method, params, event, data = null) {
    const notifyFunc = this.notify.bind(this);
    const xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function () {
      if (xhr.readyState !== 4) {
        return;
      }
      const data = JSON.parse(xhr.responseText);
      switch (data.result) {
        case 0:
          notifyFunc(event, data.data);
          break;
        case 1:
          notifyFunc(
            "error",
            `Тикет не найден на сервере. 
            Возможно он удален другим пользователем. Обновить список тикетов?`
          );
          break;
        default:
          break;
      }
    };

    xhr.open(method, `${this.host}?${params}`);
    if (data) {
      xhr.send(data);
    } else {
      xhr.send();
    }
  }

  getTicket(id) {
    this.sendQuery("GET", `method=ticketById&id=${id}`, "refreshTicket");
  }

  getAllTickets() {
    this.sendQuery("GET", "method=allTickets", "refresh");
  }

  createTicket(data) {
    this.sendQuery("POST", "method=createTicket", "refreshTicket", data);
  }

  toggleTicketStatus(id) {
    const data = new FormData();
    data.append("id", id);
    this.sendQuery("POST", "method=toggleTicketStatus", "updateTicket", data);
  }

  updateTicket(data) {
    this.sendQuery("POST", "method=updateTicket", "updateTicket", data);
  }

  deleteTicket(id) {
    this.sendQuery("DELETE", `method=deleteTicket&id=${id}`, "deleteTicket");
  }
}
