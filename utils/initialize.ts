import Events from "../models/Events";
import Event from "../models/Event";

const initialize = async () => {
    // Check if events document already created
    const events = await Events.countDocuments();
    
    // Initialize events
    if (events == 0) {

        const nextEvent = new Event();

        const newEvents = new Events({
            nextEvent: nextEvent
        });

        await newEvents.save();     
    }
}

export default initialize;