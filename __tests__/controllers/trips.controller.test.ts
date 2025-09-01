import { Request, Response } from "express";
import searchTrips from "../../controllers/trips.controller";
import * as tripService from "../../services/trips.service";
import { TripResponseDto } from "../../dtos/trip.dto";

describe("searchTrips Controller - Unit Test", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = { query: { } };
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock })) as any;

    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

it("should call service and return transformed trips on success", async () => {
    const mockTrips = [
      { train_id: 1, train_name: "Express A", start_city: 1, dest_city: 5 },
    ];

    // Mock service
    jest.spyOn(tripService, "findTrips").mockResolvedValue(mockTrips);

    // Mock DTO transformation
    jest.spyOn(TripResponseDto, "fromEntities").mockReturnValue(mockTrips);

    req.query = { fromStationId: "1", toStationId: "5" };

    await searchTrips(req as Request, res as Response);

    expect(tripService.findTrips).toHaveBeenCalledWith(1, 5);
    expect(TripResponseDto.fromEntities).toHaveBeenCalledWith(mockTrips);
    expect(jsonMock).toHaveBeenCalledWith(mockTrips);
    expect(statusMock).not.toHaveBeenCalled(); // success
  });

  it("should return 400 if query params are missing", async () => {
    req.query = {}; // missing both params

    await searchTrips(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(400);
    expect(jsonMock).toHaveBeenCalledWith({
      error: "fromStationId and toStationId are required query params",
    });
  });

  it("should return 500 if service throws", async () => {
    jest.spyOn(tripService, "findTrips").mockRejectedValue(new Error("DB error"));

    req.query = { fromStationId: "1", toStationId: "5" };

    await searchTrips(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({
      error: "Failed to fetch trips",
      details: expect.any(Error),
    });
  });
});
