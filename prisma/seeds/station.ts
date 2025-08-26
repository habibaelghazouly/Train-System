import prisma from "../../prisma";

export async function seedStations() {
  console.log("🌱 Seeding stations...");

  const stations = await prisma.station.createMany({
    data: [
      { name: "Alexandria" },
      { name: "Damanhour" },
      { name: "Tanta" },
      { name: "Banha" },
      { name: "Cairo" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Stations seeded!");
  
  return stations;
}
