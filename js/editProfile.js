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
  const avatarFile = document.getElementById('avatar').files[0];

  const formData = new FormData();
  formData.append('username', updatedUsername);
  formData.append('email', updatedEmail);
  if (avatarFile) {
    formData.append('avatar', avatarFile);
  }

  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/users/',
      {
        method: 'PUT',
        headers: {
          Authorization: `Bearer: ${token}`,
        },
        body: formData,
      }
    );
    if (response.ok) {
      alert('Käyttäjätiedot päivitetty onnistuneesti!');
      window.location.href = 'profile.html';
    } else {
      alert('Virhe käyttäjätietojen päivittämisessä.');
    }
  } catch (error) {
    console.error('Error during update:', error);
    alert('Jotain meni pieleen. Yritä uudelleen.');
  }
});

profileContainer.appendChild(deleteButton);
