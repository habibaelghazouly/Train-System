import { findTrips , getTripById } from "../../services/trips.service";
import prisma from "../../prisma";
import { Train, Trip } from "@prisma/client";

jest.mock("../../prisma", () => ({
  __esModule: true,
  default: {
    train: {
      findMany: jest.fn(),
    },
    trip: {
      findUnique: jest.fn(),
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
