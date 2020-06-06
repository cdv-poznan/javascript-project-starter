import { Chart } from 'chart.js';
import $ from 'jquery';
import * as ChartDataLabels from 'chartjs-plugin-datalabels';

export async function weatherView() {
  async function getDataForStation(station) {
    const api = `https://api.openweathermap.org/data/2.5/forecast?id=${station}&APPID=841681e14be8b0d5de20d546adecfbe7&units=metric`;
    const res = await fetch(api);
    const json = await res.json();

    return json;
  }

  function getImageFromURL(imgCODE) {
    const iconURL = 'http://openweathermap.org/img/w/' + imgCODE + '.png';

    return iconURL;
  }

  const city = await getDataForStation('7530858'); //Poznań

  const cityTemp = city.list;

  const tempToDisplay = cityTemp.map((entry) => Math.round(entry.main.temp_max));
  const timeToDisplay = cityTemp.map((entry) => entry.dt);

  const limitedTemperaturesArray = tempToDisplay.slice(0, 30);
  const limitedTimesArray = timeToDisplay.slice(0, 30);

  const iconsArray = [];
  //const tempFeelsLike = cityTemp.map((entry) => entry.main.feels_like);

  cityTemp.map((entry, index) => iconsArray.push({ index: index, icon: getImageFromURL(entry.weather[0].icon) }));

  const newMyDate = limitedTimesArray.map(function (el) {
    const temp = new Date(parseInt(el, 10) * 1000);
    el = temp.toISOString();
    const toReplace = el.replace(/[a-zA-Z]/, ' g:');
    const toCut = toReplace.substr(0, 18);
    return toCut;
  });

  // Pokazanie wszystkich tooltipów

  Chart.pluginService.register({
    beforeRender: function (chart) {
      if (chart.config.options.showAllTooltips) {
        // stworznenie tablicy tooltipów
        // nie mozemy korzystać z toolipa z chart.js bo oferuje mozliwość tylko jednego tooltipa dla wykresu, dlatego trzeba stworzyć tablice
        chart.pluginTooltips = [];
        chart.config.data.datasets.forEach(function (dataset, i) {
          chart.getDatasetMeta(i).data.forEach(function (sector) {
            chart.pluginTooltips.push(
              new Chart.Tooltip(
                {
                  _icons: iconsArray,
                  _chart: chart.chart,
                  _chartInstance: chart,
                  _data: chart.data,
                  _options: chart.options.tooltips,
                  _active: [sector],
                },
                chart,
              ),
            );
          });
        });

        // wyłączenie domyślnych tooltipów
        chart.options.tooltips.enabled = false;
      }
    },
    afterDraw: function (chart, easing) {
      if (chart.config.options.showAllTooltips) {
        // wyłączenie animacji przy pokazywaniu tooltipów
        if (!chart.allTooltipsOnce) {
          if (easing !== 1) return;
          chart.allTooltipsOnce = true;
        }

        // włączenie tooltipów
        chart.options.tooltips.enabled = true;
        Chart.helpers.each(chart.pluginTooltips, function (tooltip) {
          tooltip.initialize();
          tooltip.update();
          // tak naprawdę nie potrzebujemy tego, ponieważ nie animujemy tooltipów
          tooltip.pivot();
          tooltip.transition(easing).draw();
        });
        chart.options.tooltips.enabled = false;
      }
    },
  });

  const canvas = $('#weather-canvas').get(0).getContext('2d');

  const config = {
    type: 'line',
    data: {
      labels: newMyDate,
      datasets: [
        {
          label: 'Temperatura maksymalna',
          data: limitedTemperaturesArray,
          borderColor: 'darkgreen',
          fill: false,
          //xAxisID: 'A',
          datalabels: {
            labels: {
              title: null,
            },
            formatter: function (value) {
              return Math.round(value);
            },
            align: 'top',
            offset: 10,
          },
        },
      ],
    },
    plugins: [ChartDataLabels],
    options: {
      showAllTooltips: true,
      events: ['click'],
      tooltips: {
        backgroundColor: 'transparent',
        titleFontColor: 'transparent',
        bodyFontColor: 'black',
        footerFontColor: 'black',
        displayColors: false,
        callbacks: {
          // remove title
          title: function (tooltipItem, data) {
            return '';
          },
          label: function (tooltipItem, data) {
            let label = '';

            const img = new Image();

            img.src = iconsArray[tooltipItem.index].icon;

            img.addEventListener('load', function () {
              canvas.drawImage(img, tooltipItem.x - 20, tooltipItem.y - 40);
            });

            label += Math.round(tooltipItem.yLabel * 100) / 100;

            return label;
          },
        },
      },
    },
  };

  const weather = new Chart(canvas, config);
}
