import prisma from "../prisma";

// GET all stations
export async function getAllStations() {
  return prisma.station.findMany({
    distinct: ["name"],
    orderBy: { id: "asc" },
  });
}

// GET station by ID
export async function getStationById(id: number) {
  return prisma.station.findUnique({
    where: { id },
  });
}

// POST new station
export async function addStation(data: { name: string }) {
  try {
    const station = await prisma.station.create({
      data: {
        name: data.name,
      },
    });
    return station;
  } catch (error) {
    throw error; 
  }
}
