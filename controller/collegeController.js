export const getColleges = async (req, res) => {
  const baseUrl = process.env.COLLEGE_API_BASE_URL;
  const apiKey = process.env.COLLEGE_API_KEY;
  const colleges = [];

  const { stateParam, cityParam } = req.query;

  function getUrl(baseUrl, apiKey, stateParam, cityParam) {
    const url = new URL(baseUrl);
    url.searchParams.set('api_key', apiKey);

    if (stateParam) url.searchParams.set('school.state', stateParam);
    if (cityParam) url.searchParams.set('school.city', cityParam);

    return url.toString();
  }

  try {
    const response = await fetch(
      getUrl(baseUrl, apiKey, stateParam, cityParam),
    );

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
    return res.json({ metaData: data.metadata, colleges: colleges });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Could not fetch resource' });
  }
};
