import Events from "../models/Events";
import User from "../models/User";

class EntriesSerivce {
    async getPair(nearId: string) {

        const events = await Events.findOne();

        if (!events?.activeEvent) {
            throw "The event hasn't started yet. Come back tomorrow!";
        }
    }; 

    async userSubmited(nearId: string) : Promise<boolean> {
        const user = await User.findOne({nearId});

        if (!user) return false;

        return user?.sumbitedToday;
    }
}

export default new EntriesSerivce();