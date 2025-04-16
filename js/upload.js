import {getUserDetails} from './getUserDetails.js';
import {renderNavBar} from './renderNavBar.js';

renderNavBar();
const token = localStorage.getItem('token');
const userData = await getUserDetails(token);
if (!userData) {
  console.error('User data not found');
}
const uploadButton = document.getElementById('upload-button');
uploadButton.addEventListener('click', async (event) => {
  event.preventDefault();

  const token = localStorage.getItem('token');
  const avatarFile = document.getElementById('avatar').files[0];

  if (!avatarFile) {
    alert('Ei kuvaa valittuna');
    return;
  }

  const formData = new FormData();
  formData.append('avatar', avatarFile);

  try {
    const response = await fetch(
      'https://media2.edu.metropolia.fi/restaurant/api/v1/users/avatar',
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const responseBody = await response.json();

    console.log('Avatar Upload Response:', responseBody);

    if (response.ok) {
      alert('Avatar updated successfully!');
      window.location.href = 'profile.html';
    } else {
      alert('Error uploading avatar: ' + responseBody.message);
    }
  } catch (error) {
    console.error('Error during avatar upload:', error);
    alert('Something went wrong while uploading the avatar. Please try again.');
  }
});
