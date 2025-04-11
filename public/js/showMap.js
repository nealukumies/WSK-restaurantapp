export function showMap(restaurant) {
  const dialog = document.querySelector('dialog');
  dialog.classList.add('map-modal');
  dialog.innerHTML = '';
  dialog.showModal();
  const existingMap = document.getElementById('map');
  if (existingMap) {
    existingMap.remove();
  }
  const mapContainer = document.createElement('div');
  mapContainer.id = 'map';
  mapContainer.style.width = '100%';
  mapContainer.style.height = '400px';
  dialog.appendChild(mapContainer);
  const coords = [
    restaurant.location.coordinates[1],
    restaurant.location.coordinates[0],
  ];
  let map = L.map('map').setView(coords, 13);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker(coords)
    .addTo(map)
    .bindPopup(`<h3>${restaurant.name}</h3><p>${restaurant.address}</p>`)
    .openPopup();

  const closeButton = document.createElement('button');
  closeButton.setAttribute('class', 'close-btn');
  closeButton.innerHTML = 'Close';
  closeButton.addEventListener('click', () => {
    dialog.close();
  });
  dialog.appendChild(closeButton);
  
}
