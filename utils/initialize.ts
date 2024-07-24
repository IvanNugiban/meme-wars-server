import Events from "../models/Events";
import Event from "../models/Event";
import fs from 'fs'

const initialize = async () => {

    // Create uploads folder
    if (!fs.existsSync('uploads')){
        fs.mkdirSync('uploads');
    }

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