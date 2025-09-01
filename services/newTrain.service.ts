import prisma from "../prisma";

export async function addTrain(data: { name: string }) {
  try {
    const train = await prisma.train.create({
      data: {
        name: data.name,
      },
    });
    return train;
  } catch (error) {
    throw error; // propagate DB errors
  }
}
