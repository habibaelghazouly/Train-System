import { getAllStations } from "../../services/stations.service";
import prisma from "../../prisma";


jest.mock("../../prisma", () => ({
  __esModule: true,
  default: {
    station: {
      findMany: jest.fn(), // mocked method
    },
  },
}));


describe("getAllStations", () => {
  it("should return stations sorted by name", async () => {
    // Arrange
    const mockStations = [
      { id: 1, name: "Alexandria" },
      { id: 2, name: "Damanhour" },
    ];
    (prisma.station.findMany as jest.Mock).mockResolvedValue(mockStations);

    // Act
    const result = await getAllStations();

    // Assert
    expect(prisma.station.findMany).toHaveBeenCalledWith({
      distinct: ["name"],
      orderBy: { id: "asc" },
    });
    expect(result).toEqual(mockStations);
  });
});
