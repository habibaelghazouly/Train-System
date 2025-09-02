import { Router } from "express";
import * as tripController  from "../controllers/trips.controller";

const router = Router();

// GET available trips
router.get("/search", tripController.searchTrips);

// GET trip by ID
router.get("/:id", tripController.getTrip);

// POST trip
router.post("/new", tripController.createTrip);

// PATCH a trip
router.patch("/:id", tripController.updateTrip);

// // DELETE a trip
// router.delete("/:id", tripController.deleteTrip);

export default router;
