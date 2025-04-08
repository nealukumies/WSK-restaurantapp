import {getDaily} from './getDaily.js';

export async function renderDaily(restaurant) {
  const dialog = document.querySelector('dialog');
  dialog.showModal();
  try {
    const menu = await getDaily(restaurant._id, 'fi');

    if (menu.length > 0) {
      const menuTable = document.createElement('table');
      dialog.innerHTML = '';
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
      for (const course of menu) {
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
