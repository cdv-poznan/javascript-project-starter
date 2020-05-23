/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
const pokemonList = document.querySelector('.list');
const selectType = document.querySelector('select');
const pokePhoto = document.querySelector('.poke-photo');
const pokeName = document.querySelector('.poke-name');
const pokeType = document.querySelector('.type-span');
const hp = document.querySelector('.hp');
const speed = document.querySelector('.speed');
const defense = document.querySelector('.defense');
const attack = document.querySelector('.attack');

console.log(hp);
// console.log(pokeType);

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
        // console.log(res);
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
