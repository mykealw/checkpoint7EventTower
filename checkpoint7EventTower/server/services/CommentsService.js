import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";

class CommentsService {
    async deleteComment(commentId, userId) {
        const comment = await dbContext.Comment.findById(commentId)
        if (comment.creatorId.toString() !== userId) {
            throw new Forbidden('This comment is not yours to delete')
        }
        await dbContext.Comment.findByIdAndDelete(commentId)
        return comment
    }
    async getCommentsByEvent(query) {
        const eventComment = await dbContext.TowerEvent.find(query).populate('creator')
        if (!eventComment) {
            throw new BadRequest("no comments")
        }
        return eventComment
    }
    async createComment(body) {
        const comment = await dbContext.Comment.create(body)
        await comment.populate('creator')
        return comment
    }



}

export const commentsService = new CommentsService()