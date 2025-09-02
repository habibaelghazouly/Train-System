import prisma from "../prisma";

// GET all trains
export async function getAllTrains() {
  return prisma.train.findMany({
    distinct: ["name"],
    orderBy: { id: "asc" },
  });
}

// GET train by ID
export async function getTrainById(id: number) {
  return prisma.train.findUnique({
    where: { id },
  });
}

// POST new train
export async function addTrain(data: { name: string }) {
  return prisma.train.create({
    data: {
      name: data.name,
    },
  });
}

// PATCH update/edit a train
export async function updateTrain(id: number, data: { name?: string }) {
  return prisma.train.update({
    where: { id },
    data,
  });
}