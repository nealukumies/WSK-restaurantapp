export async function getSortedValues(restaurants, key) {
  const valueSet = new Set();

  for (const restaurant of restaurants) {
    valueSet.add(restaurant[key]);
  }

  return Array.from(valueSet).sort();
}
