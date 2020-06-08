import $ from 'jquery';

// zwraca promisa z odpowiedzią z serwera
async function getApiResponse(word) {
  const url = 'https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=';
  const apiResponse = await fetch(url + word, {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'mashape-community-urban-dictionary.p.rapidapi.com',
      'x-rapidapi-key': 'afd6439893mshbf43158a81c6373p1ccd29jsnae93328d28e5',
    },
  })
    .then((response) => response.json())
    .then((dataObject) => {
      return dataObject.list[0].definition;
    })
    .catch((err) => {
      console.log(err);
    });
  return apiResponse;
}

// wyrzuca promisa na zewnątrz
export async function getUrbanDefinition(word) {
  const apiResponse = await getApiResponse(word);
  return apiResponse;
}
