/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
const pokemonList = document.querySelector('.list');
const selectType = document.querySelector('select');
const pokePhoto = document.querySelector('.poke-photo');
const pokeName = document.querySelector('.poke-name');

console.log(pokeName);

const number = 50;
const type = 18;

// Generate Poke list
for (let i = 1; i <= number; i++) {
  const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
  const ulItem = document.createElement('li');
  const img = document.createElement('img');
  pokemonList.appendChild(ulItem);
  ulItem.appendChild(img);
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      img.setAttribute('src', res.sprites.front_default);
      img.style.width = '200px';
    });
  // .catch((err) => console.log);
}

// Generate single poke Img and details
const poke = document.querySelectorAll('li');

const singleImage = document.createElement('img');
pokePhoto.appendChild(singleImage);
for (let i = 0; i < poke.length; i++) {
  poke[i].addEventListener('click', function () {
    const pokeImg = poke[i].innerHTML;
    singleImage.setAttribute('src', pokeImg.slice(10, -24));

    const url = `https://pokeapi.co/api/v2/pokemon/${i + 1}`;
    console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        pokeName.textContent = res.name;
      });
  });
}

// Generate type list
for (let i = 1; i <= type; i++) {
  const url = `https://pokeapi.co/api/v2/type/${i}`;
  const singleType = document.createElement('option');
  selectType.appendChild(singleType);
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      singleType.textContent = res.name;
      singleType.setAttribute('value', res.name);
    });
}
