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
}

export const eventsService = new EventsService()