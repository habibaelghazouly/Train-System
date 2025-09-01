import { Request, Response } from "express";
import * as trainService from "../services/trains.service";
import { TrainResponseDto } from "../dtos/train.dto";

// GET all trains
async function getTrains(req: Request, res: Response) {
  try {
    const trains = await trainService.getAllTrains();
    const response = TrainResponseDto.fromEntities(trains);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trains" });
  }
}
export default getTrains;