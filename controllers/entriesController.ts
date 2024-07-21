import { Request, Response } from "express";
import entriesService from "../services/entriesService";
import fs from 'fs'
import axios from 'axios'
import userMiddleware, { userAuth } from "../middleware/user.middleware";

class EntriesController {
    async getPair(req: Request, res: Response) {
        try {
            await entriesService.getPair(req.query.nearId as string);
        } catch (e) {
            res.status(404).json(e);
        }
    }

    async userSubmited(req: Request, res: Response) {
        try {
            const submited = await entriesService.userSubmited(req.query.nearId as string);
            res.json(submited);
        } catch (e) {
            res.status(404).json(e);
        }
    }

    async add(req: Request, res: Response) {
        try {
            if (!req.file) return res.status(400).json("File wasn't provided!");
            await entriesService.add(req.query.nearId as string, req.file.path);
            res.json("Success!");
        }
        
        catch (e) {
            if (req.file?.path) fs.unlink(req.file?.path, (err) => {
                if (err) throw err;
                console.log('File was deleted');
            });

            res.status(400).json(e);
        }
    }

    async addTest(req: Request, res: Response) {
        try {
            // Fetch memes
            const memes = await axios.get("https://meme-api.com/gimme/20");
            // Fetch usernames
            const users = await axios.get(`https://randomuser.me/api/?results=${memes.data.memes.length}`);

            for (let i = 0; i < users.data.results.length; i++) {
                req.query.nearId = users.data.results[i].login.username + ".near";
                await userAuth(req.query.nearId as string);
                await entriesService.add(req.query.nearId as string, memes.data.memes[i].url, req.query.current === "true");
            }

            res.json(`Successfully added ${memes.data.memes.length} entries!`)
        } catch (e) {
            res.status(500).json(e);
        }
    }

    async vote(req: Request, res: Response) {

    }
}

export default new EntriesController();