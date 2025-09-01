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

const trainFindMany = () => (prisma.train.findMany as unknown as jest.Mock);

describe("findTrips", () => {
  beforeEach(() => {
    trainFindMany().mockReset();
  });

  it("returns trains that have both stations in correct order", async () => {
    const fromStationId = 1;
    const toStationId = 5;

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
        // Has both stations but reversed order (excluded)
        id: 11,
        name: "Express B",
        trips: [
          { station_id: 5, station_order: 2 },
          { station_id: 1, station_order: 3 },
        ],
      },
      {
        // Missing destination (excluded)
        id: 12,
        name: "Local C",
        trips: [{ station_id: 1, station_order: 1 }],
      },
    ]);

    const result = await findTrips(fromStationId, toStationId);

    expect(trainFindMany()).toHaveBeenCalledWith({
      include: { trips: true },
    });

    expect(result).toEqual([
      {
        train_id: 10,
        train_name: "Express A",
        start_city: fromStationId,
        dest_city: toStationId,
      },
    ]);
  });

  it("returns empty array when no train has both stations in order", async () => {
    trainFindMany().mockResolvedValue([
      {
        id: 20,
        name: "Only One Stop",
        trips: [{ station_id: 2, station_order: 1 }],
      },
      {
        id: 21,
        name: "Reversed",
        trips: [
          { station_id: 5, station_order: 1 },
          { station_id: 1, station_order: 2 },
        ],
      },
    ]);

    const result = await findTrips(1, 5);
    expect(result).toEqual([]);
  });

  it("excludes trains where station_order is equal (no forward direction)", async () => {
    trainFindMany().mockResolvedValue([
      {
        id: 30,
        name: "Equal Order",
        trips: [
          { station_id: 1, station_order: 2 },
          { station_id: 5, station_order: 2 },
        ],
      },
    ]);

    const result = await findTrips(1, 5);
    expect(result).toEqual([]);
  });

  it("propagates errors from prisma", async () => {
    trainFindMany().mockRejectedValue(new Error("DB error"));
    await expect(findTrips(1, 5)).rejects.toThrow("DB error");
  });
});
