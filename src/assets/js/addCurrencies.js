// ADD ALL AVAILABLE CURRENCIES TO "AVAILABLE CURRENCIES" SECTION
const availableCurrencies = document.querySelector('#availableCurrencies');

function addAvailableCurrencies() {
  fetch('./assets/js/countries.json')
    .then((response) => response.json())
    .then((response) => {
      const currenciesLength = response.currencies.length;
      for (let i = 0; i < currenciesLength; i += 1) {
        const wrapper = document.createElement('DIV');
        const img = document.createElement('IMG');
        const name = document.createElement('DIV');
        const description = document.createElement('DIV');
        const viki = document.createElement('A');

        img.src = `/assets/img/${response.currencies[i].currencyCode}.png`;
        viki.setAttribute('target', '_blank');
        viki.href = `https://en.wikipedia.org/wiki/${response.currencies[i].currencyName}`;

        wrapper.setAttribute('class', 'wrapper');
        name.setAttribute('class', 'name');
        name.innerText = `${response.currencies[i].currencyName}`;
        description.setAttribute('class', 'description');

        viki.appendChild(img);
        viki.appendChild(name);
        viki.appendChild(description);
        wrapper.appendChild(viki);
        availableCurrencies.appendChild(wrapper);
      }
    });
}
export { addAvailableCurrencies };
