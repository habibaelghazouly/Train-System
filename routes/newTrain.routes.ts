import { Router } from "express";
import createTrain from "../controllers/newTrain.controller";

const router = Router();
router.post("/train", createTrain);

export default router;
