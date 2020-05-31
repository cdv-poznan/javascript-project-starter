const rates = {};
const apiUrl = 'https://data.norges-bank.no/api/data/EXR/';
const apiParams = 'B.EUR+USD+PLN.NOK.SP?format=sdmx-json&lastNObservations=1';
export default new Promise((resolutionFunc, rejectionFunc) => {
  fetch(apiUrl + apiParams)
    .then((r) => r.json())
    .then((json) => {
      const { series } = json.dataSets[0];
      const structure = json.structure.dimensions.series;

      const baseCurrencies = structure.filter((item) => item.id === 'BASE_CUR');
      baseCurrencies[0].values.forEach((it, idx) => {
        rates[it.id] = {
          id: it.id,
          name: it.name,
          rate: Number(series[`0:${idx}:0:0`].observations[0]),
        };
      });
      resolutionFunc(rates);
    })
    .catch(rejectionFunc);
});
