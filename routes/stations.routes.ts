import { Router } from "express";
import * as stationController from "../controllers/stations.controller";

const router = Router();

// GET all stations
router.get('/stations', stationController.getStations);

// POST new station
router.post("/station", stationController.createStation);


export default router;