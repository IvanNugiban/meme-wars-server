import cors from "cors"
import dotenv from "dotenv"
import express from "express"
import helmet from 'helmet'
import mongoose from "mongoose"
import cron from "node-cron"
import entriesRoutes from "./routes/entriesRoutes"
import initialize from "./utils/initialize"
import resetEvent from "./utils/resetEvent"

dotenv.config()

const app = express();
const port = process.env.PORT || 5000;
const dbUrl = process.env.DB_URL || "";

// Config
app.use(cors());
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(helmet());

// Endpoints
app.use("/entries", entriesRoutes);

// Schedules
cron.schedule('0 0 * * *', resetEvent);

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