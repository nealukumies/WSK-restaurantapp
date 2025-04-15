import {getUserDetails} from './getUserDetails.js';

export function renderNavBar() {
  document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (token) {
      document.getElementById('register-link').style.display = 'none';
      document.getElementById('login-link').style.display = 'none';
      document.getElementById('profile-link').style.display = 'inline-block';
      document.getElementById('logout-link').style.display = 'inline-block';

      getUserDetails(token);

      document.getElementById('logout-link').addEventListener('click', () => {
        localStorage.removeItem('token');
        window.location.reload();
      });
    } else {
      document.getElementById('register-link').style.display = 'inline-block';
      document.getElementById('login-link').style.display = 'inline-block';
      document.getElementById('profile-link').style.display = 'none';
      document.getElementById('logout-link').style.display = 'none';
    }
  });
}
