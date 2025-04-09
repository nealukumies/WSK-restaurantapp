import {getRestaurants} from './getRestaurants.js';
import {viewRestaurantMap} from './viewRestaurantMap.js';
import {viewRestaurantList} from './viewRestaurantList.js';
import {showCities} from './showCities.js';
import {showCompanies} from './showCompanies.js';

async function init() {
  try {
    const restaurants = await getRestaurants();
    if (restaurants && Array.isArray(restaurants)) {
      restaurants.sort((a, b) => a.name.localeCompare(b.name));
      viewRestaurantList(restaurants);

      const listButton = document.querySelector('.list-button');
      listButton.addEventListener('click', () =>
        viewRestaurantList(restaurants)
      );

      const mapButton = document.querySelector('.map-button');
      mapButton.addEventListener('click', () => viewRestaurantMap(restaurants));

      const cityInput = document.querySelector('.city-input');
      cityInput.addEventListener('focus', () => {
        showCities(restaurants);
      });

      cityInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredRestaurants = restaurants.filter((restaurant) =>
          restaurant.city.toLowerCase().startsWith(searchTerm)
        );
        showCities(filteredRestaurants);
      });

      const companyInput = document.querySelector('.company-input');
      companyInput.addEventListener('focus', () => {
        showCompanies(restaurants);
      });

      companyInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        const filteredRestaurants = restaurants.filter((restaurant) =>
          restaurant.company.toLowerCase().startsWith(searchTerm)
        );
        showCompanies(filteredRestaurants);
      });
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

init();
