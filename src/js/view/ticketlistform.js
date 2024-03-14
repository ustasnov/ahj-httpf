import TicketForm from "./ticketform";
import Ticket from "./ticket";

export default class TicketListForm {
  constructor(controller) {
    this.controller = controller;
    this.ticket = new Ticket(controller);
    this.ticketForm = new TicketForm(controller);

    this.container = document.querySelector(".ticket-list-container");
    this.render();

    this.ticketListEl = document.querySelector(".ticket-list");

    controller.subscribe(this.ticketListEl, "refresh");
    this.ticketListEl.addEventListener("refresh", (ev) => {
      this.ticketListEl.innerHTML = "";

      Array.from(ev.detail.data).forEach((ticketData) => {
        this.ticket.addToContainer(this.ticketListEl, ticketData);
      });
      //alert("Ticket list updated on server");
    });

    controller.subscribe(this.ticketListEl, "refreshTicket");
    this.ticketListEl.addEventListener("refreshTicket", (ev) => {
      const ticketEl = document.getElementById(ev.detail.data.id);
      if (ticketEl) {
        let ticketDescEl = ticketEl.querySelector(".ticket-desc");
        const isHidden = ticketDescEl.classList.contains("hidden");
        this.ticket.render(ticketEl, ev.detail.data);
        ticketDescEl = ticketEl.querySelector(".ticket-desc");
        if (isHidden) {
          console.log("remove hidden");
          ticketDescEl.classList.remove("hidden");
        } else {
          console.log("add hidden");
          ticketDescEl.classList.add("hidden");
        }
      }
    });

    this.addTicketButton = this.container.querySelector(".btn-add-ticket");
    this.addTicketButton.addEventListener("click", () => {
      this.ticketForm.show(null);
    });

    this.controller.getAllTickets();
  }

  render() {
    this.container.innerHTML = `<div class="ticket-buttons">
        <button class="btn btn-add-ticket">Добавить тикет</button>
      </div>
      <div class="ticket-list"></div>`;
  }
}
