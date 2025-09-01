import prisma from "../prisma";

// GET all trains
export async function getAllTrains() {
  return prisma.train.findMany({
    distinct: ["name"],
    orderBy: { id: "asc" },
  });
}

// POST new train
export async function addTrain(data: { name: string }) {
  try {
    const train = await prisma.train.create({
      data: {
        name: data.name,
      },
    });
    return train;
  } catch (error) {
    throw error; 
  }
}
