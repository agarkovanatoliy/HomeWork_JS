// Задание 1
// 1. Поиск в интернете (бесплатные api примеры).
// 2. Найти любые данные, на произвольную тему.
// 3. Создать файл data.js.
// 4. Создать переменную которая будет хранить данные из публичных api.

// Задание 2
// 1. Создать файл index.html.
// 2. Подключить data.js.
// 3. Сформировать контент из данных (картинка загловок и параграф).
// 4. Добавить данный контент в вёрстку.
// 5. * Добавить стили при необходимости (по желанию).



const ulEl = document.querySelector('.country');
console.log(ulEl);
const url1 = 'https://testapi.devtoolsdaily.com/countries/';

fetch(url1)
    .then((resp) => resp.json())
    .then(function(data) {
        const  parsData = data;
        parsData.forEach(el => {
            ulEl.insertAdjacentHTML('beforeend',`
                <li class="country__li">
                        <span class="country__nameCountry">${el.name}</span>
                        <div>
                            <span class="country__code"> iso2: </span>
                            <span>${el.iso2}</span>
                            <span class="country__code"> iso3:</span>
                            <span> ${el.iso3}</span>
                        </div>
                </li>
            `)
        })
    })
    .catch(function(error) {
    console.log(error);
});

