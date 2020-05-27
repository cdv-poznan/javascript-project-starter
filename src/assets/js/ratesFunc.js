const searchFrom = document.querySelector('#searchFrom');
const changeButton = document.querySelector('#change-button');
const addCurrency = document.querySelector('#addCurrency');
const newCurrencyList = document.querySelector('#newCurrencyList');
// const newCurrencyListSearch = document.querySelector('#newCurrencyListSearch');
const newConverterTable = document.querySelector('#newConverterTable');
const currenciesToList = document.querySelector('#currenciesToList');
const currenciesList = document.querySelector('#currenciesList');
const searchTo = document.querySelector('#searchTo');

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
          const plnEur = document.getElementById('plnEur');
          const plnUsd = document.getElementById('plnUsd');
          const plnGbp = document.getElementById('plnGbp');
          const plnChf = document.getElementById('plnChf');
          const plnPln = document.getElementById('plnPln');
          plnEur.innerHTML = body.rates.EUR.toFixed(2) + ' EUR';
          plnUsd.innerHTML = body.rates.USD.toFixed(2) + ' USD';
          plnGbp.innerHTML = body.rates.GBP.toFixed(2) + ' GBP';
          plnChf.innerHTML = body.rates.CHF.toFixed(2) + ' CHF';
          plnPln.innerHTML = body.rates.PLN;

          let counter = 0;
          changeButton.addEventListener('click', function () {
            counter += 1;
            if (parseInt(counter % 2, 10) === 0) {
              plnEur.innerHTML = body.rates.EUR.toFixed(2) + ' EUR';
              plnUsd.innerHTML = body.rates.USD.toFixed(2) + ' USD';
              plnGbp.innerHTML = body.rates.GBP.toFixed(2) + ' GBP';
              plnChf.innerHTML = body.rates.CHF.toFixed(2) + ' CHF';
              plnPln.innerHTML = body.rates.PLN;
            } else {
              plnEur.innerHTML = (body.rates.PLN / body.rates.EUR).toFixed(2) + ' PLN';
              plnUsd.innerHTML = (body.rates.PLN / body.rates.USD).toFixed(2) + '  PLN';
              plnGbp.innerHTML = (body.rates.PLN / body.rates.GBP).toFixed(2) + '  PLN';
              plnChf.innerHTML = (body.rates.PLN / body.rates.CHF).toFixed(2) + '  PLN';
              plnPln.innerHTML = body.rates.PLN;
            }
          });

          // DISPLAY CURRENCY YOU WANT ADD TO NEW CONVERT TABLE
          addCurrency.addEventListener('click', function () {
            // newCurrencyListSearch.classList.add('show');
            currenciesToList.innerHTML = '';
            currenciesList.innerHTML = '';
            searchFrom.classList.remove('show');
            searchTo.classList.remove('show');

            // ADD ALL CURRENCIES TO "FROM" SECTION
            for (let i = 0; i < currenciesLength; i += 1) {
              newCurrencyList.innerHTML += `
                            <div class="newCurrencyWrapper" id="${response.currencies[i].currencyCode}">
                                <div class="flag small" id="flag_of_${response.currencies[i].country}">
                                  <img src="/assets/img/${response.currencies[i].currencyCode}.png">
                                </div>
                                <div class="code">${response.currencies[i].currencyCode}</div>
                            </div>
                        `;
            }
          });

          // CHOOSE CURRENCY YOU WANT TO ADD TO "NEW CONVERTER TABLE"

          newCurrencyList.addEventListener('click', function (event) {
            let getCurrencyCode;
            if (event.target.tagName === 'IMG') {
              getCurrencyCode = event.target.parentElement.parentElement.id;
            } else {
              getCurrencyCode = event.target.parentElement.id;
            }

            fetch('https://api.exchangerate-api.com/v4/latest/' + getCurrencyCode)
              .then((respo) => respo.json())
              .then((respo) => {
                searchFrom.classList.remove('show'); // remove displaying of search input

                const cells = `
                      <div class="convertTable table-item">
                        <div id="rate-EUR" class="currentRate">1 ${getCurrencyCode} = ${respo.rates.EUR.toFixed(2)} EUR</div>
                      </div>
                      <div class="convertTable table-item">
                        <div id="rate-USD" class="currentRate">1 ${getCurrencyCode} = ${respo.rates.USD.toFixed(2)} USD</div>
                      </div>
                      <div class="convertTable table-item">
                        <div id="rate-GBP" class="currentRate">1 ${getCurrencyCode} = ${respo.rates.GBP.toFixed(2)} GBP</div>
                      </div>
                      <div class="convertTable table-item">
                        <div id="rate-CHF" class="currentRate">1 ${getCurrencyCode} = ${respo.rates.CHF.toFixed(2)} CHF</div>
                      </div>
                      <div class="convertTable table-item">
                        <div id="rate-PLN" class="currentRate">1 ${getCurrencyCode} = ${respo.rates.PLN.toFixed(2)} PLN</div>
                      </div>
                      `;

                if (event.target.tagName === 'IMG') {
                  newConverterTable.innerHTML += `
                        <div class="converterTable new-item">
                          <div class="newCurr">
                            <span class="close">x</span>
                            ${event.target.parentNode.parentNode.innerHTML}
                          </div>
                          ${cells}
                        </div>
                      `;
                  // newCurrencyListSearch.classList.remove('show');
                  newCurrencyList.innerHTML = '';

                  // local storage
                  localStorage.setItem('table', newConverterTable.innerHTML);
                } else {
                  newConverterTable.innerHTML += `
                      <div class="converterTable new-item">
                        <div class="newCurr">
                          <span class="close">x</span>
                          ${event.target.parentNode.innerHTML}
                        </div>
                        ${cells}
                      </div>
                    `;

                  // newCurrencyListSearch.classList.remove('show');
                  newCurrencyList.innerHTML = '';

                  // local storage
                  localStorage.setItem('table', newConverterTable.innerHTML);
                }
              });
          });
        });
    });
}

export { exchangePlnEur };
