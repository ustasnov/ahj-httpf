import TicketListModel from "./model/ticketlistmodel";
import TicketListController from "./controller/ticketlistcontroller";
import TicketList from "./view/ticketlist";

const serverUrl = "http://localhost:7070";

new TicketList(new TicketListController(new TicketListModel(serverUrl)));
