import { Router } from "express";
import getTrains from "../controllers/trains.controller";


const router = Router();
router.get('/trains', getTrains);

export default router;