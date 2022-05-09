import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from '../utils/BaseController.js'

export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:id', this.deleteTicket)

    }
    async deleteTicket(req, res, next) {
        try {
            // const ticketId = req.params.id
            // const userId = req.userInfo.id
            const ticket = await ticketsService.deleteTicket(req.params.id, req.userInfo.id)
            res.send(ticket)
        }
        catch (error) {
            next(error)
        }
    }
    async createTicket(req, res, next) {
        try {
            req.body.accountId = req.userInfo.id
            // req.body.creatorId = req.userInfo.id
            const ticket = await ticketsService.createTicket(req.body)
            res.send(ticket)
        }
        catch (error) {
            next(error)
        }
    }
}