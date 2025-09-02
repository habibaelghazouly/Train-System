import { Request, Response } from "express";
import * as trainService from "../services/trains.service";
import * as trainDto from "../dtos/train.dto";

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

// GET train by ID
export async function getTrain(req: Request, res: Response) {
  try {
    const trainId = Number(req.params.id);
    if (!trainId) {
      return res.status(400).json({ error: "Invalid train ID" });
    }

    const train = await trainService.getTrainById(trainId);
    if (!train) {
      return res.status(404).json({ error: "Train not found" });
    }

    const response = trainDto.getTrainResponseDto.fromEntity(train);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch train" });
  }
}

// POST new train
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

// PATCH update train
export async function updateTrain(req: Request, res: Response) {
  try {
    const trainId = Number(req.params.id);
    if (!trainId) {
      return res.status(400).json({ error: "Invalid train ID" });
    }

    const { name } = req.body;
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Train name is required" });
    }

    const train = await trainService.updateTrain(trainId, { name: name?.trim() });
    const response = trainDto.updateTrainResponseDto.fromEntity(train);

    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

// DELETE train
export async function deleteTrain(req: Request, res: Response) {
  try {
    const trainId = Number(req.params.id);
    if (!trainId) {
      return res.status(400).json({ error: "Invalid train ID" });
    }

    const train = await trainService.deleteTrain(trainId);
    if (!train) {
      return res.status(404).json({ error: "Train not found" });
    }
    
    const response = trainDto.deleteTrainResponseDto.fromEntity(train);

    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}