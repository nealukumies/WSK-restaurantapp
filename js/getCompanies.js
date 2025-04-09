export async function getCompanies(restaurants) {
  const companySet = new Set();
  for (const restaurant of restaurants) {
    console.log(restaurant.company);
    companySet.add(restaurant.company);
  }
  return Array.from(citySet).sort();
}
