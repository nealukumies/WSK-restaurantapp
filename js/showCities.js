import {getCities} from './getCities.js';
import {viewRestaurantList} from './viewRestaurantList.js';

export async function showCities(restaurants) {
  const dropdownContent = document.querySelector('.dropdown-content');
  dropdownContent.innerHTML = '';
  const cities = await getCities(restaurants);
  const input = document.querySelector('.city-input');
  const allLi = document.createElement('li');
  allLi.innerHTML = 'Kaikki ravintolat';
  allLi.addEventListener('click', () => {
    input.value = 'Kaikki ravintolat';
    viewRestaurantList(restaurants);
    dropdownContent.style.display = 'none';
  });
  dropdownContent.appendChild(allLi);
  for (const city of cities) {
    const li = document.createElement('li');
    li.innerHTML = city;
    li.addEventListener('click', () => {
      input.value = city;

      const filteredRestaurants = restaurants.filter(
        (restaurant) => restaurant.city.toLowerCase() === city.toLowerCase()
      );

      viewRestaurantList(filteredRestaurants);
      dropdownContent.style.display = 'none';
    });
    dropdownContent.appendChild(li);
  }

  dropdownContent.style.display = cities.length > 0 ? 'block' : 'none';
}
