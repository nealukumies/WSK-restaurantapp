const form = document.querySelector('form');
form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  const data = {
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/users',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );

    const result = await response.json();

    if (response.ok) {
      window.location.href = 'login.html';
    } else {
      alert('Käyttäjätunnus tai sähköposti on jo käytössä!');
      console.log('Error: ' + result.message);
    }
  } catch (error) {
    console.log('Error: ' + error.message);
  }
});
