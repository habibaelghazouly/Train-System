import { Router } from "express";
import getStations from "../controllers/stations.controller";


const router = Router();
router.get('/stations', getStations);

export default router;