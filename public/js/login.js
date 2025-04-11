const loginForm = document.getElementById('login-form');
loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const response = await fetch('http://localhost:3000/api/v1/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password}),
  });
  try {
    if (response.ok) {
      const result = await response.json();

      console.log('Login result:', result);
      alert(
        'Logged in as: ' + result.user.username + ' (' + result.user.role + ')'
      );
      localStorage.setItem('token', result.token); // Save token in localStorage
      console.log('Token saved to localStorage:', result.token); // Log to confirm token is saved

      // Redirect to index page
      window.location.href = '/index.html';
    } else {
      // If the response is not ok, throw an error
      const error = await response.json(); // Assuming error details are in JSON format
      throw new Error(error.message || 'Login failed');
    }
  } catch (error) {
    // Catch any errors thrown by the try block, including those from failed responses
    console.error('Error:', error);
    alert(`Käyttäjänimi tai salasana väärin!`);
  }
});
