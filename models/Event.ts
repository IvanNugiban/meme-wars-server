import mongoose from "mongoose";
import IEvent from "../types/IEvent";
import { Entry } from "./Entry";

export const Event = new mongoose.Schema<IEvent>({
    _id: { type: String },
    entries : {type: [Entry], required : true, default: []},
    leaderboard: {type: [Entry], required: true, default: []},
    startDate: {type : Date, required : true, default: new Date()},
    endDate: {type : Date, requeired: true, default: new Date().setUTCHours(12, 0, 0, 0)},  
})

export default mongoose.model<IEvent>("Event", Event);