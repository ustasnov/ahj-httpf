export default class Ticket {
  constructor(controller) {
    this.controller = controller;
  }

  addToContainer(container, data) {
    const el = document.createElement("div");
    el.classList.add("ticket");
    el.id = data.id;
    const element = container.appendChild(el);

    this.render(element, data);

    element.addEventListener("click", (ev) => {
      this.controller.getTicket(ev.currentTarget.id);
    });

    const statusButton = element.querySelector(".ticket-status");
    statusButton.addEventListener("click", (ev) => {
      const ticketEl = ev.currentTarget.closest(".ticket");
      this.controller.toggleTicketStatus(ticketEl.id);
    });

    const editButton = element.querySelector(".ticket-edit");
    editButton.addEventListener("click", (ev) => {
      const ticketEl = ev.currentTarget.closest(".ticket");
      const statusEl = ticketEl.querySelector(".ticket-status");
      const nameEl = ticketEl.querySelector(".ticket-name");
      const descEl = ticketEl.querySelector(".ticket-desc");
      const createdEl = ticketEl.querySelector(".ticket-created");
      const ticketData = {
        id: ticketEl.id,
        name: nameEl.textContent,
        description: descEl.textContent,
        status: statusEl.textContent == "&#10004" ? 1 : 0,
        created: createdEl.textContent,
      };
      this.controller.updateTicket(ticketData);
    });

    const deleteButton = element.querySelector(".ticket-delete");
    deleteButton.addEventListener("click", (ev) => {
      const ticketEl = ev.currentTarget.closest(".ticket");
      this.controller.deleteTicket(ticketEl.id);
    });
  }

  render(el, data) {
    el.innerHTML = `<button class="row-btn ticket-status">${
      data.status === 1 ? "&#10004" : ""
    }</button>
      <div class="desc-container">
        <div class="ticket-name ticket-text">${data.name}</div>
        <div class="ticket-desc ticket-text hidden">${data.description}</div>
      </div>
      <div class="ticket-created">${data.created}</div>
      <button class="row-btn ticket-edit">&#9998</button>
      <button class="row-btn ticket-delete">&#10005</button>`;
  }
}
