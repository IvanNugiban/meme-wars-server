import Events from "../models/Events";
import User from "../models/User";
import Event from "../models/Event";

class EventsService {
    async getActive() {
        const events = await Events.findOne();

        if (!events) throw "Unknown error!";
        if (!events.activeEvent) throw "There is no active event right now. Come back later!"

        return events.activeEvent;
    }

    async resetEvent() {
        
        for await (const user of User.find()) {
            user.sumbitedToday = false;
            await user.save();
        }

        const events = await Events.findOne();

        if (!events) return;

        if (events.activeEvent) events.pastEvents.push(events.activeEvent);
        events.nextEvent.leaderboard = events.nextEvent.entries;
        events.activeEvent = events.nextEvent;
        events.nextEvent = new Event();

        events.save();
    }
}

export default new EventsService();