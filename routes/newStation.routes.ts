import { Router } from "express";
import createStation from "../controllers/newStation.controller";

const router = Router();
router.post("/station", createStation);

export default router;
