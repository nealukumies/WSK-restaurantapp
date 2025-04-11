const form = document.querySelector('form');
form.addEventListener('submit', async function (event) {
  event.preventDefault();

  const formData = new FormData(form);
  const data = {
    name: formData.get('name'),
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  };

  try {
    const response = await fetch('http://localhost:3000/api/v1/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (response.ok) {
      alert(result.message + ' ID: ' + result.result.user_id);
    } else {
      alert('Error: ' + result.message);
    }
  } catch (error) {
    alert('Error: ' + error.message);
  }
});
