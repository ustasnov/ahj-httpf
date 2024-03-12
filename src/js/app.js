import TicketListModel from "./model/ticketlistmodel";
import TicketListController from "./controller/ticketlistcontroller";
import TicketListForm from "./view/ticketlistform";
// TODO: write code here

// comment this to pass build
//const unusedVariable = "variable";

// for demonstration purpose only
export default function demo(value) {
  return `Demo: ${value}`;
}

const ticketListForm = new TicketListForm(new TicketListController(new TicketListModel()));

console.log("app.js included");
