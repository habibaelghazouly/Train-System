import { Router } from "express";
import * as tripController  from "../controllers/trips.controller";

const router = Router();

// GET available trips
router.get("/search", tripController.searchTrips);

// GET trip by ID
router.get("/:id", tripController.getTrip);

export default router;
