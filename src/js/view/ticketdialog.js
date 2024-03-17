import MessageDialog from "./messagedialog";

export default class TicketDialog {
  constructor(controller) {
    this.controller = controller;
    this.formContainer = null;
    this.data = null;
  }

  getTicketFormHTML() {
    const action = this.data ? "Изменить" : "Добавить";
    const text = `<form class="ticket-form">
        <div class="ticket-form-title">${action} тикет</div>
        <label for="description" class="label">Краткое описание:</label>
        <textarea id="description" name="name" class="input" rows="2" required></textarea>
        <label for="fulldescription" class="label">Подробное описание:</label>
        <textarea id="fulldescription" name="description" class="input" rows="3"></textarea>
        <div class="ticket-buttons">
          <button type="button" class="btn btn-ok">ОК</button>
          <button type="button" class="btn btn-cancel">Отмена</button>
        </div>
      </form>`;

    return text;
  }

  show(data) {
    this.data = data;
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

      if (this.data) {
        nameField.value = this.data.name;
        descriptionField.value = this.data.description;
      }

      const okButton = this.formContainer.querySelector(".btn-ok");
      okButton.addEventListener("click", (ev) => {
        ev.preventDefault();
        if (nameField.value.trim() !== "") {
          const formEl = document.querySelector(".ticket-form");
          const formData = new FormData(formEl);
          if (this.data) {
            formData.append("id", this.data.id);
            formData.append("status", this.data.status);
            formData.append("created", this.data.created);
            this.controller.updateTicket(formData);
          } else {
            this.controller.createTicket(formData);
          }
          body.removeChild(this.formContainer);
        } else {
          new MessageDialog(
            "message",
            "Не заполнено краткое описание!",
            "Надо исправить"
          ).show();
        }
        ev.stopPropagation();
      });

      const cancelButton = this.formContainer.querySelector(".btn-cancel");
      cancelButton.addEventListener("click", (ev) => {
        ev.preventDefault();
        body.removeChild(this.formContainer);
        ev.stopPropagation();
      });
    }
  }
}
