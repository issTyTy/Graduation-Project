import { Schema, model, Types } from "mongoose";
const noteSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    userId: {
        type: Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})
const noteModel =  model("Note"   , noteSchema)
export  default noteModel