import express from 'express';

const app = express();
const port = 8080;

app.listen(port, () => {
  console.log(`college-launchpad-backend is running on port ${port}`);
});
