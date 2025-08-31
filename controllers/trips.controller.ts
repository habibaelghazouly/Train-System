import { Request, Response } from "express";
import * as tripService from "../services/trips.service";
import { TripResponseDto } from "../dtos/trip.dto";

// GET the available trips between two stations
async function searchTrips(req: Request, res: Response) {
  try {

    const fromStationId = Number(req.query.fromStationId);
    const toStationId = Number(req.query.toStationId);

    if (!fromStationId || !toStationId) {
      return res.status(400).json({ error: "fromStationId and toStationId are required query params" });
    }

    const trips = await tripService.findTrips(fromStationId, toStationId);
    const response = TripResponseDto.fromEntities(trips);

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trips", details: error });
  }
}
export default searchTrips;