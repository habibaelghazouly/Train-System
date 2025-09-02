import { Router } from "express";
import * as stationController from "../controllers/stations.controller";

const router = Router();

// GET all stations
router.get('/', stationController.getStations);

// GET station by ID
router.get("/:id", stationController.getStation);

// POST new station
router.post("/new", stationController.createStation);

// Update/edit a station
router.patch("/:id", stationController.updateStation);

export default router;