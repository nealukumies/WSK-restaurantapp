import {getRestaurants} from './getRestaurants.js';
import {viewRestaurantMap} from './viewRestaurantMap.js';
import {viewRestaurantList} from './viewRestaurantList.js';
import {showDropdown} from './showDropDown.js';
import {renderNavBar} from './renderNavBar.js';
import {getUserDetails} from './getUserDetails.js';
import {getRestaurantById} from './getRestaurantById.js';

async function init() {
  const token = localStorage.getItem('token');
  try {
    renderNavBar();

    const restaurants = await getRestaurants();
    if (restaurants && Array.isArray(restaurants)) {
      restaurants.sort((a, b) => a.name.localeCompare(b.name));
      viewRestaurantList(restaurants);

      if (token) {
        const user = await getUserDetails(token);
        if (user && user.favouriteRestaurant) {
          const favoriteButton = document.createElement('button');
          const favoriteRestaurant = await getRestaurantById(
            user.favouriteRestaurant
          );
          favoriteButton.innerHTML = favoriteRestaurant.name;
          const filterBar = document.querySelector('.filter');
          favoriteButton.addEventListener('click', () => {
            viewRestaurantList([favoriteRestaurant]);
          });
          filterBar.prepend(favoriteButton);
        }
      }
      const listButton = document.querySelector('.list-button');
      listButton.addEventListener('click', () => {
        const filterInputs = document.querySelector('.filter-inputs');
        if (filterInputs) filterInputs.style.display = 'block';
        viewRestaurantList(restaurants);
      });

      const mapButton = document.querySelector('.map-button');
      mapButton.addEventListener('click', () => {
        const filterInputs = document.querySelector('.filter-inputs');
        if (filterInputs) filterInputs.style.display = 'none';
        viewRestaurantMap(restaurants);
      });

      const filterInputs = document.querySelector('.filter-inputs');

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
      filterInputs.append(cityInput, companyInput, nameInput);
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
