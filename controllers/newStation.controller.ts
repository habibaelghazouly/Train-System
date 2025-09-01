import { Request, Response } from "express";
import * as stationService from "../services/newStation.service";
import { newStationResponseDto } from "../dtos/newStation.dto";

 async function createStation(req: Request, res: Response) {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "name is required" });
    }

    const station = await stationService.addStation({ name: name.trim() });
    const response = newStationResponseDto.fromEntity(station);

    res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
export default createStation;
