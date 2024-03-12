import TicketForm from "./ticketform";

export default class TicketListForm {
  constructor(controller) {
    this.controller = controller;
    this.ticketForm = new TicketForm(controller);

    this.container = document.querySelector(".ticket-list-container");
    this.render();

    this.addTicketButton = this.container.querySelector(".btn-add-ticket");
    this.addTicketButton.addEventListener("click", (ev) => {
      this.ticketForm.show(null);
    });

    this.controller.getAllTickets();
  }

  render() {
    this.container.innerHTML =
      `<div class="ticket-buttons">
        <button class="btn btn-add-ticket">Добавить тикет</button>
      </div>
      <div class="ticket-list"></div>`;
  }

}
