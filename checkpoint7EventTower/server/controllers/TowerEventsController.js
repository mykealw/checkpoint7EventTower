import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from "../services/CommentsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { towerEventsService } from "../services/TowerEventsService.js";
import BaseController from "../utils/BaseController.js";

export class TowerEventsController extends BaseController {
    constructor() {
        super('api/events')
        this.router
            .get('', this.getAllEvents)
            .get('/:id', this.getEventById)
            .get('/:eventId/tickets', this.getTicketsByEvent)
            .get('/:eventId/comments', this.getCommentsByEvent)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:id', this.editEvent)
            .delete('/:id', this.deleteEvent)
    }
    async getCommentsByEvent(req, res, next) {
        try {
            // req.body.eventId = req.params.eventId
            const eventComment = await commentsService.getCommentsByEvent({ eventId: req.params.id })
            res.send(eventComment)
        } catch (error) {
            next(error)
        }
    }
    async getTicketsByEvent(req, res, next) {
        try {
            const eventTicket = await ticketsService.getTicketsByEvent(req.params.eventId)
            res.send(eventTicket)
        } catch (error) {
            next(error)
        }
    }
    async deleteEvent(req, res, next) {
        try {
            const event = await towerEventsService.deleteEvent(req.params.id, req.userInfo.id)
            res.send(event)
        }
        catch (error) {
            next(error)
        }
    }
    async editEvent(req, res, next) {
        try {
            req.body.id = req.params.id
            // req.body.creatorId = req.userInfo.id
            const event = await towerEventsService.editEvent(req.body, req.userInfo.id)
            res.send(event)
        }
        catch (error) {
            next(error)
        }
    }
    async getEventById(req, res, next) {
        try {
            const event = await towerEventsService.getEventById(req.params.id)
            res.send(event)
        }
        catch (error) {
            next(error)
        }
    }
    async createEvent(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const event = await towerEventsService.createEvent(req.body)
            res.send(event)
        }
        catch (error) {
            next(error)
        }
    }


    async getAllEvents(req, res, next) {
        try {
            const events = await towerEventsService.getAllEvents()
            res.send(events)
        }
        catch (error) {
            next(error)
        }
    }
}