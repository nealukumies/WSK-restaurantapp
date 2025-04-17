import {getUserDetails} from './getUserDetails.js';
import {renderDaily} from './renderDaily.js';
import {renderWeekly} from './renderWeekly.js';
import {updateUser} from './updateUser.js';

let mainmap;

export async function viewRestaurantMap(restaurants) {
  const container = document.querySelector('.container');
  container.classList.remove('show-list');
  container.classList.add('show-map');

  const existingMap = document.getElementById('map');
  if (existingMap) existingMap.remove();

  const mapContainer = document.createElement('div');
  mapContainer.setAttribute('id', 'map');
  mapContainer.classList.add('map-container');
  mapContainer.style.display = 'block';

  mapContainer.innerHTML = '';
  mapContainer.style.display = 'block';
  container.appendChild(mapContainer);

  const options = {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0,
  };

  if (mainmap) {
    mainmap.remove();
  }
  mainmap = L.map('map').setView([60.188222, 24.829696], 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(mainmap);

  navigator.geolocation.getCurrentPosition(success, error, options);
  const token = localStorage.getItem('token');
  const user = token ? await getUserDetails(token) : null;

  for (const restaurant of restaurants) {
    const coords = [
      restaurant.location.coordinates[1],
      restaurant.location.coordinates[0],
    ];
    const marker = L.marker(coords).addTo(mainmap);

    const popupContent = document.createElement('div');
    popupContent.setAttribute('class', 'pop-up');
    popupContent.innerHTML = `<h3>${restaurant.name}</h3>`;
    popupContent.innerHTML += `<p>${restaurant.address}</p>`;
    popupContent.innerHTML += `<p>${restaurant.city}</p>`;

    const dailyA = document.createElement('button');
    dailyA.innerHTML = 'Päivän ruokalista';
    dailyA.addEventListener('click', () => renderDaily(restaurant));
    popupContent.appendChild(dailyA);

    const weeklyA = document.createElement('button');
    weeklyA.innerHTML = 'Viikon ruokalista';
    weeklyA.addEventListener('click', () => renderWeekly(restaurant));
    popupContent.appendChild(weeklyA);

    if (user) {
      let favorite;
      if (user.favouriteRestaurant === restaurant._id) {
        favorite = document.createElement('p');
        favorite.setAttribute('class', 'favorite-p');
        favorite.textContent = '⭐ Suosikki ⭐';
      } else {
        favorite = document.createElement('button');
        favorite.innerHTML = 'Lisää suosikkeihin';

        favorite.addEventListener('click', async () => {
          console.log('Restaurant id:', restaurant._id);
          const response = await updateUser({
            favouriteRestaurant: restaurant._id,
          });
          if (response) {
            console.log('Favorite restaurant added:', response);
            alert('Ravintola lisätty suosikkeihin!');
            window.location.reload();
          }
        });
      }
      popupContent.appendChild(favorite);
    }

    marker.bindPopup(popupContent);
  }
}

function success(pos) {
  const crd = pos.coords;
  mainmap.setView([crd.latitude, crd.longitude], 13);

  L.marker([crd.latitude, crd.longitude])
    .addTo(mainmap)
    .bindPopup('Olet täällä!')
    .openPopup();
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
  const fallbackLocation = [60.188222, 24.829696];
  mainmap.setView(fallbackLocation, 13);
  L.marker(fallbackLocation)
    .addTo(mainmap)
    .bindPopup('Sijaintiasi ei voitu löytää, käytetään oletuspaikkaa.')
    .openPopup();
}
