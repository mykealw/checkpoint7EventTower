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
        // debugger 
        // logger.log(AppState.towerEvents, "all events")
        AppState.myEvents = AppState.towerEvents.filter(e => e.creatorId.toString() == accountId.toString())
        // logger.log(AppState.myEvents, "my events")
    }
}

export const eventsService = new EventsService()