import { Request, Response } from "express";
import entriesService from "../services/entriesService";
import fs from 'fs'

class EntriesController {
    async getPair(req : Request, res : Response) {
        try {
            await entriesService.getPair(req.query.nearId as string);
        } catch (e) {
            res.status(404).json(e);            
        }
    }

    async userSubmited(req : Request, res : Response) {
        try {
            const submited = await entriesService.userSubmited(req.query.nearId as string);
            res.json(submited);
        } catch (e) {
            res.status(404).json(e);            
        }
    }

    async add(req : Request, res : Response) {
        try {
            if (!req.file) return res.status(400).json("File wasn't provided!");
            await entriesService.add(req.query.nearId as string, req.file);
            res.status(200).json("Success!");
        } catch (e) {
            
            if (req.file?.path) fs.unlink(req.file?.path, (err) => {
                if (err) throw err;
                console.log('File was deleted');
             });

            res.status(400).json(e);            
        }
    }

    async vote(req : Request, res : Response) {

    }
}

export default new EntriesController();