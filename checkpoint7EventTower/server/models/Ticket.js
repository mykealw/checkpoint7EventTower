import mongoose from 'mongoose'
const Schema = mongoose.Schema

export const TicketSchema = new Schema(
    {
        towerEventId: { type: Schema.Types.ObjectId, required: true, ref: 'TowerEvent' },
        accountId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },

    },
    { timestamps: true, toJSON: { virtuals: true } }
)

TicketSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})

TicketSchema.virtual('towerEvent', {
    localField: 'TowerEventId',
    ref: 'TowerEvent',
    foreignField: '_id',
    justOne: true
})