export async function getRestaurantById(id) {
  try {
    const response = await fetch(
      `https://media2.edu.metropolia.fi/restaurant/api/v1/restaurants/${id}`
    );
    const jsonData = await response.json();
    return jsonData;
  } catch (error) {
    console.error('Failed to get restaurant: ' + error.message);
  }
}
