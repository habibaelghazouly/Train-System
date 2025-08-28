import express from "express";
import stationRoutes from "./routes/stations.routes";

const app = express();

app.use(express.json());

// Routes
app.use("/", stationRoutes);

export default app;
