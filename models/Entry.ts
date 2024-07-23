import mongoose from "mongoose";
import IEntry from "../types/IEntry.";

export const Entry = new mongoose.Schema<IEntry>({
    nearId: {type: String, required: true},
    image: {type : String, required : true},
    score: {type : Number, required : true, default: 0},
    votes: {type : Number, required : true, default: 0},
    reward: {type: Number, required: true, default: 0}
})

export default mongoose.model<IEntry>("Entry", Entry);