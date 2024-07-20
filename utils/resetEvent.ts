import Event from "../models/Event";
import Events from "../models/Events";
import User from "../models/User";

const resetEvent = async () => {
    for await (const user of User.find()) {
        user.sumbitedToday = false;
        await user.save();
    }

    const events = await Events.findOne();

    if (!events) return;

    events.pastEvents.push(events.activeEvent);
    events.activeEvent = events.nextEvent;
    events.nextEvent = new Event();

    events.save();
}

export default resetEvent;