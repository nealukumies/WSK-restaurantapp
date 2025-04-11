export async function getNames(restaurants) {
  const nameSet = new Set();
  for (const restaurant of restaurants) {
    nameSet.add(restaurant.name);
  }
  return Array.from(nameSet).sort();
}
