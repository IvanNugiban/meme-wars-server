import Entry from "../models/Entry";
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

    async add(nearId: string, file : Express.Multer.File) {

        const user = await User.findOne({nearId});

        if (!user || user.sumbitedToday) throw "You've already submited your meme!";

        user.sumbitedToday = true;
        const entry = new Entry({nearId, image: file.path});
        const events = await Events.findOne();

        if (!events) throw "Unknown error!";
        
        events.nextEvent.entries.push(entry);

        await events.save();
        await user.save();
    }
}

export default new EntriesSerivce();