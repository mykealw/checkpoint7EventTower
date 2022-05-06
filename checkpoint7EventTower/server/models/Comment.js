import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const CommentSchema = new Schema(
    {
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
        towerEventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' },
        body: { type: String, required: true },
        isAttending: { type: Boolean },

    },
)

CommentSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

CommentSchema.virtual('towerEvent', {
    localField: 'TowerEventId',
    ref: 'TowerEvent',
    foreignField: '_id',
    justOne: true
})