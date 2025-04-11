import {getRestaurants} from './getRestaurants.js';
import {viewRestaurantMap} from './viewRestaurantMap.js';
import {viewRestaurantList} from './viewRestaurantList.js';
import {showDropdown} from './showDropDown.js';
import {fetchUserDetails} from './fetchUserDetails.js';

async function init() {
  try {
    document.addEventListener('DOMContentLoaded', () => {
      const token = localStorage.getItem('token');

      if (token) {
        document.getElementById('register-link').style.display = 'none';
        document.getElementById('login-link').style.display = 'none';
        document.getElementById('profile-link').style.display = 'inline-block';
        document.getElementById('logout-link').style.display = 'inline-block';

        fetchUserDetails(token);

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
        showDropdown({
          restaurants,
          filterKey: 'city',
          dropdownClass: '.dropdown-content',
          inputSelector: '.city-input',
        });
      });

      const companyInput = document.querySelector('.company-input');
      companyInput.addEventListener('focus', () => {
        showDropdown({
          restaurants,
          filterKey: 'company',
          dropdownClass: '.dropdown-content-company',
          inputSelector: '.company-input',
        });
      });

      const nameInput = document.querySelector('.name-input');
      nameInput.addEventListener('focus', () => {
        showDropdown({
          restaurants,
          filterKey: 'name',
          dropdownClass: '.dropdown-content-name',
          inputSelector: '.name-input',
        });
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
