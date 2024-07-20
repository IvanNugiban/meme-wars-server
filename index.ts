import express from "express"
import dotenv from "dotenv"
import helmet from 'helmet'
import cron from "node-cron"
import cors from "cors"
import path from "path"
import mongoose from "mongoose"
import Events from "./models/Events"
import entriesRoutes from "./routes/entriesRoutes"
import Event from "./models/Event"
import User from "./models/User"


dotenv.config()

const app = express();
const port = process.env.PORT || 5000;
const dbUrl = process.env.DB_URL || "";

app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(helmet());

app.use("/entries", entriesRoutes);

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

cron.schedule('0 0 * * *', async () => {
    for await (const user of User.find()) {
        user.sumbitedToday = false;
        await user.save();
    }
});

const start = async () => {
    try {
        await mongoose.connect(dbUrl);
        await initialize();
        app.listen(port);
    }

    catch(e) {
        console.error(e)
    }
}

start();