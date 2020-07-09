/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
const header = document.querySelector('.page-title');
const pokemonList = document.querySelector('.list');
const selectType = document.querySelector('select');
const pokePhoto = document.querySelector('.poke-photo-img');
const pokeName = document.querySelector('.poke-name');
const pokeType = document.querySelector('.type-span');
const hp = document.querySelector('.hp');
const speed = document.querySelector('.speed');
const defense = document.querySelector('.defense');
const attack = document.querySelector('.attack');
const button = document.querySelector('.button');
const reset = document.querySelector('.reset');
const previous = document.querySelector('.previous');
const next = document.querySelector('.next');
const paginationList = document.querySelector('.pagination-box');
const up = document.querySelector('.up');
// const wholeApp = document.querySelector('body');
let nextUrl = '';
let previousUrl = '';

let type = '';

// console.log(reset);
// const error = 'Something went wrong';

// Generate type list
fetch('https://pokeapi.co/api/v2/type')
  .then((r) => r.json())
  .then((r) => {
    r.results.forEach((el) => {
      const singleType = document.createElement('option');
      singleType.textContent = el.name;
      singleType.setAttribute('value', el.name);
      selectType.appendChild(singleType);
      singleType.classList.add('option');
    });
  });

const removeList = () => {
  pokemonList.innerHTML = '';
};

const onCLickListener = (image, url) => {
  const imagePath = image.src;
  up.style.display = 'block';
  pokePhoto.setAttribute('src', imagePath);
  console.log(url);
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      pokeName.textContent = res.name;
      const typeArr = res.types;
      if (typeArr.length === 2) {
        pokeType.textContent = `${typeArr[0].type.name} / ${typeArr[1].type.name}`;
      } else {
        pokeType.textContent = typeArr[0].type.name;
      }
      const hpBar = res.stats[0].base_stat;
      const speedBar = res.stats[3].base_stat;
      const defenseBar = res.stats[4].base_stat;
      const attackBar = res.stats[5].base_stat;

      hp.style.width = `${hpBar}%`;
      hp.textContent = hpBar;
      speed.style.width = `${speedBar}%`;
      speed.textContent = speedBar;
      defense.style.width = `${defenseBar}%`;
      defense.textContent = defenseBar;
      attack.style.width = `${attackBar}%`;
      attack.textContent = attackBar;
    });
};

const createPokeImg = (res, url) => {
  const ulItem = document.createElement('li');
  const img = document.createElement('img');
  pokemonList.appendChild(ulItem);
  // console.log(res);
  ulItem.appendChild(img);
  if (res.sprites.front_default != null) {
    img.setAttribute('src', res.sprites.front_default);
  }
  // console.log(res.sprites);
  img.style.width = '120px';
  img.addEventListener('click', () => onCLickListener(img, url));
};

// Generate Poke list
function generateList(url) {
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      nextUrl = res.next;
      previousUrl = res.previous;
      res.results.forEach((el) => {
        fetch(el.url)
          .then((res2) => res2.json())
          .then((res2) => {
            if (type === '') {
              createPokeImg(res2, el.url);
            } else {
              res2.types.forEach((el2) => {
                if (el2.type.name === type) {
                  createPokeImg(res2, el.url);
                }
              });
            }
          });
      });
    });
}

const paginationOnClickListener = (url) => {
  // blokuj
  console.log(previous);
  previous.setAttribute('disabled', 'disabled');
  next.setAttribute('disabled', 'disabled');
  if (url !== null) {
    removeList();
    generateList(url);
  }
  // odblokuj
  console.log(next);
  previous.removeAttribute('disabled', 'disabled');
  next.removeAttribute('disabled', 'disabled');
};

next.addEventListener('click', () => paginationOnClickListener(nextUrl, next));
previous.addEventListener('click', () => paginationOnClickListener(previousUrl, previous));
console.log(paginationList);
// filter();
const filter = (typeValue) => {
  removeList();
  type = typeValue;
  generateList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=1000');
  paginationList.classList.add('pagination-remove');
};

// console.log(value);
button.addEventListener('click', () => {
  const singleType = selectType.value;
  filter(singleType);
});

reset.addEventListener('click', () => {
  removeList();
  type = '';
  generateList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=60');
  paginationList.classList.remove('pagination-remove');
});

header.addEventListener('click', () => {
  removeList();
  type = '';
  generateList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=60');
  console.log('klik');
});
up.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  up.style.display = 'none';
});

window.onscroll = () => {
  up.style.display = 'none';
};

generateList('https://pokeapi.co/api/v2/pokemon?offset=0&limit=60');
