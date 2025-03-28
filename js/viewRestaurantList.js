import {renderDaily} from './renderDaily.js';
import {renderWeekly} from './renderWeekly.js';
import {showMap} from './showMap.js';

export function viewRestaurantList(restaurants) {
  const container = document.querySelector('.container');
  container.classList.remove('show-map');
  container.classList.add('show-list');

  const restContainer = document.querySelector('.restaurant-container');

  const foodImages = [
    './img/food1.jpg',
    './img/food2.jpg',
    './img/food3.jpg',
    './img/food4.jpg',
    './img/food5.jpg',
    './img/food6.jpg',
    './img/food7.jpg',
    './img/food8.jpg',
    './img/food9.jpg',
    './img/food10.jpg',
  ];

  for (let i = 0; i < restaurants.length; i++) {
    const restaurant = restaurants[i];

    const restaurantDiv = document.createElement('div');
    restaurantDiv.setAttribute('class', 'restaurant');

    const img = document.createElement('img');
    img.setAttribute('class', 'restaurant-img');
    img.setAttribute('src', foodImages[i % foodImages.length]);
    img.setAttribute('alt', 'restaurant image');

    const h2 = document.createElement('h2');
    h2.setAttribute('class', 'restaurant-name');
    h2.innerHTML = restaurant.name;

    const locationA = document.createElement('button');
    locationA.innerHTML = 'Sijainti';
    locationA.addEventListener('click', () => showMap(restaurant));

    const dailyA = document.createElement('button');
    dailyA.innerHTML = 'Päivän ruokalista';
    dailyA.addEventListener('click', () => renderDaily(restaurant));

    const weeklyA = document.createElement('button');
    weeklyA.innerHTML = 'Viikon ruokalista';
    weeklyA.addEventListener('click', () => renderWeekly(restaurant));

    restaurantDiv.append(img, h2, locationA, dailyA, weeklyA);
    restContainer.appendChild(restaurantDiv);
  }
}
