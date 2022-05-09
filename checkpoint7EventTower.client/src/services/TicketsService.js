import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class TicketsService {

    async createTicket(ticket) {
        const res = await api.post('api/tickets', ticket)
        // logger.log(res.data, "ticket")
        let newticket = res.data
        AppState.myTickets.unshift(newticket)
        AppState.tickets.unshift(newticket)
        AppState.activeEvent.capacity--
        AppState.activeEvent = AppState.activeEvent
        // logger.log(AppState.myTickets, "mytickets")
    }
    async getAllTickets(eventId) {
        const res = await api.get('api/events/' + eventId + '/tickets')
        AppState.tickets = res.data
        AppState.tickets = AppState.tickets
        // logger.log(res.data, "tickts got")
    }
    async getMyTickets() {
        const res = await api.get('/account/tickets')
        // logger.log(res.data, "my tickets")
        AppState.myTickets = res.data
    }
    async deleteTicket(ticketId) {
        // debugger
        const res = await api.delete('api/tickets/' + ticketId)
        logger.log(res.data, "deleted")
        AppState.myTickets = AppState.myTickets.filter(t => t.id != ticketId)
        AppState.tickets = AppState.tickets.filter(t => t.id != ticketId)


    }
}

export const ticketsService = new TicketsService()