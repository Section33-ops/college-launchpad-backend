export const getColleges = async (req, res) => {
  const baseUrl = process.env.COLLEGE_API_BASE_URL;
  const apiKey = process.env.COLLEGE_API_KEY;
  const colleges = [];

  const { stateParam, cityParam } = req.query;

  function getUrl() {
    if (stateParam === undefined && cityParam === undefined) {
      return `${baseUrl}?api_key=${apiKey}`;
    }

    if (stateParam && cityParam) {
      return `${baseUrl}?api_key=${apiKey}&school.state=${stateParam}&school.city=${cityParam}`;
    }

    if (stateParam) {
      return `${baseUrl}?api_key=${apiKey}&school.state=${stateParam}`;
    }

    if (cityParam) {
      return `${baseUrl}?api_key=${apiKey}&school.city=${cityParam}`;
    }
  }

  try {
    const response = await fetch(getUrl());

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
    return res.json(colleges);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Could not fetch resource' });
  }
};
