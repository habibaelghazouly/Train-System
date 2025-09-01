import prisma from "../prisma";

export async function getAllTrains() {
  return prisma.train.findMany({
    distinct: ["name"],
    orderBy: { id: "asc" },
  });
}
