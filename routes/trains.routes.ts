import { Router } from "express";
import * as trainController from "../controllers/trains.controller";

const router = Router();

// GET all trains
router.get('/', trainController.getTrains);

// GET train by ID
router.get("/:id", trainController.getTrain);

// POST new train
router.post("/new", trainController.createTrain);

// Update/edit a train
router.patch("/:id", trainController.updateTrain);

export default router;