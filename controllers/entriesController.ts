import axios from 'axios';
import { Request, Response } from "express";
import path from "path";
import { userAuth } from "../middleware/user.middleware";
import entriesService from "../services/entriesService";
const fs = require('fs').promises;


class EntriesController {
    async getPair(req: Request, res: Response) {
        try {
            const pairs = await entriesService.getPair(req.query.nearId as string);
            res.json(pairs);
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
            if (req.file?.path) await fs.unlink(req.file?.path);

            res.status(400).json(e);
        }
    }

    async addTest(req: Request, res: Response) {
        try {

            // Fetch memes
            const result = await axios.get("https://meme-api.com/gimme/20");

            const memes: { url: string }[] = result.data.memes;

            // Fetch usernames
            const users = await axios.get(`https://randomuser.me/api/?results=${memes.length}`);

            for (let i = 0; i < users.data.results.length; i++) {
                req.query.nearId = users.data.results[i].login.username + ".near";
                await userAuth(req.query.nearId as string);

                // Download memes to uploads folder
                const response = await axios.get(memes[i].url, { responseType: 'arraybuffer' });

                const filename = Date.now() + ".png";

                await fs.writeFile(path.resolve('uploads') + "/" + filename, response.data);

                await entriesService.add(req.query.nearId as string, "uploads/" + filename, req.query.current === "true");
            }

            res.json(`Successfully added ${memes.length} entries!`)
            
        } catch (e) {
            console.log(e);
            res.status(500).json(e);
        }
    }

    async vote(req: Request, res: Response) {
        try {
            await entriesService.vote(req.query.nearId as string, req.body.winner, req.body.loser);
            res.json("Successfuly voted");
        }

        catch (e) {
            res.status(400).json(e);
        }
    }
}

export default new EntriesController();