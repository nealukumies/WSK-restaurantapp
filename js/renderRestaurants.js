export function renderRestaurants(restaurants) {
  const restContainer = document.querySelector('.restaurant-container');

  for (const restaurant of restaurants) {
    const restaurantDiv = document.createElement('div');
    restaurantDiv.setAttribute('class', 'restaurant');

    const img = document.createElement('img');
    img.setAttribute('class', 'restaurant-img');
    img.setAttribute('src', 'https://placecats.com/350/250');
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
