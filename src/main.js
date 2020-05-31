import 'bootstrap';
import $ from 'jquery';
// import { enableCases } from './controllers/cases';
// import { enableChart } from './controllers/chart';
// import { enableExchange } from './controllers/exchange';
// import { enableNotify } from './controllers/notify';
// import { enableTodo } from './controllers/todo';
// import { enableVoices } from './controllers/voices';
import { enableRouting } from './routing';
import { createFabric } from './create';

async function main() {
  //   enableCases();
  //   enableChart();
  //   enableExchange();
  //   enableNotify();
  //   enableTodo();
  //   enableVoices();
  enableRouting();
  createFabric();
}

$(document).ready(main);
