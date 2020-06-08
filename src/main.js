const jokeBtn = document.getElementById('jokeBtn');
const jokeText = document.getElementById('jokeText');

jokeBtn.addEventListener('click', () => {
  const url = 'https://api.icndb.com/jokes/random';
  fetch(url)
    .then((res) => {
      //response of HTTP in the format of JSON, typical fetch API//
      return res.json();
    })
    .then((data) => {
      console.log(data.value.joke);
      jokeText.innerHTML = data.value.joke;
    });
});
