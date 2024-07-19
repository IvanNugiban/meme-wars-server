import mongoose from "mongoose"
import IEntry from "./IEntry.";

interface IEvent {
    entries : IEntry[],
    startDate: Date,
    endDate: Date
}

export default IEvent;