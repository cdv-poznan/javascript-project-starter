// SCROLL
const scrollBtn = document.querySelector('#scrollToTop');

function scrollFunction() {
  if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
    scrollBtn.style.display = 'block';
  } else {
    scrollBtn.style.display = 'none';
  }
}

function goToTop() {
  document.documentElement.scrollTop = 0;
}

export { scrollFunction, goToTop };
