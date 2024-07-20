import { Router } from "express";
import entriesController from "../controllers/entriesController";
import userMiddleware from "../middleware/user.middleware";
import uploadMiddeware from "../middleware/upload.middleware";

const router = Router();

router.get("/getPair", userMiddleware, entriesController.getPair);
router.get("/userSubmited", userMiddleware, entriesController.userSubmited);
router.post("/add", userMiddleware, uploadMiddeware.single('file'), entriesController.add);
router.put("/vote", userMiddleware, entriesController.vote);

export default router;