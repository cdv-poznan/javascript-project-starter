const searchFrom = document.querySelector('#searchFrom');
const searchTo = document.querySelector('#searchTo');
const currenciesToList = document.querySelector('#currenciesToList');
const currenciesList = document.querySelector('#currenciesList');
const currencyWrapper = document.querySelectorAll('.currencyWrapper');

function choosenCurrency() {
  // ADD CONTENT TO "FROM SECTION"
  currenciesList.addEventListener('click', function (event) {
    searchFrom.classList.remove('show'); // remove displaying of search input
    if (event.target.tagName === 'IMG') {
      currencyWrapper[0].innerHTML = event.target.parentNode.parentNode.innerHTML;
      currenciesList.innerHTML = '';
    } else {
      currencyWrapper[0].innerHTML = event.target.parentNode.innerHTML;
      currenciesList.innerHTML = '';
    }
    currenciesList.innerHTML = '';
  });

  // ADD CONTENT TO TARGET SECTION
  currenciesToList.addEventListener('click', function (event) {
    searchTo.classList.remove('show'); // remove displaying of search input
    if (event.target.tagName === 'IMG') {
      currencyWrapper[1].innerHTML = event.target.parentNode.parentNode.innerHTML;
      currenciesToList.innerHTML = '';
    } else {
      currencyWrapper[1].innerHTML = event.target.parentNode.innerHTML;
      currenciesToList.innerHTML = '';
    }
    currenciesToList.innerHTML = '';
  });

  // SEARCH FOR AVAILABLE CURRENCIES - "FROM SECTION"
  searchFrom.addEventListener('keyup', function () {
    const currencyListItem = document.querySelectorAll('.newCurrencyWrapper');
    const filter = searchFrom.innerText.toUpperCase();
    let txt;

    for (let j = 0; j < currencyListItem.length; j += 1) {
      txt = currencyListItem[j].innerText;
      // console.log(currencyListItem[0].innerText);
      if (txt.toUpperCase().indexOf(filter) > -1) {
        currencyListItem[j].style.display = '';
      } else {
        currencyListItem[j].style.display = 'none';
      }
    }
  });
  // SEARCH FOR AVAILABLE CURRENCIES - "TO SECTION"
  searchTo.addEventListener('keyup', function () {
    const currencyListItem = document.querySelectorAll('.newCurrencyWrapper');
    const filter = searchTo.innerText.toUpperCase();
    let txt;
    for (let j = 0; j < currencyListItem.length; j += 1) {
      txt = currencyListItem[j].innerText;
      if (txt.toUpperCase().indexOf(filter) > -1) {
        currencyListItem[j].style.display = '';
      } else {
        currencyListItem[j].style.display = 'none';
      }
    }
  });
}
export { choosenCurrency };
