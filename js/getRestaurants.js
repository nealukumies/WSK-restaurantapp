export async function getRestaurants() {
  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants'
    );
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Failed to get restaurants: ' + error.message);
  }
}
