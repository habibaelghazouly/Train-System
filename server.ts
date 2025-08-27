import express from 'express';
import prisma from './prisma';
import stationsRouter from './routes/stations.routes';

const app = express();
const PORT = process.env.PORT || 3000;

app.use('/', stationsRouter);



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;