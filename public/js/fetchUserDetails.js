export async function fetchUserDetails() {
  const response = await fetch('http://localhost:3000/api/v1/auth/me', {
    credentials: 'include',
  });

  if (response.ok) {
    const data = await response.json();
    console.log('User:', data.user);
    return data.user;
  } else return null;
}
