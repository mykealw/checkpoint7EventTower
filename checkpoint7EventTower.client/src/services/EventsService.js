import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"


class EventsService {
    async getAllEvents(query = "") {
        const res = await api.get('api/events/' + query)
        // logger.log(res.data, "towerEvents")
        AppState.towerEvents = res.data

    }
    async filterEvents(type) {
        const res = await api.get('api/events/' + '?type=' + type)
        // logger.log(res.data, "filter events")
        AppState.towerEvents = res.data
    }
    async getActiveEvent(eventId) {
        const res = await api.get('api/events/' + eventId)
        // logger.log(res.data, "active event")
        AppState.activeEvent = res.data
    }
    async createEvent(newEvent) {
        const res = await api.post('api/events/', newEvent
        )
        // logger.log(res.data, "created event")
        AppState.activeEvent = res.data
        AppState.towerEvents.unshift(res.data)
        AppState.myEvents.unshift(res.data)
    }
    async getMyEvents(accountId) {
        AppState.myEvents = AppState.towerEvents.filter(e => e.creatorId.toString() == accountId.toString())
        // logger.log(AppState.myEvents, "my events")
    }
    async cancelEvent(eventId) {
        const res = await api.delete('api/events/' + eventId)
        logger.log(res.data, "canceled event")
    }
    async editEvent(eventUpdate) {
        // logger.log(eventUpdate, "this is what is coming through")
        debugger
        const res = await api.put('api/events/' + eventUpdate.id, eventUpdate)
        logger.log(res.data, "this is the update")
        let index = AppState.towerEvents.findIndex(e => e.id === res.data.id)
        if (index != -1) {
            AppState.towerEvents.splice(index, 1, res.data)
            logger.log("1")
        }
        let index2 = AppState.myEvents.findIndex(e => e.id === res.data.id)
        if (index2 != -1) {
            AppState.myEvents.splice(index2, 1, res.data)
            logger.log("2")
        }
        AppState.activeEvent = res.data
    }
}

export const eventsService = new EventsService()