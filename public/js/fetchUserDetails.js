export async function fetchUserDetails(token) {
  fetch('http://localhost:3000/api/v1/auth/me', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.user) {
        document.getElementById(
          'profile-link'
        ).innerText = `Profiili (${data.user.name})`;
      }
    })
    .catch((error) => {
      console.error('Error fetching user data:', error);
    });
}
