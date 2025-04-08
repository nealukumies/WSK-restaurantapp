import {renderDaily} from './renderDaily.js';
import {renderWeekly} from './renderWeekly.js';

let mainmap;

export function viewRestaurantMap(restaurants) {
  const container = document.querySelector('.container');
  container.classList.remove('show-list');
  container.classList.add('show-map');

  const existingMap = document.getElementById('map-container');
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

  for (const restaurant of restaurants) {
    const coords = [
      restaurant.location.coordinates[1],
      restaurant.location.coordinates[0],
    ];
    const marker = L.marker(coords).addTo(mainmap);

    const popupContent = document.createElement('div');
    popupContent.setAttribute('class', 'pop-up');
    popupContent.innerHTML = `<h3>${restaurant.name}</h3>`;

    const dailyA = document.createElement('button');
    dailyA.innerHTML = 'Päivän ruokalista';
    dailyA.addEventListener('click', () => renderDaily(restaurant));
    popupContent.appendChild(dailyA);

    const weeklyA = document.createElement('button');
    weeklyA.innerHTML = 'Viikon ruokalista';
    weeklyA.addEventListener('click', () => renderWeekly(restaurant));
    popupContent.appendChild(weeklyA);

    marker.bindPopup(popupContent);
  }
}

function success(pos) {
  const crd = pos.coords;
  mainmap.setView([crd.latitude, crd.longitude], 13);

  L.marker([crd.latitude, crd.longitude])
    .addTo(mainmap)
    .bindPopup('You are here!')
    .openPopup();
}

function error(err) {
  console.warn(`ERROR(${err.code}): ${err.message}`);
}
