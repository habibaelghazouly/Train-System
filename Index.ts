import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("All tables:");

  const stations = await prisma.station.findMany();
  const trains = await prisma.train.findMany();
  const trips = await prisma.trip.findMany({
    include: {
      Station: true,
      Train: true,
    },
  });

  console.log("Stations:", stations.length ? stations : "No records found");
  console.log("Trains:", trains.length ? trains : "No records found");
  console.log("Trips:", trips.length ? trips : "No records found");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
