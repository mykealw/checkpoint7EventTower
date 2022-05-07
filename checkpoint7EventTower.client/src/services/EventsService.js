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
        AppState.towerEvents = res.data
    }

}

export const eventsService = new EventsService()