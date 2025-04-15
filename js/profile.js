import {getUserDetails} from './getUserDetails.js';

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
profileContainer.append(h2, username, email);
