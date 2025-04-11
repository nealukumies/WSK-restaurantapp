import {getSortedValues} from './getSortedValues.js';
import {viewRestaurantList} from './viewRestaurantList.js';

export async function showDropdown({
  restaurants,
  filterKey,
  dropdownClass,
  inputSelector,
}) {
  const dropdownContent = document.querySelector(dropdownClass);
  const input = document.querySelector(inputSelector);
  const items = await getSortedValues(restaurants, filterKey);

  function renderList(filter = '') {
    dropdownContent.innerHTML = '';

    const allLi = document.createElement('li');
    allLi.innerHTML = 'Kaikki';
    allLi.addEventListener('click', () => {
      viewRestaurantList(restaurants);
      dropdownContent.style.display = 'none';
    });
    dropdownContent.appendChild(allLi);

    for (const item of items) {
      if (!item.toLowerCase().startsWith(filter.toLowerCase())) continue;

      const li = document.createElement('li');
      li.innerHTML = item;
      li.addEventListener('click', () => {
        const filteredRestaurants = restaurants.filter(
          (restaurant) =>
            restaurant[filterKey].toLowerCase() === item.toLowerCase()
        );
        viewRestaurantList(filteredRestaurants);
        input.value = '';
        dropdownContent.style.display = 'none';
      });
      dropdownContent.appendChild(li);
    }

    dropdownContent.style.display =
      dropdownContent.children.length > 1 ? 'block' : 'none';
  }

  renderList();
  input.addEventListener('input', () => renderList(input.value));
  document.addEventListener('click', (event) => {
    if (
      !dropdownContent.contains(event.target) &&
      !input.contains(event.target)
    ) {
      dropdownContent.style.display = 'none';
    }
  });
}
