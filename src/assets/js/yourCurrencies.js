const newConverterTable = document.querySelector('#newConverterTable');

let clickCounter = 0;
function yourCurrencies() {
  const currCode = document.querySelectorAll('#newConverterTable .code');
  // const currentRate = document.querySelectorAll('.currentRate');
  clickCounter += 1;
  console.log(clickCounter);
  //   console.log(clickCounter);
  newConverterTable.innerHTML = '';
  // get currencies code from table and push it into array
  const url = [];
  for (let i = 0; i < currCode.length; i += 1) {
    const getClickCounter = clickCounter;
    url.push(currCode[i].innerHTML);
    // console.log(url);
    fetch('https://api.exchangerate-api.com/v4/latest/' + url[i])
      .then((rr) => rr.json())
      .then((rr) => {
        if (parseInt(getClickCounter % 2, 10) === 0) {
          newConverterTable.innerHTML += `<div class="converterTable">
                          <div>
                              <span class="close">x</span>
                              <div class="flag" >
                                  <img src="/assets/img/${url[i]}.png">
                              </div>
                              <div class="code">${url[i]}</div>
                          </div>
                          <div class="convertTable table-item">
                              <div id="rate-1-EUR" class="currentRate">1 ${url[i]} = ${rr.rates.EUR.toFixed(2)} EUR</div>
                          </div>
                          <div class="convertTable table-item">
                              <div id="rate-1-USD" class="currentRate">1 ${url[i]} = ${rr.rates.USD.toFixed(2)} USD</div>
                          </div>
                          <div class="convertTable table-item">
                              <div id="rate-1-GBP" class="currentRate">1 ${url[i]} = ${rr.rates.GBP.toFixed(2)} GBP</div>
                          </div>
                          <div class="convertTable table-item">
                              <div id="rate-1-CHF" class="currentRate">1 ${url[i]} = ${rr.rates.CHF.toFixed(2)} CHF</div>
                          </div>
                          <div class="convertTable table-item">
                              <div id="rate-1-PLN" class="currentRate">1 ${url[i]} = ${rr.rates.PLN.toFixed(2)} PLN</div>
                          </div>
                      </div>`;
        } else {
          newConverterTable.innerHTML += `<div class="converterTable">
            <div>
                <span class="close">x</span>
                <div class="flag" >
                    <img src="/assets/img/${url[i]}.png">
                </div>
                <div class="code">${url[i]}</div>
            </div>
            <div class="convertTable table-item">
                <div id="rate-1-EUR" class="currentRate">1 EUR = ${(1 / rr.rates.EUR).toFixed(2)} ${url[i]}</div>
            </div>
            <div class="convertTable table-item">
                <div id="rate-1-USD" class="currentRate">1 USD = ${(1 / rr.rates.USD).toFixed(2)} ${url[i]}</div>
            </div>
            <div class="convertTable table-item">
                <div id="rate-1-GBP" class="currentRate">1 GBP = ${(1 / rr.rates.GBP).toFixed(2)} ${url[i]}</div>
            </div>
            <div class="convertTable table-item">
                <div id="rate-1-CHF" class="currentRate">1 CHF = ${(1 / rr.rates.CHF).toFixed(2)} ${url[i]}</div>
            </div>
            <div class="convertTable table-item">
                <div id="rate-1-PLN" class="currentRate">1 PLN = ${(1 / rr.rates.PLN).toFixed(2)} ${url[i]}</div>
            </div>
        </div>`;
        }
      });
  }

  // CHOOSE CURRENCY YOU WANT TO ADD TO "NEW CONVERTER TABLE"
  //   let newCurrencyQnt;
  //   if (localStorage.getItem('newCurrencyQnt') === null) {
  //     newCurrencyQnt = 0;
  //   } else {
  //     newCurrencyQnt = parseInt(localStorage.getItem('newCurrencyQnt'), 10);
  //   }
  //   newConverterTable.addEventListener('click', (e) => {
  //     console.log(newCurrencyQnt);
  //     if (e.target.classList.contains('close')) {
  //       e.target.parentElement.parentElement.remove();
  //       localStorage.removeItem(e.target.parentElement.parentElement.id);
  //       newCurrencyQnt -= 1;
  //       localStorage.setItem('newCurrencyQnt', newCurrencyQnt);
  //       console.log(newCurrencyQnt);
  //     }
  //   });
}

export { yourCurrencies };
