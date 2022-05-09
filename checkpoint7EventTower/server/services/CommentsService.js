import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";

class CommentsService {
    async deleteComment(commentId, userId) {
        const comment = await dbContext.Comments.findById(commentId)
        if (comment.creatorId.toString() !== userId) {
            throw new Forbidden('This comment is not yours to delete')
        }
        await dbContext.Comments.findByIdAndDelete(commentId)
        return comment
    }
    async getCommentsByEvent(eventId) {
        const eventComment = await dbContext.Comments.find({ eventId: eventId }).populate('creator', 'name picture')
        // await eventComment.populate('creator', 'name picture')
        if (!eventComment) {
            throw new BadRequest("no comments")
        }
        return eventComment
    }
    async createComment(body) {
        const comment = await dbContext.Comments.create(body)
        await comment.populate('creator', 'name picture')
        return comment
    }



}

export const commentsService = new CommentsService()