import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import collegeRoutes from './routes/collegeRoutes.js';

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.use('/', collegeRoutes);

app.listen(port, () => {
  console.log(`college-launchpad-backend is running on port ${port}`);
});
