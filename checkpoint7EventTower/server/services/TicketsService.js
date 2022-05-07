import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";
import { dbContext } from "../db/DbContext.js";

class TicketsService {
    async deleteTicket(ticketId, userId) {
        const byeTicket = await dbContext.Ticket.findById({ ticketId })
        if (byeTicket.accountId != userId) {
            throw new BadRequest('not your ticket to delete')
        }
        await byeTicket.remove()
        const event = await dbContext.TowerEvent.findById(byeTicket.eventId)
        event.capacity++
        return byeTicket
    }
    async getTicketsByEvent(eventId) {
        const eventTicket = await dbContext.Ticket.find({ eventId: eventId }).populate('account')
        return eventTicket
    }
    async getTicketsbyAccount(accountId) {
        const accountTicket = await dbContext.Ticket.find({ accountId: accountId }).populate('event')
        return accountTicket
    }
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