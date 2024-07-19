import { Request, Response } from "express";
import entriesService from "../services/entriesService";

class EntriesController {
    async getPair(req : Request, res : Response) {
        try {
            await entriesService.getPair(req.query.nearId as string);
        } catch (e) {
            res.status(404).json(e);            
        }
    }

    async add(req : Request, res : Response) {

    }

    async vote(req : Request, res : Response) {

    }
}

export default new EntriesController();