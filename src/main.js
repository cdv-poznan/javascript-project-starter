// import lodash from 'lodash';

document.addEventListener('DOMContentLoaded', () => {
  function checkSquare(element) {
    this.classList.add('checked');
  }
  const squares = document.querySelectorAll('.square');
  squares.forEach(function (item) {
    item.addEventListener('click', checkSquare);
  });
});
