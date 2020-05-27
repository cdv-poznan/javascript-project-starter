const currencyFromWrapper = document.querySelector('#currencyFromWrapper');
const searchFrom = document.querySelector('#searchFrom');
const searchTo = document.querySelector('#searchTo');
const currenciesToList = document.querySelector('#currenciesToList');
const currenciesList = document.querySelector('#currenciesList');
const currencyToWrapper = document.querySelector('#currencyToWrapper');
const ammount = document.querySelector('#ammount');
const rate = document.querySelector('#rate');
const yourExchange = document.querySelector('#yourExchange');

function exchange(e) {
  e.preventDefault();
  const req = fetch('https://api.exchangerate-api.com/v4/latest/' + currencyFromWrapper.innerText.slice(0, 3));
  req
    .then(function (res) {
      return res.json();
    })
    .then(function (body) {
      const exchanged = body.rates[currencyToWrapper.innerText.slice(0, 3)] * ammount.innerText;
      // LAST UPDATED
      const sec = body.time_last_updated / 1000;
      const min = sec / 60;
      const hours = min / 60;
      const days = hours / 24;

      rate.innerHTML = `1 ${currencyFromWrapper.innerText} = ${body.rates[currencyToWrapper.innerText.slice(0, 3)].toFixed(2)} ${
        currencyToWrapper.innerText
      }. Time last updated: ${Math.round(days)} days (${Math.round(hours)} hours) ago. `;
      yourExchange.innerHTML = `${ammount.innerText} ${currencyFromWrapper.innerText} = ${exchanged.toFixed(2)} ${
        currencyToWrapper.innerText
      }`;
      currenciesList.innerHTML = '';
      searchFrom.classList.remove('show');
      currenciesToList.innerHTML = '';
      searchTo.classList.remove('show');
    });
}

export { exchange };
