const itemsUl = document.querySelector('ul#items');
const itemInput = document.querySelector('input#item');
const form = document.querySelector('form#itemForm');
const itemsArray = [];
const clearButton = document.querySelector('button#clear');

function getItems() {
  if (itemsArray.length > 0) {
    itemsUl.innerHTML = '';
    itemsArray.forEach((item, index) => {
      const li = document.createElement('li');
      li.innerHTML = `<input type="text" value="${item}" readonly /> <span class="removeItem btn btn-small btn-primary float-right">Usuń przedmiot</span>`;
      li.classList.add('list-group-item');
      li.setAttribute('data-id', index);
      itemsUl.appendChild(li);
    });
  } else {
    itemsUl.textContent = 'Narazie nie pakujesz nic więcej.';
  }
}

getItems();

function populateItemsArray() {
  if (localStorage.getItem('items') !== null) {
    const items = JSON.parse(localStorage.getItem('items'));
    items.forEach((item) => {
      itemsArray.push(item);
    });
  }
}
populateItemsArray();

function addInputDblClickEvents() {
  const inputs = document.querySelectorAll('ul#items input[type="text"]');

  inputs.forEach((input) => {
    input.addEventListener('dblclick', function (e) {
      e.target.removeAttribute('readonly');
    });
    input.addEventListener('blur', function (e) {
      e.target.setAttribute('readonly', true);
    });
    input.addEventListener('change', function (e) {
      const index = e.target.parentElement.dataset.id;
      itemsArray[index] = e.target.value;
      localStorage.setItem('items', JSON.stringify(itemsArray));
    });
  });
}

function addRemoveItemClickEvents() {
  const spans = document.querySelectorAll('ul#items span.removeItem');

  spans.forEach((span) => {
    span.addEventListener('click', function (e) {
      const removeSpan = e.target;
      const index = e.target.parentElement.dataset.id;
      itemsArray.splice(index, 1);
      localStorage.setItem('items', JSON.stringify(itemsArray));
      removeSpan.parentElement.remove();
    });
  });
}

form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (itemInput.value !== '') itemsArray.push(itemInput.value);
  itemInput.value = '';
  localStorage.setItem('items', JSON.stringify(itemsArray));
  getItems();
  addInputDblClickEvents();
  addRemoveItemClickEvents();
});

clearButton.addEventListener('click', function () {
  localStorage.clear();
  itemsUl.textContent = 'Nic wiecej nie bierzesz?';
});
addInputDblClickEvents();
addRemoveItemClickEvents();

// Pogodynka

const api = {
  key: 'e711423123defaecab4fcd7b9df89c3a',
  base: 'http://api.openweathermap.org/data/2.5/',
};

function dateBuilder(d) {
  const months = [
    'Styczeń',
    'Luty',
    'Marzec',
    'Kwiecień',
    'Maj',
    'Czerwiec',
    'Lipiec',
    'Sierpień',
    'Wrzesień',
    'Październik',
    'Listopad',
    'Grudzień',
  ];
  const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];

  const day = days[d.getDay()];
  const date = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}

function displayResults(weather) {
  const city = document.querySelector('.location .city');
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  const now = new Date();
  const date = document.querySelector('.location .date');
  date.innerText = dateBuilder(now);

  const temp = document.querySelector('.current .temp');
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  const weatherEl = document.querySelector('.current .weather');
  weatherEl.innerHTML = `<img class="icon-weather" src="src/icons/${weather.weather[0].icon}.png">`;
  // weather.weather[0].main;

  const hilow = document.querySelector('.hi-low');
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(weather.main.temp_max)}°c`;
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}&lang=pl`)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResults);
}

const searchbox = document.querySelector('.search-box');

function setQuery(evt) {
  if (evt.keyCode === 13) {
    getResults(searchbox.value);
  }
}

searchbox.addEventListener('keypress', setQuery);
