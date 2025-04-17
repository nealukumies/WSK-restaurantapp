import {getUserDetails} from './getUserDetails.js';
import {renderDaily} from './renderDaily.js';
import {renderWeekly} from './renderWeekly.js';
import {showMap} from './showMap.js';
import {updateUser} from './updateUser.js';

export async function viewRestaurantList(restaurants) {
  const token = localStorage.getItem('token');
  let user = null;
  if (token) {
    user = await getUserDetails(token);
  }
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
  if (!restContainer) {
    console.error('No .restaurant-container found in the DOM');
    return;
  }
  for (let i = 0; i < restaurants.length; i++) {
    const restaurant = restaurants[i];

    // Clear the container before rendering new restaurants
    if (i === 0) {
      restContainer.innerHTML = '';
    }

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

    let favorite;
    if (user && user.favouriteRestaurant === restaurant._id) {
      favorite = document.createElement('p');
      favorite.setAttribute('class', 'favorite-p');
      favorite.textContent = '⭐ Suosikki ⭐';
    } else {
      favorite = document.createElement('button');
      favorite.innerHTML = 'Lisää suosikkeihin';

      favorite.addEventListener('click', async () => {
        console.log('Restaurant id:', restaurant._id);
        const response = await updateUser({
          favouriteRestaurant: restaurant._id,
        });
        if (response) {
          alert('Ravintola lisätty suosikkeihin!');
          window.location.reload();
        }
      });
    }

    restaurantDiv.append(img, h2, locationA, dailyA, weeklyA);

    if (user) {
      restaurantDiv.appendChild(favorite);
    }
    restContainer.appendChild(restaurantDiv);
  }
}
