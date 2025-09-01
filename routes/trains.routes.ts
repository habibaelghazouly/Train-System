import { Router } from "express";
import * as trainController from "../controllers/trains.controller";

const router = Router();

// GET all trains
router.get('/trains', trainController.getTrains);

// POST new train
router.post("/train", trainController.createTrain);

export default router;