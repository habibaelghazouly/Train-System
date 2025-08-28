import path from "node:path";
import { defineConfig } from "prisma/config";
import dotenv from "dotenv";

// Load environment variables
dotenv.config({ path: path.join(__dirname, ".env") });

export default defineConfig({
  schema: path.join(__dirname, "prisma", "schema.prisma"),
  migrations: {
    path: path.join(__dirname, "prisma", "migrations"),
    seed: "ts-node ./prisma/seeds/seed.ts",
  },
});
