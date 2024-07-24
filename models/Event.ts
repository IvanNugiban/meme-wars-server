import mongoose from "mongoose";
import IEvent from "../types/IEvent";
import { Entry } from "./Entry";

export const Event = new mongoose.Schema<IEvent>({
    _id: { type: String },
    entries : {type: [Entry], required : true, default: []},
    leaderboard : {type: [Entry], required : true, default: []},
    startDate: {type : Date, required : false, default: undefined},
    endDate: {type : Date, requeired: false, default: undefined},
    voteLimit: {type: Number, required: false, default: 0}
})

export default mongoose.model<IEvent>("Event", Event);