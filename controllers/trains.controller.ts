import { Request, Response } from "express";
import * as trainService from "../services/trains.service";
import  * as trainDto from "../dtos/train.dto";

// GET all trains
export async function getTrains(req: Request, res: Response) {
  try {
    const trains = await trainService.getAllTrains();
    const response = trainDto.TrainResponseDto.fromEntities(trains);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trains" });
  }
}

//POST new train
 export async function createTrain(req: Request, res: Response) {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "name is required" });
    }

    const train = await trainService.addTrain({ name: name.trim() });
    const response = trainDto.newTrainResponseDto.fromEntity(train);

    res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

