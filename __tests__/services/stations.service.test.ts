import prisma from "../../prisma";
import {getAllStations , getStationById , addStation , updateStation , deleteStation } from "../../services/stations.service";

jest.mock("../../prisma", () => ({
  __esModule: true,
  default: {
    station: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Stations Service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // GET all
  describe("getAllStations", () => {
    it("should return stations sorted by name", async () => {
      const mockStations = [
        { id: 1, name: "Alexandria" },
        { id: 2, name: "Damanhour" },
      ];
      (prisma.station.findMany as jest.Mock).mockResolvedValue(mockStations);

      const result = await getAllStations();

      expect(prisma.station.findMany).toHaveBeenCalledWith({
        distinct: ["name"],
        orderBy: { id: "asc" },
      });
      expect(result).toEqual(mockStations);
    });
  });

  // GET station by id
  describe("getStationById", () => {
    it("should return a station by id", async () => {
      const mockStation = { id: 1, name: "Alexandria" };
      (prisma.station.findUnique as jest.Mock).mockResolvedValue(mockStation);

      const result = await getStationById(1);

      expect(prisma.station.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockStation);
    });

    it("should return null if station not found", async () => {
      (prisma.station.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await getStationById(999);

      expect(result).toBeNull();
    });
  });

  // POST station
  describe("addStation", () => {
    it("should create a new station", async () => {
      const newStation = { name: "Cairo" };
      const createdStation = { id: 3, name: "Cairo" };
      (prisma.station.create as jest.Mock).mockResolvedValue(createdStation);

      const result = await addStation(newStation);

      expect(prisma.station.create).toHaveBeenCalledWith({ data: newStation });
      expect(result).toEqual(createdStation);
    });
  });

  // PATCH station
  describe("updateStation", () => {
    it("should update an existing station", async () => {
      const updatedStation = { id: 1, name: "Alexandria Updated" };
      (prisma.station.update as jest.Mock).mockResolvedValue(updatedStation);

      const result = await updateStation(1, { name: "Alexandria Updated" });

      expect(prisma.station.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { name: "Alexandria Updated" },
      });
      expect(result).toEqual(updatedStation);
    });
  });

  // DELETE station
  describe("deleteStation", () => {
    it("should delete an existing station", async () => {
      const deletedStation = { id: 1, name: "Alexandria" };
      (prisma.station.delete as jest.Mock).mockResolvedValue(deletedStation);

      const result = await deleteStation(1);

      expect(prisma.station.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(deletedStation);
    });

    it("should return null if station to delete does not exist", async () => {
      (prisma.station.delete as jest.Mock).mockRejectedValue(new Error("Not found"));

      await expect(deleteStation(999)).rejects.toThrow("Not found");
    });
  });
});
