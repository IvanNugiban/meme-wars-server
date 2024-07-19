import mongoose from "mongoose";
import IEntry from "../types/IEntry.";

export const Entry = new mongoose.Schema<IEntry>({
    near_id: {type: String, required: true},
    image: {type : String, required : true},
    score: {type : Number, required : true},
    votes: {type : Number, required : true},
})

export default mongoose.model<IEntry>("Entry", Entry);