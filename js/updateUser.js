export async function updateUser(user) {
  const token = localStorage.getItem('token');
  const response = await fetch(
    'https://media2.edu.metropolia.fi/restaurant/api/v1/users/',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer: ${token}`,
      },
      body: JSON.stringify(user),
    }
  );
  if (response.ok) {
    return response.json();
  } else {
    console.error('Error updating user:', response.statusText);
    return null;
  }
}
