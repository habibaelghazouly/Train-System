import prisma from "../prisma";

export async function getAllStations() {
  return prisma.station.findMany({
    distinct: ["name"],
    orderBy: { id: "asc" },
  });
}
