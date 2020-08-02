const ammount = document.querySelector('#ammount');
const searchFrom = document.querySelector('#searchFrom');
const searchTo = document.querySelector('#searchTo');
const currenciesToList = document.querySelector('#currenciesToList');
const currenciesList = document.querySelector('#currenciesList');

function checkAmmount() {
  ammount.addEventListener('click', function () {
    ammount.innerHTML = '';
    if (ammount.innerHTML === '') {
      ammount.style.paddingTop = '10px';
    }
    currenciesList.innerHTML = '';
    searchFrom.classList.remove('show');
    currenciesToList.innerHTML = '';
    searchTo.classList.remove('show');
  });
}

export { checkAmmount };
