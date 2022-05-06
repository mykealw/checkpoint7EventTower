import { Auth0Provider } from "@bcwdev/auth0provider";
import { ticketsService } from "../services/TicketsService.js";
import BaseController from '../utils/BaseController.js'

export class TicketsController extends BaseController {
    constructor() {
        super('')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('api/tickets', this.createTicket)

    }
    async createTicket(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const ticket = await ticketsService.createTicket(req.body)
            res.send(ticket)
        }
        catch (error) {
            next(error)
        }
    }
}