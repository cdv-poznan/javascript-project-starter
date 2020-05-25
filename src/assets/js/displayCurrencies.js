// DISPLAY ALL CURRENCIES AVAILABLE FOR "CURRENT FROM" FIELD
const currencyFromWrapper = document.querySelector('#currencyFromWrapper');
const searchFrom = document.querySelector('#searchFrom');
const searchTo = document.querySelector('#searchTo');
const currenciesToList = document.querySelector('#currenciesToList');
const currenciesList = document.querySelector('#currenciesList');
// const converter = document.querySelector('#converter');
const currencyToWrapper = document.querySelector('#currencyToWrapper');

function displayCurrencies() {
  fetch('./assets/js/countries.json')
    .then((response) => response.json())
    .then((response) => {
      const currenciesLength = response.currencies.length;

      currencyFromWrapper.addEventListener('click', function () {
        // DISPLAY SEARCH INPUT
        searchFrom.classList.add('show');
        searchFrom.focus();
        searchFrom.innerHTML = '';
        currenciesToList.innerHTML = '';
        searchTo.classList.remove('show');
        // ADD ALL CURRENCIES TO "FROM" SECTION
        for (let i = 0; i < currenciesLength; i += 1) {
          currenciesList.innerHTML += `
                        <div class="newCurrencyWrapper" id="${response.currencies[i].currencyCode}">
                            <div class="flag" id="flag_of_${response.currencies[i].country}"><img src="/assets/img/${response.currencies[i].currencyCode}.png"></div>
                            <div class="code">${response.currencies[i].currencyCode}</div>
                            <div class="currency">${response.currencies[i].currencyName}</div>
                        </div>
                    `;
        }
      });
      // DISPLAY ALL AVAILABLE CURRENCIES TO TARGET SECTION
      currencyToWrapper.addEventListener('click', function () {
        // DISPLAY SEARCH INPUT
        searchTo.classList.add('show');
        searchTo.focus();
        searchTo.innerHTML = '';
        currenciesList.innerHTML = '';
        searchFrom.classList.remove('show');

        // ADD ALL CURRENCIES TO "FROM" SECTION
        for (let i = 0; i < response.currencies.length; i += 1) {
          currenciesToList.innerHTML += `
            <div class="newCurrencyWrapper" id="${response.currencies[i].currencyCode}">
                <div class="flag" id="flag_of_${response.currencies[i].country}"><img src="/assets/img/${response.currencies[i].currencyCode}.png"></div>
                <div class="code">${response.currencies[i].currencyCode}</div>
                <div class="currency">${response.currencies[i].currencyName}</div>
            </div>`;
        }
      });
    });
}

export { displayCurrencies };
