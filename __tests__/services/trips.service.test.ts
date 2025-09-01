import { findTrips } from "../../services/trips.service";
import prisma from "../../prisma";

jest.mock("../../prisma", () => ({
  __esModule: true,
  default: {
    train: {
      findMany: jest.fn(),
    },
  },
}));

const trainFindMany = () => prisma.train.findMany as unknown as jest.Mock;

describe("findTrips (forward trips only, from !== to)", () => {
  const fromStationId = 1;
  const toStationId = 5;

  beforeEach(() => {
    trainFindMany().mockReset();
  });

  it("includes trains with stations in correct forward order", async () => {
    trainFindMany().mockResolvedValue([
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
    ]);

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
    trainFindMany().mockResolvedValue([
      {
        id: 12,
        name: "Reversed Train",
        trips: [
          { station_id: 5, station_order: 1 },
          { station_id: 1, station_order: 2 },
        ],
      },
    ]);

    const result = await findTrips(fromStationId, toStationId);
    expect(result).toEqual([]);
  });

  it("excludes trains where start and destination are the same", async () => {
    trainFindMany().mockResolvedValue([
      {
        id: 13,
        name: "Loop Train",
        trips: [
          { station_id: 1, station_order: 1 },
          { station_id: 1, station_order: 3 },
        ],
      },
    ]);

    const result = await findTrips(fromStationId, fromStationId);
    expect(result).toEqual([]);
  });

  it("excludes trains missing either station", async () => {
    trainFindMany().mockResolvedValue([
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
    ]);

    const result = await findTrips(fromStationId, toStationId);
    expect(result).toEqual([]);
  });

  it("propagates Prisma errors", async () => {
    trainFindMany().mockRejectedValue(new Error("DB error"));
    await expect(findTrips(fromStationId, toStationId)).rejects.toThrow("DB error");
  });
});
