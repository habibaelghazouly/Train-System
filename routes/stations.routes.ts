import { Router } from "express";
import getAllStations from "../controllers/stations.controller";


const router = Router();
router.get('/', getAllStations);

export default router;