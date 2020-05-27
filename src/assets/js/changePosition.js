import { exchange } from './convertFunc';

const currencyFromWrapper = document.querySelector('#currencyFromWrapper');
const currencyToWrapper = document.querySelector('#currencyToWrapper');
const changePosition = document.querySelector('.changePosition');

function changeCurrencyPosition() {
  changePosition.addEventListener('click', function (e) {
    const fromValue = currencyFromWrapper.innerHTML;
    const toValue = currencyToWrapper.innerHTML;
    currencyFromWrapper.innerHTML = toValue;
    currencyToWrapper.innerHTML = fromValue;
    exchange(e);
  });
}
export { changeCurrencyPosition };
