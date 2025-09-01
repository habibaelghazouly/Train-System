import { Router } from "express";
import * as stationController from "../controllers/stations.controller";

const router = Router();

// GET all stations
router.get('/stations', stationController.getStations);

// GET station by ID
router.get("/:id", stationController.getStation);

// POST new station
router.post("/station", stationController.createStation);


export default router;