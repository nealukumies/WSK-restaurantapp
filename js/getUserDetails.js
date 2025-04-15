export async function getUserDetails(token) {
  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/users/token',
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer: ${token}`,
        },
      }
    );
    const jsonData = await response.json();
    console.log(jsonData);
    return jsonData;
  } catch (error) {
    console.log('Failed to get user details ' + error.message);
  }
}
