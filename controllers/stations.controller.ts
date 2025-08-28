import { Request, Response } from "express";
import * as stationService from "../services/stations.service";
import { StationResponseDto } from "../dtos/station.dto";

// GET all stations
async function getStations(req: Request, res: Response) {
  try {
    const stations = await stationService.getAllStations();
    const response = StationResponseDto.fromEntities(stations);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stations" });
  }
}
export default getStations;