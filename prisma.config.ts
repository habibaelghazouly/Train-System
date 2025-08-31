import "dotenv/config";
import { defineConfig } from "@prisma/config";
 
export default defineConfig({
  schema: "./prisma",
  migrations: {
    seed: "ts-node prisma/seed.ts",
  },
});