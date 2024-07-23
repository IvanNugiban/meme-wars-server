import { Router } from "express";
import eventsCoutoller from "../controllers/eventsController";

const router = Router();

router.get('/getActive', eventsCoutoller.getActive);
router.get('/getPrevious', eventsCoutoller.getPrevious);

// Test routes : they won't be in the release
router.put('/refreshLeaderboard', eventsCoutoller.refreshLeaderboard)
router.put('/endEvent', eventsCoutoller.endEvent);

export default router;