export default class TicketForm {
  constructor(controller) {
    this.controller = controller;
    this.formContainer = null;
    this.data = null;
  }

  getTicketFormHTML() {
    const action = this.data.id ? "Редактировать" : "Добавить";
    const text = `<form class="ticket-form">
        <div class="ticket-form-title">${action} тикет</div>
        <label for="description" class="label">Краткое описание:</label>
        <textarea id="description" name="name" class="input" rows="2" required>${this.data.name}</textarea>
        <label for="fulldescription" class="label">Подробное описание:</label>
        <textarea id="fulldescription" name="description" class="input" rows="3">${this.data.description}</textarea>
        <div class="ticket-buttons">
          <button type="button" class="btn btn-ok">ОК</button>
          <button type="button" class="btn btn-cancel">Отмена</button>
        </div>
      </form>`;

    return text;
  }

  show(id) {
    this.data = { id: id, name: "", description: "" };
    if (id) {
      this.data = this.controller.getTicket(id);
    }
    this.formContainer = document.querySelector(".ticket-form-container");
    if (!this.formContainer) {
      const body = document.querySelector("body");
      const formContainer = document.createElement("div");
      formContainer.classList.add("ticket-form-container");
      formContainer.innerHTML = this.getTicketFormHTML();
      this.formContainer = body.appendChild(formContainer);
      const nameField = document.getElementById("description");
      nameField.focus();
      const descriptionField = document.getElementById("fulldescription");

      const okButton = this.formContainer.querySelector(".btn-ok");
      okButton.addEventListener("click", (ev) => {
        ev.preventDefault();
        if (nameField.value.trim() !== "") {
          const formEl = document.querySelector(".ticket-form");
          const formData = new FormData(formEl);
          if (id) {
            this.controller.updateTicket(formData);
            /*
              {
              id: this.id,
              name: nameField.value,
              description: descriptionField.value,
              }
            */
          } else {
            this.controller.createTicket(formData);
            /*
              {
              name: nameField.value,
              description: descriptionField.value,
              }
            */
          }
          body.removeChild(this.formContainer);
        } else {
          alert("Не заполнено краткое описание!");
        }
      });

      const cancelButton = this.formContainer.querySelector(".btn-cancel");
      cancelButton.addEventListener("click", (ev) => {
        ev.preventDefault();
        body.removeChild(this.formContainer);
      });
    }
  }
}
