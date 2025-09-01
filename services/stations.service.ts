import prisma from "../prisma";

// GET all stations
export async function getAllStations() {
  return prisma.station.findMany({
    distinct: ["name"],
    orderBy: { id: "asc" },
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
