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

// POST a trip

export async function createTrip(req: Request, res: Response) {
  try {
    const { stationId , trainId , stationOrder } = req.body;

    if (!stationId || !trainId || !stationOrder) {
      return res.status(400).json({ error: "stationId, trainId and stationOrder are required" });
    }

    const trip = await tripService.addTrip({ stationId, trainId, stationOrder });
    const response = tripDto.newTripResponseDto.fromEntity(trip);

    res.status(201).json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

// PATCH a trip
export async function updateTrip(req: Request, res: Response) {
  try {
    const tripId = Number(req.params.id);
    if (!tripId) {
      return res.status(400).json({ error: "Invalid trip ID" });
    }

    const { stationId, trainId, stationOrder } = req.body;
    if (!stationId || !trainId || !stationOrder) {
      return res.status(400).json({ error: "stationId, trainId and stationOrder are required" });
    }

    const trip = await tripService.updateTrip(tripId, { stationId, trainId, stationOrder });
    const response = tripDto.updateTripResponseDto.fromEntity(trip);

    res.json(response);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}