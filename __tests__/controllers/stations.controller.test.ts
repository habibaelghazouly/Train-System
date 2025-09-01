import { Request, Response } from "express";
import getStations from "../../controllers/stations.controller";
import * as stationService from "../../services/stations.service";
import { StationResponseDto } from "../../dtos/station.dto";

describe("getStations Controller - Unit Test", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    req = {};
    jsonMock = jest.fn();
    statusMock = jest.fn(() => ({ json: jsonMock })) as any;

    res = {
      status: statusMock,
      json: jsonMock,
    };
  });

  it("should call service and return transformed stations on success", async () => {
    const mockStations = [
      { id: 1, name: "Station A" },
      { id: 2, name: "Station B" },
    ];

    // Mock the service
    jest.spyOn(stationService, "getAllStations").mockResolvedValue(mockStations);

    // Mock DTO transformation
    jest.spyOn(StationResponseDto, "fromEntities").mockReturnValue(mockStations);

    await getStations(req as Request, res as Response);

    expect(stationService.getAllStations).toHaveBeenCalled();
    expect(StationResponseDto.fromEntities).toHaveBeenCalledWith(mockStations);
    expect(jsonMock).toHaveBeenCalledWith(mockStations);
    expect(statusMock).not.toHaveBeenCalled(); // success should not call status
  });

  it("should return 500 with error message when service throws", async () => {
    jest.spyOn(stationService, "getAllStations").mockRejectedValue(new Error("DB error"));

    await getStations(req as Request, res as Response);

    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({ error: "Failed to fetch stations" });
  });
});
