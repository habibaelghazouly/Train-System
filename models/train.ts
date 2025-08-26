import prisma from "../prisma";

export const createTrain = (name: string) => {
  return prisma.train.create({ data: { name } });
};

export const getAllTrains = () => {
  return prisma.train.findMany();
};
