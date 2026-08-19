import 'dotenv/config';
import express from 'express';

const app = express();
const port = 8080;
const apiKey = process.env.API_KEY;

app.listen(port, () => {
  console.log(`college-launchpad-backend is running on port ${port}`);
});
