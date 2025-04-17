import {getDaily} from './getDaily.js';

export async function renderDaily(restaurant) {
  const dialog = document.querySelector('dialog');
  dialog.innerHTML = '';
  const existingMap = document.getElementById('map');
  if (existingMap) {
    existingMap.remove();
  }
  dialog.showModal();
  try {
    const menu = await getDaily(restaurant._id, 'fi');
    const menuTable = document.createElement('table');
    if (menu.length > 0) {
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
        console.log('course', course);
        const row = document.createElement('tr');
        const coursetd = document.createElement('td');
        coursetd.setAttribute('class', 'course-td');
        coursetd.innerHTML = course.name;
        const pricetd = document.createElement('td');
        pricetd.setAttribute('class', 'price-td');
        if (course.price) {
          pricetd.innerHTML = course.price;
        } else {
          pricetd.innerHTML = '';
        }
        row.append(coursetd, pricetd);
        tbody.appendChild(row);
      }
    } else {
      console.log('No menu available for today.');
      const noMenu = document.createElement('p');
      noMenu.innerHTML = 'Ei ruokalistaa saatavilla.';
      dialog.appendChild(noMenu);
    }
    dialog.appendChild(menuTable);
    const closeButton = document.createElement('button');
    closeButton.setAttribute('class', 'close-btn');
    closeButton.innerHTML = 'Close';
    closeButton.addEventListener('click', () => {
      dialog.close();
    });
    dialog.appendChild(closeButton);
  } catch (error) {
    console.log('Error fetching menu: ' + error.message);
  }
}
