import { Request, Response } from "express";
import eventsService from "../services/eventsService";

class EventsController {
    async getActive(req : Request, res : Response) {
        try {
            const event = await eventsService.getActive();
            return res.json(event);
        } catch (e) {
            res.status(404).json(e);            
        }
    }

    async getPrevious(req : Request, res : Response) {
        try {
            const event = await eventsService.getPrevious();
            return res.json(event);
        } catch (e) {
            res.status(404).json(e);            
        }
    }

    async refreshLeaderboard(req : Request, res : Response) {
        try {
            await eventsService.updateLeaderboard();
            return res.json("Success!");
        } catch (e) {
            res.status(404).json(e);            
        }
    }

    async endEvent(req : Request, res : Response) {
        try {
            await eventsService.resetEvent();
            return res.json("Success!");
        } catch (e) {
            res.status(404).json(e);            
        }
    }
}

export default new EventsController();