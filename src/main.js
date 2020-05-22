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
      const newConverterTable = document.querySelector('#newConverterTable');
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
          newConverterTable.innerHTML += localStorage.getItem('wrapper-' + x);
        }
      }

      let newCurrencyQnt;
      if (localStorage.getItem('newCurrencyQnt') === null) {
        newCurrencyQnt = 0;
      } else {
        newCurrencyQnt = parseInt(localStorage.getItem('newCurrencyQnt'), 10);
      }

      // REMOVE CURRENCY FROM "NEW CONVERTER TABLE"
      newConverterTable.addEventListener('click', (e) => {
        console.log(newCurrencyQnt);
        if (e.target.classList.contains('close')) {
          e.target.parentElement.parentElement.remove();
          localStorage.removeItem(e.target.parentElement.parentElement.id);
          newCurrencyQnt -= 1;
          localStorage.setItem('newCurrencyQnt', newCurrencyQnt);
          console.log(newCurrencyQnt);
        }
      });

      // your currencies stuff
      changeButton.addEventListener('click', yourCurrencies);
    })
    .catch((error) => console.log('Błąd: ', error));
});
