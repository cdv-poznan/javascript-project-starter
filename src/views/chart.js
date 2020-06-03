import { Chart } from 'chart.js';

export async function chartsView() {
  async function getDataForCountry(country) {
    const fromDate = '2020-03-01T00:00:00Z';
    const toDate = new Date().toISOString();
    // https://api.covid19api.com/country/south-africa/status/confirmed?from=2020-03-01T00:00:00Z&to=2020-04-01T00:00:00Z
    const api = `https://api.covid19api.com/country/${country}/status/confirmed?from=${fromDate}&to=${toDate}`;

    const res = await fetch(api);
    const json = await res.body();

    return json;
  }

  const poland = await getDataForCountry('poland');
  const germany = await getDataForCountry('germany');
  const italy = await getDataForCountry('italy');

  //   console.log(json);

  const config = {
    type: 'line',
    data: {
      labels: poland.map((entry) => entry.Date.substr(0, 10).slice(5)),
      datasets: [
        {
          label: 'Poland',
          data: poland.map((entry) => entry.Cases),
          borderColor: '#f0f',
          backgroundColor: '#f0f',
        },
        {
          label: 'Germany',
          data: germany.map((entry) => entry.Cases),
          borderColor: '#0ff',
        },
        {
          label: 'Italy',
          data: italy.map((entry) => entry.Cases),
          borderColor: '#ff0',
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Przypadki COVID-19 w Polsce w 2020 roku',
      },
      scales: {
        xAxes: [{ display: true }],
        yAxes: [{ display: true }],
      },
    },
  };

  const canvas = document.getElementById('chart-canvas');
  const context = canvas.getContext('2d');

  const chart = new Chart(context, config);
  console.log(chart);
}
