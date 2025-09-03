import { addTrip, deleteTrip, findTrips , getTripById, updateTrip } from "../../services/trips.service";
import prisma from "../../prisma";
import { Train, Trip } from "@prisma/client";
import { mock } from "node:test";

jest.mock("../../prisma", () => ({
  __esModule: true,
  default: {
    train: {
      findMany: jest.fn(),
    },
    trip: {
      findUnique: jest.fn(),
      delete: jest.fn(),
      create: jest.fn(), 
      update: jest.fn(),
    },
  },
}));

// GET trip by id
describe("getTripById", () => {
    it("should return a trip by id", async () => {
      const mockTrip = { id: 1, station_id: 2, station_order: 1 };
      (prisma.trip.findUnique as jest.Mock).mockResolvedValue(mockTrip);

      const result = await getTripById(1);

      expect(prisma.trip.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockTrip);
    });

    it("should return null if trip not found", async () => {
      (prisma.trip.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await getTripById(999);

      expect(result).toBeNull();
    });
  });

// Get all
const trainFindMany = prisma.train.findMany as jest.MockedFunction<typeof prisma.train.findMany>;

describe("findTrips service", () => {
  const fromStationId = 1;
  const toStationId = 5;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("includes trains with stations in correct forward order", async () => {
    trainFindMany.mockResolvedValue([
      {
        id: 10,
        name: "Express A",
        trips: [
          { station_id: 1, station_order: 1 },
          { station_id: 3, station_order: 2 },
          { station_id: 5, station_order: 4 },
        ],
      },
      {
        id: 11,
        name: "Local B",
        trips: [
          { station_id: 1, station_order: 2 },
          { station_id: 5, station_order: 3 },
        ],
      },
    ] as any);

    const result = await findTrips(fromStationId, toStationId);
    expect(result).toEqual([
      {
        train_id: 10,
        train_name: "Express A",
        start_city: fromStationId,
        dest_city: toStationId,
      },
      {
        train_id: 11,
        train_name: "Local B",
        start_city: fromStationId,
        dest_city: toStationId,
      },
    ]);
  });

  it("excludes trains where stations are in reverse order", async () => {
    trainFindMany.mockResolvedValue([
      {
        id: 12,
        name: "Reversed Train",
        trips: [
          { station_id: 5, station_order: 1 },
          { station_id: 1, station_order: 2 },
        ],
      },
    ] as any);

    const result = await findTrips(fromStationId, toStationId);
    expect(result).toEqual([]);
  });

  it("excludes trains where start and destination are the same", async () => {
    trainFindMany.mockResolvedValue([
      {
        id: 13,
        name: "Loop Train",
        trips: [
          { station_id: 1, station_order: 1 },
          { station_id: 1, station_order: 3 },
        ],
      },
    ] as any);

    const result = await findTrips(fromStationId, fromStationId);
    expect(result).toEqual([]);
  });

  it("excludes trains missing either station", async () => {
    trainFindMany.mockResolvedValue([
      {
        id: 14,
        name: "Partial Train",
        trips: [{ station_id: 1, station_order: 1 }],
      },
      {
        id: 15,
        name: "Other Train",
        trips: [{ station_id: 99, station_order: 1 }],
      },
    ] as any);

    const result = await findTrips(fromStationId, toStationId);
    expect(result).toEqual([]);
  });

  it("returns empty array if no trains in DB", async () => {
    trainFindMany.mockResolvedValue([]);

    const result = await findTrips(fromStationId, toStationId);
    expect(result).toEqual([]);
  });

  it("propagates Prisma errors", async () => {
    trainFindMany.mockRejectedValue(new Error("DB error"));

    await expect(findTrips(fromStationId, toStationId)).rejects.toThrow("DB error");
  });
});

// POST a trip 
  describe("addTrip", () => {
    it("should create a new trip", async () => {
      const mockTrip = { id: 3, stationId: 1 , trainId :2 , stationOrder:3 };
      (prisma.trip.create as jest.Mock).mockResolvedValue(mockTrip);

      const result = await addTrip({ stationId: 1, trainId: 2, stationOrder: 3 });

      expect(prisma.trip.create).toHaveBeenCalledWith({
        data: { station_id: 1, train_id: 2, station_order: 3 },
      });
      expect(result).toEqual(mockTrip);
    });
  });

// PATCH/edit a trip
  describe("updateTrip", () => {
    it("should update an existing trip", async () => {
      const mockTrip = { id: 1, stationId: 1, trainId: 2, stationOrder: 3 };
      (prisma.trip.update as jest.Mock).mockResolvedValue(mockTrip);

      const result = await updateTrip(1, { stationId: 1, trainId: 2, stationOrder: 3 });

      expect(prisma.trip.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { station_id: 1, train_id: 2, station_order: 3 },
      });
      expect(result).toEqual(mockTrip);
    });
  });



// DELETE a trip
describe("deleteTrip", () => {
  it("should delete a trip by id", async () => {
    const mockTripData = { id: 1, stationId: 2, trainId: 3, stationOrder: 4 };
    (prisma.trip.delete as jest.Mock).mockResolvedValue(mockTripData);

    const result = await deleteTrip(1);

    expect(prisma.trip.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(result).toEqual(mockTripData);
  });

  it("should return null if trip not found", async () => {
    (prisma.trip.delete as jest.Mock).mockResolvedValue(null);

    const result = await deleteTrip(999);

    expect(result).toBeNull();
  });
});