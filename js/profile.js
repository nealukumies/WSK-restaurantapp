import {getUserDetails} from './getUserDetails.js';
import {renderNavBar} from './renderNavBar.js';

renderNavBar();
const token = localStorage.getItem('token');
const userData = await getUserDetails(token);
if (!userData) {
  console.error('User data not found');
}
const profileContainer = document.querySelector('.profile');
const h2 = document.createElement('h2');
h2.innerHTML = 'Oma profiili';
const username = document.createElement('p');
const email = document.createElement('p');
username.innerHTML = 'Käyttäjätunnus: ' + userData.username;
email.innerHTML = 'Sähköposti: ' + userData.email;

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

const editButton = document.createElement('button');
editButton.innerHTML = 'Muokkaa tietoja';
editButton.addEventListener('click', () => {
  window.location.href = 'editprofile.html';
});

profileContainer.append(h2, username, email, deleteButton, editButton);
