export async function getCities(restaurants) {
  const citySet = new Set();
  for (const restaurant of restaurants) {
    console.log(restaurant.city);
    citySet.add(restaurant.city);
  }
  return Array.from(citySet).sort();
}
