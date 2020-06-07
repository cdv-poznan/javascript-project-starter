// niestety to nie działa
// dostaje z serwera odpowiedź 502 gateway - sprawdzałem w google, ale nie wiem, co z tym zrobić :()

async function getApiResponse(word) {
  const url = 'https://mashape-community-urban-dictionary.p.rapidapi.com/define?term=';
  const apiResponse = await fetch('https://google-translate1.p.rapidapi.com/language/translate/v2', {
    method: 'POST',
    headers: {
      'x-rapidapi-host': 'google-translate1.p.rapidapi.com',
      'x-rapidapi-key': 'afd6439893mshbf43158a81c6373p1ccd29jsnae93328d28e5',
      'accept-encoding': 'application/gzip',
      'content-type': 'application/x-www-form-urlencoded',
    },
    body: {
      source: 'en',
      q: word,
      target: 'pl',
    },
  })
    .then((response) => response.json())
    .then((dataObject) => {
      return dataObject.data.translations[0];
    })
    .catch((err) => {
      console.log(err);
    });
  return apiResponse;
}

export async function translateString() {
  const apiResponse = await getApiResponse();
  return apiResponse;
}
