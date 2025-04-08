import {getWeekly} from './getWeekly.js';

export async function renderWeekly(restaurant) {
  const dialog = document.querySelector('dialog');
  dialog.innerHTML = '';
  dialog.showModal();
  try {
    const days = await getWeekly(restaurant._id, 'fi');
    console.log(days);
    if (days.length > 0) {
      for (const day of days) {
        const h2 = document.createElement('h2');
        h2.innerHTML = day.date;
        dialog.appendChild(h2);
        const menuTable = document.createElement('table');

        menuTable.innerHTML = `
            <thead>
              <tr>
              <th>Ruoka</th>
              <th>Hinta</th>
              </tr>
            </thead>
            <tbody>
            </tbody>
            `;
        const tbody = menuTable.querySelector('tbody');
        console.log(day.courses);
        for (const course of day.courses) {
          const row = document.createElement('tr');
          const coursetd = document.createElement('td');
          coursetd.setAttribute('class', 'course-td');
          coursetd.innerHTML = course.name;
          const pricetd = document.createElement('td');
          pricetd.setAttribute('class', 'price-td');
          pricetd.innerHTML = course.price;
          row.append(coursetd, pricetd);
          tbody.appendChild(row);
        }
        dialog.appendChild(menuTable);
      }
      const closeButton = document.createElement('button');
      closeButton.setAttribute('class', 'close-btn');
      closeButton.innerHTML = 'Close';
      closeButton.addEventListener('click', () => {
        dialog.close();
      });
      dialog.appendChild(closeButton);
    }
  } catch (error) {
    console.log('Error fetching menu');
  }
}
