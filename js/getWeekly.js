export async function getWeekly(id, lang) {
  try {
    const response = await fetch(
      `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/weekly/${id}/${lang}`
    );
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData.days;
  } catch (error) {
    console.log(error.message);
  }
}
