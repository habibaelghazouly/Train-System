import prisma from "../../prisma";
import {getAllTrains, getTrainById, addTrain, updateTrain, deleteTrain} from "../../services/trains.service";

jest.mock("../../prisma", () => ({
  __esModule: true,
  default: {
    train: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

describe("Trains Service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  // GET all
  describe("getAllTrains", () => {
    it("should return all trains sorted by id", async () => {
      const mockTrains = [
        { id: 1, name: "Train A" },
        { id: 2, name: "Train B" },
      ];
      (prisma.train.findMany as jest.Mock).mockResolvedValue(mockTrains);

      const result = await getAllTrains();

      expect(prisma.train.findMany).toHaveBeenCalledWith({
        distinct: ["name"],
        orderBy: { id: "asc" },
      });
      expect(result).toEqual(mockTrains);
    });
  });

  // GET train by id
  describe("getTrainById", () => {
    it("should return a train by id", async () => {
      const mockTrain = { id: 1, name: "Train A" };
      (prisma.train.findUnique as jest.Mock).mockResolvedValue(mockTrain);

      const result = await getTrainById(1);

      expect(prisma.train.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockTrain);
    });

    it("should return null if train not found", async () => {
      (prisma.train.findUnique as jest.Mock).mockResolvedValue(null);

      const result = await getTrainById(999);

      expect(result).toBeNull();
    });
  });

  // POST Train
  describe("addTrain", () => {
    it("should create a new train", async () => {
      const mockTrain = { id: 3, name: "Train C" };
      (prisma.train.create as jest.Mock).mockResolvedValue(mockTrain);

      const result = await addTrain({ name: "Train C" });

      expect(prisma.train.create).toHaveBeenCalledWith({
        data: { name: "Train C" },
      });
      expect(result).toEqual(mockTrain);
    });
  });

  // PATCH Train
  describe("updateTrain", () => {
    it("should update an existing train", async () => {
      const mockTrain = { id: 1, name: "Train A Updated" };
      (prisma.train.update as jest.Mock).mockResolvedValue(mockTrain);

      const result = await updateTrain(1, { name: "Train A Updated" });

      expect(prisma.train.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: { name: "Train A Updated" },
      });
      expect(result).toEqual(mockTrain);
    });
  });

  // DELETE Train
  describe("deleteTrain", () => {
    it("should delete an existing train", async () => {
      const mockTrain = { id: 1, name: "Train A" };
      (prisma.train.delete as jest.Mock).mockResolvedValue(mockTrain);

      const result = await deleteTrain(1);

      expect(prisma.train.delete).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(mockTrain);
    });

    it("should throw error if train does not exist", async () => {
      (prisma.train.delete as jest.Mock).mockRejectedValue(new Error("Not found"));

      await expect(deleteTrain(999)).rejects.toThrow("Not found");
    });
  });
});
