import { Request, Response } from "express";
import * as tripService from "../services/trips.service";
import *  as tripDto from "../dtos/trip.dto";


//GET trip by id
export async function getTrip(req: Request, res: Response) {
  try {
    const stationId = Number(req.params.id);
    if (!stationId) {
      return res.status(400).json({ error: "Invalid station ID" });
    }

    const trip = await tripService.getTripById(stationId);
    if (!trip) {
      return res.status(404).json({ error: "Trip not found" });
    }

    const response = tripDto.getTripResponseDto.fromEntity(trip);
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trips" });
  }
}


// GET the available trips between two stations
export async function searchTrips(req: Request, res: Response) {
  try {

    const fromStationId = Number(req.query.fromStationId);
    const toStationId = Number(req.query.toStationId);

    if (!fromStationId || !toStationId) {
      return res.status(400).json({ error: "fromStationId and toStationId are required query params" });
    }

    const trips = await tripService.findTrips(fromStationId, toStationId);
    if (trips.length === 0) {
      return res.status(404).json({ message: "No trips found between the specified stations" });
    }
    const response = tripDto.TripResponseDto.fromEntities(trips);

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch trips", details: error });
  }
}