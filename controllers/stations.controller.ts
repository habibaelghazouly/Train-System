import { Request, Response } from "express";
import * as stationService from "../services/stations.service";
import * as stationDto from "../dtos/station.dto";


// GET all stations
export async function getStations(req: Request, res: Response) {
  try {
    const stations = await stationService.getAllStations();
    const response = stationDto.StationResponseDto.fromEntities(stations);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stations" });
  }
}

//GET station by id
export async function getStation(req: Request, res: Response) {
  try {
    const stationId = Number(req.params.id);
    if (!stationId) {
      return res.status(400).json({ error: "Invalid station ID" });
    }

    const station = await stationService.getStationById(stationId);
    if (!station) {
      return res.status(404).json({ error: "Station not found" });
    }

    const response = stationDto.getStationResponseDto.fromEntity(station);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stations" });
  }
}

// POST new station
export  async function createStation(req: Request, res: Response) {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "name is required" });
    }

    const station = await stationService.addStation({ name: name.trim() });
    const response = stationDto.newStationResponseDto.fromEntity(station);

    res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

// UPDATE/edit station
export async function updateStation(req: Request, res: Response) {
  try {
    const stationId = Number(req.params.id);
    if (!stationId) {
      return res.status(400).json({ error: "Invalid station ID" });
    }

    const { name } = req.body;
    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({ error: "Station name is required" });
    }

    const station = await stationService.updateStation(stationId, { name: name?.trim() });
    const response = stationDto.updateStationResponseDto.fromEntity(station);

    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}


// DELETE station
export async function deleteStation(req: Request, res: Response) {
  try {
    const stationId = Number(req.params.id);
    if (!stationId) {
      return res.status(400).json({ error: "Invalid station ID" });
    }

    const station = await stationService.deleteStation(stationId);
    if (!station) {
      return res.status(404).json({ error: "Station not found" });
    }

    const response = stationDto.deleteStationResponseDto.fromEntity(station);

    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}