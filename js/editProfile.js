import {getUserDetails} from './getUserDetails.js';
import {renderNavBar} from './renderNavBar.js';

renderNavBar();
const token = localStorage.getItem('token');
const userData = await getUserDetails(token);
if (!userData) {
  console.error('User data not found');
}
const profileContainer = document.querySelector('.edit-profile');
const username = document.getElementById('username');
const email = document.getElementById('email');
username.value = userData.username;
email.value = userData.email;

const deleteButton = document.createElement('button');
deleteButton.innerHTML = 'Poista tili';
deleteButton.addEventListener('click', async () => {
  const response = await fetch(
    'https://media2.edu.metropolia.fi/restaurant/api/v1/users/',
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer: ${token}`,
      },
    }
  );
  if (response.ok) {
    alert('Käyttäjä poistettu onnistuneesti!');
    localStorage.removeItem('token');
    window.location.href = 'index.html';
  } else {
    alert('Virhe käyttäjän poistamisessa.');
  }
});

const editButton = document.getElementById('edit-button');
editButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const updatedUsername = username.value;
  const updatedEmail = email.value;
  console.log('Updating user data:', {
    username: updatedUsername,
    email: updatedEmail,
  });

  const response = await fetch(
    'https://media2.edu.metropolia.fi/restaurant/api/v1/users/',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer: ${token}`,
      },
      body: JSON.stringify({
        username: updatedUsername,
        email: updatedEmail,
      }),
    }
  );
  console.log(response);
  if (response.ok) {
    alert('Käyttäjätiedot päivitetty onnistuneesti!');
    window.location.href = 'profile.html';
  } else {
    alert('Virhe käyttäjätietojen päivittämisessä.');
  }
});

profileContainer.appendChild(deleteButton);
