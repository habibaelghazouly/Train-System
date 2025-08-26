import prisma from "../prisma";

export const createStation = (name: string) => {
  return prisma.station.create({ data: { name } });
};

export const getAllStations = () => {
  return prisma.station.findMany();
};
