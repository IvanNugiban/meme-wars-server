import mongoose from "mongoose";
import IUser from "../types/IUser";

const User = new mongoose.Schema<IUser>({
    nearId: {type: String, required: true},
    sumbitedToday: {type: Boolean, required: false, default: false}
})

export default mongoose.model<IUser>("User", User);