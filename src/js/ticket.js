export default class Ticket {
  constructor(container) {
    this.init(null);
    this.container = container;
    this.formContainer = null;
  }

  init(data) {
    if (data) {
      this.id = data.id;
      this.name = data.name;
      this.description = data.description;
      this.status = data.status;
      this.created = data.created;
    } else {
      this.id = null;
      this.name = "";
      this.description = "";
      this.status = 0;
      this.created = "";
    }
  }

  getTicketFormHTML(action) {
    const text = `<form class="ticket-form">
        <div class="ticket-form-title">${action} тикет</div>
        <label for="description" class="label">Краткое описание:</label>
        <textarea id="description" name="ticket-description" class="input" rows="2" required></textarea>
        <label for="fulldescription" class="label">Подробное описание:</label>
        <textarea id="fulldescription" name="ticket-full-description" class="input" rows="3"></textarea>
        <div class="ticket-buttons">
          <button type="button" class="btn btn-ok">ОК</button>
          <button type="button" class="btn btn-cancel">Отмена</button>
        </div>
      </form>`;

    return text;
  }

  initTicketForm() {
    this.formContainer = document.querySelector(".ticket-form-container");
    if (!this.formContainer) {
      const body = document.querySelector("body");
      const formContainer = document.createElement("div");
      formContainer.classList.add("ticket-form-container");
      formContainer.innerHTML = this.getTicketFormHTML("Добавить");
      this.formContainer = body.appendChild(formContainer);
      const nameField = document.getElementById("description");
      nameField.focus();
      const descriptionField = document.getElementById("fulldescription");

      const okButton = this.formContainer.querySelector(".btn-ok");
      okButton.addEventListener("click", (ev) => {
        ev.preventDefault();
        if (nameField.value.trim() !== "") {


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

  add() {
    this.initTicketForm();
  }

  edit(id) {
    if (id == null) {
      return;
    }
  }

  delete(id) {
    if (id == null) {
      return;
    }
  }
}