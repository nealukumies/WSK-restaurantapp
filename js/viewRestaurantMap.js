let mainmap;

export function viewRestaurantMap(restaurants) {
  const container = document.querySelector('.container');
  container.classList.remove('show-list');
  container.classList.add('show-map');

  const mapContainer = document.querySelector('.map-container');
  mapContainer.innerHTML = '';
  mapContainer.style.display = 'block';

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
    L.marker(coords)
      .addTo(mainmap)
      .bindPopup(`<h3>${restaurant.name}</h3><p>${restaurant.address}</p>`);
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
