import prisma from "./prisma";


async function main() {
}

main()
  .catch(console.error)
  .finally(async () => await (await import("./prisma")).default.$disconnect());

export default prisma;