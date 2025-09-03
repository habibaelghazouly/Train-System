import express from "express";
import stationRoutes from "./routes/stations.routes";
import tripRoutes from "./routes/trips.routes";
import trainRoutes from "./routes/trains.routes";

import swaggerUi from "swagger-ui-express";
import swaggerDocument from "./swagger/swagger.json";

const app = express();

app.use(express.json());

// API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Station routes
app.use("/stations", stationRoutes);

// Trip routes
app.use("/trips", tripRoutes);

// Train routes
app.use("/trains", trainRoutes);


export default app;
