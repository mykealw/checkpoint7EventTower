import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "@bcwdev/auth0provider/lib/Errors";

class CommentsService {
    async createComment(newComment) {
        const comment = await dbContext.Comment.create(newComment)
        await comment.populate('creator')
        return comment
    }



}

export const commentsService = new CommentsService()