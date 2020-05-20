const demo = document.querySelector('#demo');

let clickCounter = 0;
function yourCurrencies() {
  const currCode = document.querySelectorAll('#demo .code');
  // const currentRate = document.querySelectorAll('.currentRate');
  clickCounter += 1;
  console.log(clickCounter);
  //   console.log(clickCounter);
  demo.innerHTML = '';
  // get currencies code from table and push it into array
  const url = [];
  for (let i = 0; i < currCode.length; i += 1) {
    const getClickCounter = clickCounter;
    url.push(currCode[i].innerHTML);
    // console.log(url);
    fetch('https://api.exchangerate-api.com/v4/latest/' + url[i])
      .then((rr) => rr.json())
      .then((rr) => {
        if (parseInt(getClickCounter % 2, 10) === 0) {
          demo.innerHTML += `<div class="converterTable">
                          <div>
                              <span class="close">x</span>
                              <div class="flag" >
                                  <img src="/assets/img/${url[i]}.png">
                              </div>
                              <div class="code">${url[i]}</div>
                          </div>
                          <div class="convertTable table-item">
                              <div id="rate-1-EUR" class="currentRate">1 ${url[i]} = ${rr.rates.EUR.toFixed(2)} EUR</div>
                          </div>
                          <div class="convertTable table-item">
                              <div id="rate-1-USD" class="currentRate">1 ${url[i]} = ${rr.rates.USD.toFixed(2)} USD</div>
                          </div>
                          <div class="convertTable table-item">
                              <div id="rate-1-GBP" class="currentRate">1 ${url[i]} = ${rr.rates.GBP.toFixed(2)} GBP</div>
                          </div>
                          <div class="convertTable table-item">
                              <div id="rate-1-CHF" class="currentRate">1 ${url[i]} = ${rr.rates.CHF.toFixed(2)} CHF</div>
                          </div>
                          <div class="convertTable table-item">
                              <div id="rate-1-PLN" class="currentRate">1 ${url[i]} = ${rr.rates.PLN.toFixed(2)} PLN</div>
                          </div>
                      </div>`;
        } else {
          demo.innerHTML += `<div class="converterTable">
            <div>
                <span class="close">x</span>
                <div class="flag" >
                    <img src="/assets/img/${url[i]}.png">
                </div>
                <div class="code">${url[i]}</div>
            </div>
            <div class="convertTable table-item">
                <div id="rate-1-EUR" class="currentRate">1 EUR = ${(1 / rr.rates.EUR).toFixed(2)} ${url[i]}</div>
            </div>
            <div class="convertTable table-item">
                <div id="rate-1-USD" class="currentRate">1 USD = ${(1 / rr.rates.USD).toFixed(2)} ${url[i]}</div>
            </div>
            <div class="convertTable table-item">
                <div id="rate-1-GBP" class="currentRate">1 GBP = ${(1 / rr.rates.GBP).toFixed(2)} ${url[i]}</div>
            </div>
            <div class="convertTable table-item">
                <div id="rate-1-CHF" class="currentRate">1 CHF = ${(1 / rr.rates.CHF).toFixed(2)} ${url[i]}</div>
            </div>
            <div class="convertTable table-item">
                <div id="rate-1-PLN" class="currentRate">1 PLN = ${(1 / rr.rates.PLN).toFixed(2)} ${url[i]}</div>
            </div>
        </div>`;
        }
      });
  }

  //   url.forEach(function (code) {
  //     const currentRate = document.querySelectorAll('.currentRate');
  //     console.log('https:api.exchangerate-api.com/v4/latest/' + code);
  //     fetch('https://api.exchangerate-api.com/v4/latest/' + code)
  //       .then((re) => re.json())
  //       .then((body) => {
  //         console.log(body);

  //         const demo = document.querySelector('#demo');
  //         demo.innerHTML = '';
  //         demo.innerHTML += `<div class="converterTable">
  //                         <div>
  //                             <span class="close">x</span>
  //                             <div class="flag" id="flag_of_Emirates">
  //                                 <img src="/assets/img/Emirates.png">
  //                             </div>
  //                             <div class="code">${code}</div>
  //                         </div>
  //                         <div class="convertTable table-item">
  //                             <div id="rate-1-EUR" class="currentRate">${body.rates.EUR.toFixed(2) + ' EUR'}</div>
  //                         </div>
  //                         <div class="convertTable table-item">
  //                             <div id="rate-1-USD" class="currentRate">1 AED = 0.27 USD</div>
  //                         </div>
  //                         <div class="convertTable table-item">
  //                             <div id="rate-1-GBP" class="currentRate">1 AED = 0.22 GBP</div>
  //                         </div>
  //                         <div class="convertTable table-item">
  //                             <div id="rate-1-CHF" class="currentRate">1 AED = 0.27 CHF</div>
  //                         </div>
  //                         <div class="convertTable table-item">
  //                             <div id="rate-1-PLN" class="currentRate">1 AED = 1.14 PLN</div>
  //                         </div>
  //                     </div>`;
  //         console.log(demo);

  // // for (let i = 0; i < 5; i += 1) {
  // if (parseInt(clickCounter % 2, 10) === 0) {
  //   currentRate[0].innerHTML = body.rates.EUR.toFixed(2) + ' EUR';
  //   currentRate[1].innerHTML = body.rates.USD.toFixed(2) + ' USD';
  //   currentRate[2].innerHTML = body.rates.GBP.toFixed(2) + ' GBP';
  //   currentRate[3].innerHTML = body.rates.CHF.toFixed(2) + ' CHF';
  //   currentRate[4].innerHTML = body.rates.PLN.toFixed(2) + ' PLN';
  // } else {
  //   currentRate[0].innerHTML = (1 / body.rates.EUR).toFixed(2) + ' EUR';
  //   currentRate[1].innerHTML = (1 / body.rates.USD).toFixed(2) + ' USD';
  //   currentRate[2].innerHTML = (1 / body.rates.GBP).toFixed(2) + ' GBP';
  //   currentRate[3].innerHTML = (1 / body.rates.CHF).toFixed(2) + ' CHF';
  //   currentRate[4].innerHTML = (1 / body.rates.PLN).toFixed(2) + ' PLN';
  // }
  // // }
  //   });
  //   });

  // fetch('https://api.exchangerate-api.com/v4/latest/' + currCode[0].innerHTML)
  //   .then((re) => re.json())
  //   .then((re) => {
  //     console.log(RE);
  //   });

  // fetch('https://api.exchangerate-api.com/v4/latest/' + currCode)
  //   .then((re) => re.json())
  //   .then((re) => {
  //     console.log(re);
  // if (parseInt(counter % 2, 10) === 0) {
  //   currentRate[i].innerHTML = body.rates.EUR.toFixed(2) + ' EUR';
  //   currentRate[i].innerHTML = body.rates.USD.toFixed(2) + ' USD';
  //   currentRate[i].innerHTML = body.rates.GBP.toFixed(2) + ' GBP';
  //   currentRate[i].innerHTML = body.rates.CHF.toFixed(2) + ' CHF';
  //   currentRate[i].innerHTML = body.rates.PLN;
  // } else {
  //   plnEur.innerHTML = (body.rates.PLN / body.rates.EUR).toFixed(2) + ' PLN';
  //   plnUsd.innerHTML = (body.rates.PLN / body.rates.USD).toFixed(2) + '  PLN';
  //   plnGbp.innerHTML = (body.rates.PLN / body.rates.GBP).toFixed(2) + '  PLN';
  //   plnChf.innerHTML = (body.rates.PLN / body.rates.CHF).toFixed(2) + '  PLN';
  //   plnPln.innerHTML = body.rates.PLN;
  // }
}

// fetch('https://api.exchangerate-api.com/v4/latest/' + currCode)
//   .then((resp) => respo.json())
//   .then((resp) => {});

// const currentRate = document.querySelectorAll('.currentRate');
// clickCounter += 1;
// console.log(clickCounter);
// for (let i = 0; i < currentRate.length; i += 1) {
//   console.log(currentRate[i].textContent);
//   if (clickCounter === 1) {
//     currentRate[i].textContent = parseFloat(1 / currentRate[i].textContent.slice(8, 12), 10).toFixed(2);
//     // console.log(1 / currentRate[i].textContent.slice(8, 12));
//   } else if (parseInt(clickCounter % 2, 10) === 0) {
//     currentRate[i].textContent = parseFloat(1 / currentRate[i].textContent.slice(0, 3), 10).toFixed(2);
//   } else {
//     currentRate[i].textContent = parseFloat(1 / currentRate[i].textContent.slice(0, 4)).toFixed(2);
//   }
// }
// });

export { yourCurrencies };
