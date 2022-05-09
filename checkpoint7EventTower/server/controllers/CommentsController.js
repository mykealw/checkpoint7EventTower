import BaseController from '../utils/BaseController.js'
import { Auth0Provider } from "@bcwdev/auth0provider";
import { commentsService } from '../services/CommentsService.js';

export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
            .delete('/:id', this.deleteComment)


    }
    async deleteComment(req, res, next) {
        try {
            // const commentId = req.params.Id
            // const userId = req.userInfo.Id
            const comment = await commentsService.deleteComment(req.params.id, req.userInfo.id)
            res.send(comment)
        }
        catch (error) {
            next(error)
        }
    }
    async createComment(req, res, next) {
        try {
            req.body.creatorId = req.userInfo.id
            const comment = await commentsService.createComment(req.body)
            return res.send(comment)
        }
        catch (error) {
            next(error)
        }
    }
}