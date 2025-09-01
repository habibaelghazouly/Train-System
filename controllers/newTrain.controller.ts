import { Request, Response } from "express";
import * as trainService from "../services/newTrain.service";
import { newTrainResponseDto } from "../dtos/newtrain.dto";

 async function createTrain(req: Request, res: Response) {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "name is required" });
    }

    const train = await trainService.addTrain({ name: name.trim() });
    const response = newTrainResponseDto.fromEntity(train);

    res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
export default createTrain;
