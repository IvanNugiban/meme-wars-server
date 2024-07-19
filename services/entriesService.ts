import Events from "../models/Events";

class EntriesSerivce {
    async getPair(nearId: string) {

        const events = await Events.findOne();

        if (!events?.activeEvent) {
            throw "The event hasn't started yet. Come back tomorrow!";
        }
    }; 
}

export default new EntriesSerivce();