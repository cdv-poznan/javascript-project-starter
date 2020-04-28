// import lodash from 'lodash';

document.addEventListener('DOMContentLoaded', () => {
  function checkSquare() {
    this.classList.toggle('checked');
  }
  const squares = document.querySelectorAll('.square');
  squares.forEach(function (item) {
    item.addEventListener('click', checkSquare);
  });

  const styles = document.querySelector('#styles');
  document.querySelector('#styleChanger').addEventListener('click', () => styles.classList.toggle('hidden'));

  const technoKick = new Audio('./assets/samples/technokick.wav');
  document.querySelector('#technoKick').addEventListener('click', function () {
    technoKick.play();
  });
});
