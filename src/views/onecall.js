import { Chart } from 'chart.js';
import $ from 'jquery';
import * as ChartDataLabels from 'chartjs-plugin-datalabels';
import __ from 'lodash';
import pattern from 'patternomaly';

//Funkcja asynchroniczna do pobrania danych z API Openweathermap.org
export async function oneCall() {
  async function getOneCall(part) {
    const api = `https://api.openweathermap.org/data/2.5/onecall?lat=52.400631&lon=16.901541&exclude=${part}&appid=5d19895d400e45e352196760bc5e2205&units=metric
    `;
    const res = await fetch(api);
    const json = await res.json();
    return json;
  }

  //wykluczenie danych godzinowych dla API
  const daysSeven = await getOneCall('hourly');

  //pobranie dni (8 wartości, dzisiaj + 7 dni)
  const daysSevenList = daysSeven.daily;

  //pobranie konkretego czas dla dnia a API (format unix)
  const daysSevenDate = daysSevenList.map((entry) => entry.dt);

  //przekonwertowanie czasu unixowego na daty w formacie MM-DD
  const daysSevenDateConvert = daysSevenDate.map(function (el) {
    const convertDate = new Date(parseInt(el, 10) * 1000);
    el = convertDate.toISOString();
    const cutDate = el.substr(5, 5);
    return cutDate;
  });

  //Wyciagniecie numerów dni tygodnia np. 0 - niedziela, 3 - środa.
  const convertedWeek = [];
  daysSevenDate.forEach(function (val) {
    const myDate = new Date(val * 1000).getDay();
    convertedWeek.push(parseInt(myDate, 10));
    return myDate;
  });

  //Switch do zamiany dni tygodnia z integerów na stringi
  function conv(value) {
    let dayConv = '';
    switch (value) {
      case 0:
        dayConv = 'Niedziela';
        break;
      case 1:
        dayConv = 'Poniedziałek';
        break;
      case 2:
        dayConv = 'Wtorek';
        break;
      case 3:
        dayConv = 'Środa';
        break;
      case 4:
        dayConv = 'Czwartek';
        break;
      case 5:
        dayConv = 'Piątek';
        break;
      case 6:
        dayConv = 'Sobota';
        break;
      default:
        return 'Coś poszło nie tak';
    }
    return dayConv;
  }
  //cd zamiany na polskie nazwy dni tygodnia
  const polishDaysName = [];
  convertedWeek.forEach(function (val) {
    polishDaysName.push(conv(val));
  });

  //połączenie dwóch tablic tak aby indexy w starych tablicach po połączeniu w jedną tablicę zachowały swój natywny index -> czyli ['a','b'],[1,2] => [['a',1],['b',2]]
  const lodashZipObject = __.zip(polishDaysName, daysSevenDateConvert);
  const newArr = Object.values(lodashZipObject);

  const daysSevenTemp = daysSevenList.map((entry) => Math.round(entry.temp.max));
  const daysSevenRain = daysSevenList.map((entry) => entry.rain);
  const removeUndefinedRain = daysSevenRain.map((item) => (item === undefined ? 0 : item));

  const canvasOne = $('#onecall-canvas').get(0).getContext('2d');

  const configOne = {
    type: 'line',
    data: {
      labels: newArr,
      datasets: [
        {
          label: 'Temperatura maksymalna w C',
          data: daysSevenTemp,
          borderColor: 'darkred',
          fill: false,
          datalabels: {
            labels: {
              //title: null,
            },
            formatter: function (value) {
              return Math.round(value);
            },
            align: 'top',
            offset: 10,
          },
        },
        {
          label: 'Opady w mm na m2',
          type: 'bar',
          data: removeUndefinedRain,
          borderColor: 'blue',
          backgroundColor: [
            pattern.draw('dash', '#006bff'),
            pattern.draw('dash', '#006bff'),
            pattern.draw('dash', '#006bff'),
            pattern.draw('dash', '#006bff'),
            pattern.draw('dash', '#006bff'),
            pattern.draw('dash', '#006bff'),
            pattern.draw('dash', '#006bff'),
            pattern.draw('dash', '#006bff'),
          ],
          datalabels: {
            display: function (context) {
              return context.dataset.data[context.dataIndex] !== 0; //ukrycie wartości == 0
            },
            labels: {
              title: null,
              // title: {
              //   color: 'blue',
              // },
            },
          },
        },
      ],
    },
    plugins: [ChartDataLabels],
    options: {
      tooltips: {
        backgroundColor: '#FFF',
        titleFontSize: 16,
        titleFontColor: '#0066ff',
        bodyFontColor: '#000',
        bodyFontSize: 14,
        displayColors: false,
      },
      layout: {
        padding: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              beginAtZero: true,
              //padding: 25,
            },
          },
        ],
      },
    },
  };

  const oneCallChart = new Chart(canvasOne, configOne);
  console.log(oneCallChart);
}
