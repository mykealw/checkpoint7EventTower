import mongoose from 'mongoose'
const Schema = mongoose.Schema


export const TowerEventSchema = new Schema(
    {
        creatorId: { type: Schema.Types.ObjectId, required: true, ref: 'Account' },
        name: { type: String, required: true, },
        description: { type: String, required: true },
        coverImg: { type: String, required: true },
        location: { type: String, required: true },
        capacity: { type: Number, min: 0, required: true },
        startDate: { type: Date, required: true },
        isCanceled: { type: Boolean, default: false, required: true },
        type: { type: String, enum: ['concert', 'convention', 'sport', 'digital'], required: true },
    },
    { timestamps: true, toJSON: { virtuals: true } }
)

TowerEventSchema.virtual('creator', {
    localField: 'creatorId',
    ref: 'Account',
    foreignField: '_id',
    justOne: true
})