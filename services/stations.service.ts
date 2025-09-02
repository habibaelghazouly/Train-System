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
  return prisma.station.create({
    data: {
      name: data.name,
    },
  });
}

// PATCH update/edit a station
export async function updateStation(id: number, data: { name?: string }) {
  return prisma.station.update({
    where: { id },
    data,
  });
}

// DELETE a station
export async function deleteStation(id: number) {
  return prisma.station.delete({
    where: { id },
  });
}