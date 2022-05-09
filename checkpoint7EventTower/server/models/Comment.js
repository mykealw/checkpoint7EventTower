import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema(
    {
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Profile' },
        eventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' },
        body: { type: String, required: true },
        isAttending: { type: Boolean },
    },
    { timestamps: true, toJSON: { virtuals: true } }

)

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Profile',
    foreignField: '_id',
    justOne: true
})

CommentSchema.virtual('event', {
    localField: 'eventId',
    ref: 'TowerEvent',
    foreignField: '_id',
    justOne: true
})
CommentSchema.virtual('account', {
    localField: 'accountId',
    ref: 'Profile',
    foreignField: '_id',
    justOne: true
})