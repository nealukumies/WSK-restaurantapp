export async function getDaily(id, lang) {
  try {
    const response = await fetch(
      `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/daily/${id}/${lang}`
    );
    const jsonData = await response.json();
    return jsonData.courses;
  } catch (error) {
    console.log(error.message);
  }
}
