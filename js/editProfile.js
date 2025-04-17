import {getUserDetails} from './getUserDetails.js';
import {renderNavBar} from './renderNavBar.js';
import {updateUser} from './updateUser.js';

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

const modal = document.getElementById('confirmModal');
const confirmYes = document.getElementById('confirmYes');
const confirmNo = document.getElementById('confirmNo');
const deleteButton = document.createElement('button');
deleteButton.innerHTML = 'Poista tili';
deleteButton.addEventListener('click', async () => {
  // Show the modal
  modal.style.display = 'block';
});

// Handle "Yes" button click
confirmYes.addEventListener('click', async () => {
  modal.style.display = 'none'; // Hide modal
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

// Handle "No" button click
confirmNo.addEventListener('click', () => {
  modal.style.display = 'none'; // Hide modal
});

const editButton = document.getElementById('edit-button');
editButton.addEventListener('click', async (event) => {
  event.preventDefault();
  const updatedUsername = username.value;
  const updatedEmail = email.value;
  const user = {
    username: updatedUsername,
    email: updatedEmail,
  };
  const response = await updateUser(user);
  if (response) {
    alert('Käyttäjätiedot päivitetty onnistuneesti!');
    window.location.href = 'profile.html';
  } else {
    alert('Virhe käyttäjätietojen päivittämisessä.');
  }
});

profileContainer.appendChild(deleteButton);
