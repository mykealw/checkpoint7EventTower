import { AppState } from "../AppState.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService {
    async createComment(newComment) {
        // logger.log(newComment)
        const res = await api.post('api/comments/', newComment)
        // logger.log(res.data, "comment made")
        AppState.comments.unshift(res.data)
    }
    async getAllComments(eventId) {
        // logger.log(eventId, "eventID?")
        const res = await api.get('api/events/' + eventId + '/comments')
        // logger.log(res.data, "here the comments")
        AppState.comments = res.data
    }
    async deleteComment(commentId) {
        const res = await api.delete('api/comments/' + commentId)
        // logger.log(res.data, "deleted comment")
        AppState.comments = AppState.comments.filter(c => c.id != commentId)

    }
}
export const commentsService = new CommentsService()