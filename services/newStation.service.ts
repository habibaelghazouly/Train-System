import prisma from "../prisma";

export async function addStation(data: { name: string }) {
  try {
    const station = await prisma.station.create({
      data: {
        name: data.name,
      },
    });
    return station;
  } catch (error) {
    throw error; // propagate DB errors
  }
}
