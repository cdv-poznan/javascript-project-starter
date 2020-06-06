export function getUrbanDefinition(word) {
  fetch('https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=' + word, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com',
      'x-rapidapi-key': 'afd6439893mshbf43158a81c6373p1ccd29jsnae93328d28e5',
    },
  })
    .then((response) => {
      console.log(response);
    })
    .then((response) => {
      return JSON.parse(response);
    })
    .catch((err) => {
      console.log(err);
    });
}
