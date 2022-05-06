import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext.js";

class TicketsService {
    async createTicket(newTicket) {
        const exists = await dbContext.Ticket.findOne({ accountId: newTicket.accountId, towerEventId: newTicket.towerEventId }).populate('creator', 'name picture')
        if (exists) {
            throw new Forbidden('You already have a ticket')
        }
        await exists.save()
        return exists
    }


}

export const ticketsService = new TicketsService()