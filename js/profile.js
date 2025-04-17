import {getRestaurantById} from './getRestaurantById.js';
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
profileContainer.append(h2);

const profileCard = document.createElement('div');
profileCard.setAttribute('class', 'profile-card');

const profileDetails = document.createElement('div');
profileDetails.setAttribute('class', 'profile-details');
const username = document.createElement('p');
const email = document.createElement('p');
username.innerHTML = 'Käyttäjätunnus: ' + userData.username;
email.innerHTML = 'Sähköposti: ' + userData.email;
const favoriteRestaurant = document.createElement('p');
if (userData.favouriteRestaurant) {
  const restaurant = await getRestaurantById(userData.favouriteRestaurant);
  favoriteRestaurant.innerHTML = 'Suosikkiravintola: ' + restaurant.name;
} else {
  favoriteRestaurant.innerHTML = 'Suosikkiravintola: Ei valittuna';
}

const imageContainer = document.createElement('div');
imageContainer.setAttribute('class', 'profile-image');
const avatar = document.createElement('img');
avatar.src = userData.avatar
  ? `https://media2.edu.metropolia.fi/restaurant/uploads/${userData.avatar}`
  : 'https://placehold.co/100?text=No+image+available';
avatar.alt = 'Käyttäjän kuva';
avatar.style.width = '200px';

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

const uploadButton = document.createElement('button');
if (userData.avatar) {
  uploadButton.innerHTML = 'Päivitä kuva';
} else {
  uploadButton.innerHTML = 'Lisää kuva';
}
uploadButton.addEventListener('click', () => {
  window.location.href = 'upload.html';
});

imageContainer.appendChild(avatar);
profileDetails.append(
  username,
  email,
  favoriteRestaurant,
  deleteButton,
  editButton,
  uploadButton
);
profileCard.append(imageContainer, profileDetails);
profileContainer.appendChild(profileCard);
