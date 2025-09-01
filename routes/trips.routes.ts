import { Router } from "express";
import * as tripController  from "../controllers/trips.controller";

const router = Router();

// GET available trips
router.get("/search", tripController.searchTrips);

export default router;
