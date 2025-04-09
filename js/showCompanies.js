import {getCities} from './getCities.js';
import {viewRestaurantList} from './viewRestaurantList.js';

export async function showCities(restaurants) {
  const dropdownContent = document.querySelector('.dropdown-content-company');
  dropdownContent.innerHTML = '';
  const companies = await getCompanies(restaurants);
  const input = document.querySelector('.company-input');
  const allLi = document.createElement('li');
  allLi.innerHTML = 'Kaikki palveluntarjojat';
  allLi.addEventListener('click', () => {
    input.value = 'Kaikki palveluntarjoajat';
    viewRestaurantList(restaurants);
    dropdownContent.style.display = 'none';
  });
  dropdownContent.appendChild(allLi);
  for (const company of companies) {
    const li = document.createElement('li');
    li.innerHTML = company;
    li.addEventListener('click', () => {
      input.value = company;

      const filteredRestaurants = restaurants.filter(
        (restaurant) =>
          restaurant.company.toLowerCase() === company.toLowerCase()
      );

      viewRestaurantList(filteredRestaurants);
      dropdownContent.style.display = 'none';
    });
    dropdownContent.appendChild(li);
  }

  dropdownContent.style.display = companies.length > 0 ? 'block' : 'none';
}
