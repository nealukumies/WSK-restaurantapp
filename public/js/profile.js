import {fetchUserDetails} from './fetchUserDetails';

const userData = await fetchUserDetails;

const profileContainer = document.querySelector('.profile');
const h2 = document.createElement('h2');
h2.innerHTML = 'Oma profiili';
const name = document.createElement('p');
const username = document.createElement('p');
const email = document.createElement('p');
const role = document.createElement('p');
name.innerHTML = 'Nimi: ' + userData.name;
username.innerHTML = 'Käyttäjätunnus: ' + userData.username;
email.innerHTML = 'Sähköposti: ' + userData.email;
role.innerHTML = 'Rooli: ' + userData.role;
profileContainer.append(h2, name, username, email, role);
