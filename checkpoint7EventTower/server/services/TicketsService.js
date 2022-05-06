import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext.js";

class TicketsService {
    async createTicket(newTicket) {
        const exists = await dbContext.Ticket.findOne({ accountId: newTicket.accountId, towerEventId: newTicket.towerEventId })
        // if (exists) {
        //     throw new Forbidden('You already have a ticket')
        // }
        const ticket = await dbContext.Ticket.create(newTicket)
        await ticket.populate('account')
        const event = await dbContext.TowerEvent.findById(ticket.eventId)
        event.capacity--
        await event.save()
        return ticket
    }


}

export const ticketsService = new TicketsService()