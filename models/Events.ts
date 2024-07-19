
import mongoose from "mongoose";
import {Event} from "./Event";
import IEvents from "../types/IEvents";

const Events = new mongoose.Schema<IEvents>({
    activeEvent: {type : Event, required: false, default: undefined},
    nextEvent: {type : Event, required: true},
    pastEvents: {type: [Event], required: false, default: []}
})

export default mongoose.model<IEvents>("Events", Events);