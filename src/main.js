import { addAvailableCurrencies } from './assets/js/addCurrencies';
import { displayCurrencies } from './assets/js/displayCurrencies';
import { choosenCurrency } from './assets/js/chosenCurrency';
import { checkAmmount } from './assets/js/ammount';
import { exchange } from './assets/js/convertFunc';
import { exchangePlnEur } from './assets/js/ratesFunc';
import { changeCurrencyPosition } from './assets/js/changePosition';
import { yourCurrencies } from './assets/js/yourCurrencies';
import { goToTop, scrollFunction } from './assets/js/scroll';

document.addEventListener('DOMContentLoaded', () => {
  // GET DATA FROM JSON FILE
  fetch('./assets/js/countries.json')
    .then((response) => response.json())
    .then(() => {
      const convert = document.querySelector('#convert');
      const newConverterTable = document.querySelector('#newConverterTable');
      const changeButton = document.querySelector('#change-button');
      const scrollBtn = document.querySelector('#scrollToTop');

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
      newConverterTable.innerHTML = localStorage.getItem('table');

      // REMOVE CURRENCY FROM "NEW CONVERTER TABLE"
      newConverterTable.addEventListener('click', (e) => {
        if (e.target.classList.contains('close')) {
          e.target.parentElement.parentElement.remove();
          localStorage.setItem('table', newConverterTable.innerHTML);
        }
      });

      // your currencies stuff
      changeButton.addEventListener('click', yourCurrencies);

      // SCROLL
      window.onscroll = function () {
        scrollFunction();
      };

      scrollBtn.addEventListener('click', goToTop);
    })
    .catch((error) => console.log('Błąd: ', error));
});
