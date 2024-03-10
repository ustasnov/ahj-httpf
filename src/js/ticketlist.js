import Ticket from "./ticket";

export default class TicketList {
  constructor() {
    this.container = document.querySelector(".ticket-list-container");
    this.render();

    this.addTicketButton = this.container.querySelector(".btn-add-ticket");

    this.addTicketButton.addEventListener("click", (ev) => {
      const ticket = new Ticket(this.container);
      ticket.add();
    });

    this.loadTickets();

  }

  render() {
    this.container.innerHTML =
      `<div class="ticket-buttons">
        <button class="btn btn-add-ticket">Добавить тикет</button>
      </div>
      <div class="ticket-list"></div>`;
  }

  loadTickets() {

  }

  saveTickets() {

  }
}
