import { Router } from "express";
import searchTrips  from "../controllers/trips.controller";

const router = Router();

router.get("/search", searchTrips);

export default router;
