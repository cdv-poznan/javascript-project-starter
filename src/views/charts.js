import { Chart } from 'chart.js';

export async function chartsView() {
  async function getDataForCountry(country) {
    const fromDate = '2020-03-01T00:00:00Z';
    const toDate = new Date().toISOString();
    const api = `https://api.covid19api.com/country/${country}/status/confirmed?from=${fromDate}&to=${toDate}`;

    const res = await fetch(api);
    const json = await res.json();
    return json;
  }

  const poland = await getDataForCountry('poland');
  const germany = await getDataForCountry('germany');
  const russia = await getDataForCountry('russia');
  const belarus = await getDataForCountry('belarus');
  const ukraine = await getDataForCountry('ukraine');
  const czechia = await getDataForCountry('czechia');
  const slovakia = await getDataForCountry('slovakia');
  const lithuania = await getDataForCountry('lithuania');

  const config = {
    type: 'line',
    data: {
      labels: poland.map((entry) => entry.Date.substr(0, 10).slice(5)),
      datasets: [
        {
          label: 'Poland',
          data: poland.map((entry) => entry.Cases),
          borderColor: '#ab0000',
        },
        {
          label: 'Russia',
          data: russia.map((entry) => entry.Cases),
          borderColor: '#222222',
        },
        {
          label: 'Germany',
          data: germany.map((entry) => entry.Cases),
          borderColor: '#00ab00',
        },
        {
          label: 'Belarus',
          data: belarus.map((entry) => entry.Cases),
          borderColor: '#ffcc00',
        },
        {
          label: 'Ukraine',
          data: ukraine.map((entry) => entry.Cases),
          borderColor: '#FFFB99',
        },
        {
          label: 'Czech Republic',
          data: czechia.map((entry) => entry.Cases),
          borderColor: '#212CFF',
        },
        {
          label: 'Slovakia',
          data: slovakia.map((entry) => entry.Cases),
          borderColor: '#D10A0E',
        },
        {
          label: 'Lithuania',
          data: lithuania.map((entry) => entry.Cases),
          borderColor: '#256D68',
        },
      ],
    },
    options: {
      responsive: true,
      title: {
        display: true,
        text: 'Przypadki COVID-19 w Polsce i krajach sąsiadujących w 2020 roku',
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
}
