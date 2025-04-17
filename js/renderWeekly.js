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
        if (day.courses.length > 0) {
          menuTable.innerHTML = `
            <thead>
              <tr>
              <th>Ruoka</th>
              <th>Hinta</th>
              </tr>
            </thead>
            `;
          console.log(day.courses);
          const tbody = document.createElement('tbody');
          for (const course of day.courses) {
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
          menuTable.appendChild(tbody);
        } else {
          const noMenu = document.createElement('p');
          noMenu.textContent = 'Ei ruokalistaa tälle päivälle.';
          dialog.appendChild(noMenu);
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
    } else {
      const noMenu = document.createElement('p');
      noMenu.textContent = 'Ei ruokalistaa saatavilla.';
      dialog.appendChild(noMenu);
      const closeButton = document.createElement('button');
      closeButton.setAttribute('class', 'close-btn');
      closeButton.innerHTML = 'Close';
      closeButton.addEventListener('click', () => {
        dialog.close();
      });
      dialog.appendChild(closeButton);
    }
  } catch (error) {
    console.log('Error fetching menu: ' + error.message);
  }
}
