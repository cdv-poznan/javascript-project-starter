const searchFrom = document.querySelector('#searchFrom');
const searchTo = document.querySelector('#searchTo');
const currenciesToList = document.querySelector('#currenciesToList');
const currenciesList = document.querySelector('#currenciesList');
const currencyToWrapper = document.querySelector('#currencyToWrapper');
const currencyWrapper = document.querySelectorAll('.currencyWrapper');
const changePosition = document.querySelector('.changePosition');
const ammount = document.querySelector('#ammount');
const convert = document.querySelector('#convert');
const rate = document.querySelector('#rate');
const yourExchange = document.querySelector('#yourExchange');
const changeButton = document.querySelector('#change-button');
const newCurrency = document.querySelector('#newCurrency');
const addCurrency = document.querySelector('#addCurrency');
const newCurrenciesList = document.querySelector('#newCurrenciesList');
const newCurrencyList = document.querySelector('#newCurrencyList');
const newCurrencyListSearch = document.querySelector('#newCurrencyListSearch');
const newConverterTable = document.querySelector('#newConverterTable');
const demo = document.querySelector('#demo');

function exchangePlnEur() {
  fetch('./assets/js/countries.json')
    .then((response) => response.json())
    .then((response) => {
      const req = fetch('https://api.exchangerate-api.com/v4/latest/pln');
      const currenciesLength = response.currencies.length;
      req
        .then(function (res) {
          return res.json();
        })
        .then(function (body) {
          // console.log(body.rates.EUR);
          const plnEur = document.getElementById('plnEur');
          const plnUsd = document.getElementById('plnUsd');
          const plnGbp = document.getElementById('plnGbp');
          const plnChf = document.getElementById('plnChf');
          const plnCzk = document.getElementById('plnCzk');
          plnEur.innerHTML = '1 PLN = ' + body.rates.EUR.toFixed(2) + ' EUR';
          plnUsd.innerHTML = '1 PLN = ' + body.rates.USD.toFixed(2) + ' USD';
          plnGbp.innerHTML = '1 PLN = ' + body.rates.GBP.toFixed(2) + ' GBP';
          plnChf.innerHTML = '1 PLN = ' + body.rates.CHF.toFixed(2) + ' CHF';
          plnCzk.innerHTML = '1 PLN = ' + body.rates.CZK.toFixed(2) + ' CZK';

          let counter = 0;
          changeButton.addEventListener('click', function () {
            counter += 1;
            // console.log(body.rates);
            if (parseInt(counter % 2, 10) === 0) {
              plnEur.innerHTML = '1 PLN = ' + body.rates.EUR.toFixed(2) + ' EUR';
              plnUsd.innerHTML = '1 PLN = ' + body.rates.USD.toFixed(2) + ' USD';
              plnGbp.innerHTML = '1 PLN = ' + body.rates.GBP.toFixed(2) + ' GBP';
              plnChf.innerHTML = '1 PLN = ' + body.rates.CHF.toFixed(2) + ' CHF';
              plnCzk.innerHTML = '1 PLN = ' + body.rates.CZK.toFixed(2) + ' CZK';
            } else {
              plnEur.innerHTML = '1 EUR = ' + (body.rates.PLN / body.rates.EUR).toFixed(2) + ' PLN';
              plnUsd.innerHTML = '1 USD = ' + (body.rates.PLN / body.rates.USD).toFixed(2) + '  PLN';
              plnGbp.innerHTML = '1 GBP = ' + (body.rates.PLN / body.rates.GBP).toFixed(2) + '  PLN';
              plnChf.innerHTML = '1 CHF = ' + (body.rates.PLN / body.rates.CHF).toFixed(2) + '  PLN';
              plnCzk.innerHTML = '1 CZK = ' + (body.rates.PLN / body.rates.CZK).toFixed(2) + ' PLN';
            }
          });

          // DISPLAY CURRENCY YOU WANT ADD TO NEW CONVERT TABLE
          addCurrency.addEventListener('click', function () {
            console.log('dodaj walutę');
            newCurrencyListSearch.classList.add('show');
            // searchFrom.focus();
            // searchFrom.innerHTML = '';
            // currenciesToList.innerHTML = '';
            // searchTo.classList.remove('show');
            // ADD ALL CURRENCIES TO "FROM" SECTION
            for (let i = 0; i < currenciesLength; i += 1) {
              newCurrencyList.innerHTML += `
                            <div class="newCurrencyWrapper" id="${response.currencies[i].currencyCode}">
                                <div class="flag" id="flag_of_${response.currencies[i].country}">
                                  <img src="/assets/img/${response.currencies[i].country}.png">
                                </div>
                                <div class="code">${response.currencies[i].currencyCode}</div>
                            </div>
                        `;
            }
          });

          // CHOOSE CURRENCY YOU WANT TO ADD TO "NEW CONVERTER TABLE"
          let newCurrencyQnt = 0;
          newCurrencyList.addEventListener('click', function (event) {
            searchFrom.classList.remove('show'); // remove displaying of search input
            const div = document.createElement('DIV');
            const cells = `
                      <div class="convertTable table-item">
                        <div id="rate-${newCurrencyQnt}-EUR">1</div>
                      </div>
                      <div class="convertTable table-item">
                        <div id="rate-${newCurrencyQnt}-USD">2</div>
                      </div>
                      <div class="convertTable table-item">
                        <div id="rate-${newCurrencyQnt}-GBP">3</div>
                      </div>
                      <div class="convertTable table-item">
                        <div id="rate-${newCurrencyQnt}-CHF">4</div>
                      </div>
                      <div class="convertTable table-item">
                        <div id="rate-${newCurrencyQnt}-PLN">5</div>
                      </div>
                      `;

            if (event.target.tagName === 'IMG') {
              demo.innerHTML += `
                        <div id="wrapper-${newCurrencyQnt}" class="converterTable">
                          <div>
                            <span class="close">x</span>
                            ${event.target.parentNode.parentNode.innerHTML}
                          </div>
                          ${cells}
                        </div>
                      `;
              newCurrencyListSearch.classList.remove('show');
              newCurrencyList.innerHTML = '';
              // local storage
              localStorage.setItem(
                `wrapper-${newCurrencyQnt}`,
                `<div id="wrapper-${newCurrencyQnt}"class="converterTable"><div><span class="close">x</span>${event.target.parentNode.parentNode.innerHTML}</div>${cells}</div>`,
              );
              newCurrencyQnt += 1;
              localStorage.setItem('newCurrencyQnt', newCurrencyQnt);
            } else {
              // div.innerHTML = event.target.parentNode.innerHTML;
              demo.innerHTML += `
                      <div id="wrapper-${newCurrencyQnt}" class="converterTable">
                        <div>
                          <span class="close">x</span>
                          ${event.target.parentNode.innerHTML}
                        </div>
                        ${cells}
                      </div>
                    `;

              newCurrencyListSearch.classList.remove('show');
              newCurrencyList.innerHTML = '';
              // local storage
              localStorage.setItem(`wrapper-${newCurrencyQnt}`, `<ntNode.innerHTML}</div>${cells}</=>`);
              newCurrencyQnt += 1;

              localStorage.setItem('newCurrencyQnt', newCurrencyQnt);
            }
          });
        });
    });
}

export { exchangePlnEur };
