import 'dotenv/config';
import express from 'express';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(express.json());
app.use(cors());

app.get('/colleges', async (req, res) => {
  const baseUrl = process.env.COLLEGE_API_BASE_URL;
  const apiKey = process.env.COLLEGE_API_KEY;
  const colleges = [];
  try {
    const response = await fetch(`${baseUrl}?api_key=${apiKey}`);

    if (!response.ok) {
      throw new Error('Could not fetch resource');
    }

    const data = await response.json();

    data.results.forEach((college) => {
      colleges.push({
        id: college.school.id,
        name: college.school.name,
        zipCode: college.school.zip,
        city: college.school.city,
        state: college.school.state,
      });
    });
    res.json(colleges);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Could not fetch resource' });
  }
});

app.listen(port, () => {
  console.log(`college-launchpad-backend is running on port ${port}`);
});
