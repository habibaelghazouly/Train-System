import prisma from "../../prisma";

export async function seedTrains() {
  console.log("🌱 Seeding Trains...");

  const trains = await prisma.train.createMany({
    data: [
      { name: "Train 1" },
      { name: "Train 2" },
      { name: "Train 3" },
      { name: "Train 4" },
      { name: "Train 5" },
    ],
    skipDuplicates: true,
  });

  console.log("✅ Trains seeded!");
  
  return trains;
}
