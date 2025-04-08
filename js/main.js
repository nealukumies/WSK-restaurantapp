import {getRestaurants} from './getRestaurants.js';
import {viewRestaurantMap} from './viewRestaurantMap.js';
import {viewRestaurantList} from './viewRestaurantList.js';

/*
        <div class="restaurant">
          <img
            class="restaurant-img"
            src="https://placecats.com/350/250"
            alt="restaurant image"
          />
          <h2 class="restaurant-name">Ravintolan nimi</h2>
          <a class="restaurant-location" href="sijaintiurl">
            Ravintolan sijainti
          </a>
          <a class="menu-today" href="ruokalistaurl">Päivän ruokalista</a>
          <a class="menu-week" href="viikonlistaurl">Viikon ruokalista</a>
        </div>
*/

async function init() {
  try {
    restaurants = await getRestaurants();
    if (restaurants && Array.isArray(restaurants)) {
      restaurants.sort((a, b) => a.name.localeCompare(b.name));
      viewRestaurantList(restaurants);
    } else {
      console.error('Failed to fetch restaurants or invalid data format.');
      const body = document.querySelector('body');
      const h2 = document.createElement('h2');
      h2.innerHTML =
        'Tarkista VPN-yhteys. Sovellus toimii vain Metropolian verkossa.';
      body.appendChild(h2);
    }
  } catch (error) {
    console.error('Error initializing the application:', error);
  }
}

let restaurants;
init();
const filter = document.querySelector('.filter');
const listButton = document.createElement('button');
listButton.innerHTML = 'Näytä listana';
listButton.addEventListener('click', () => viewRestaurantList(restaurants));
filter.appendChild(listButton);

const mapButton = document.createElement('button');
mapButton.innerHTML = 'Näytä kartalla';
mapButton.addEventListener('click', () => viewRestaurantMap(restaurants));
filter.appendChild(mapButton);
