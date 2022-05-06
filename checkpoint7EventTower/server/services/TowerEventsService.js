import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";

class TowerEventsService {
    async deleteEvent(eventId, userId) {
        const event = await this.getEventById(eventId)
        if (event.creatorId.toString() != userId) {
            throw new Forbidden("You cannot cancel what isn't yours")
        }
        event.isCanceled = true
        await event.save(event)
        return event
    }
    async editEvent(update, userId) {
        if (update.creatorId.toString() != userId) {
            throw new Forbidden("You cannot edit an event that is not yours")
        }
        const original = await this.getEventById(update.id)
        original.name = update.name || original.name
        original.description = update.description || original.description
        original.coverImg = update.coverImg || original.coverImg
        original.location = update.coverImg || original.location
        original.capacity = update.capacity || original.capacity
        original.startDate = update.startDate || original.startDate
        original.type = update.type || original.type
        original.isAttending = update.isAttending
        await original.save()
        return original
    }
    async getEventById(id) {
        const event = await dbContext.TowerEvent.findById(id).populate('creator', 'picture name')
        if (!event) {
            throw new BadRequest('Invalid Id')
        }
        return event
    }
    async createEvent(body) {
        const event = await dbContext.TowerEvent.create(body)
        await event.populate('creator', 'name picture')
        return event
    }
    async getAllEvents() {
        const events = await dbContext.TowerEvent.find({}).populate('creator', 'name picture')
        return events
    }


}

export const towerEventsService = new TowerEventsService()