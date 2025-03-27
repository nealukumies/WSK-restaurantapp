export function renderRestaurants(restaurants) {
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

    const locationA = document.createElement('a');
    locationA.setAttribute('href', 'sijaintiurl');
    locationA.innerHTML = 'Sijainti';

    const dailyA = document.createElement('a');
    dailyA.setAttribute('href', 'sruokalistaurl');
    dailyA.innerHTML = 'Päivän ruokalista';

    const weeklyA = document.createElement('a');
    weeklyA.setAttribute('href', 'viikonurl');
    weeklyA.innerHTML = 'Viikon ruokalista';

    restaurantDiv.append(img, h2, locationA, dailyA, weeklyA);
    restContainer.appendChild(restaurantDiv);
  }
}
