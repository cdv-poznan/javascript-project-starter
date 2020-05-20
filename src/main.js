import { addAvailableCurrencies } from './assets/js/addCurrencies';
import { displayCurrencies } from './assets/js/displayCurrencies';
import { choosenCurrency } from './assets/js/chosenCurrency';
import { checkAmmount } from './assets/js/ammount';
import { exchange } from './assets/js/convertFunc';
import { exchangePlnEur } from './assets/js/ratesFunc';
import { changeCurrencyPosition } from './assets/js/changePosition';
import { yourCurrencies } from './assets/js/yourCurrencies';

document.addEventListener('DOMContentLoaded', () => {
  // GET DATA FROM JSON FILE
  fetch('./assets/js/countries.json')
    .then((response) => response.json())
    .then(() => {
      const convert = document.querySelector('#convert');
      const demo = document.querySelector('#demo');
      const changeButton = document.querySelector('#change-button');

      // ADD ALL AVAILABLE CURRENCIES TO "AVAILABLE CURRENCIES" SECTION
      addAvailableCurrencies();

      // DISPLAY ALL CURRENCIES AVAILABLE FOR "CURRENT FROM" FIELD
      displayCurrencies();

      // ADD CHOOSEN CURRENCY
      choosenCurrency();

      // amount field validation
      checkAmmount();

      // Currency converting function
      convert.addEventListener('click', exchange);

      exchangePlnEur();

      changeCurrencyPosition();

      // GET CONTENT FROM LOCAL STORAGE
      for (let x = 0; x < localStorage.length; x += 1) {
        if (localStorage.getItem('wrapper-' + x)) {
          demo.innerHTML += localStorage.getItem('wrapper-' + x);
        }
      }

      // your currencies stuff
      changeButton.addEventListener('click', yourCurrencies);
    })
    .catch((error) => console.log('Błąd: ', error));
});
