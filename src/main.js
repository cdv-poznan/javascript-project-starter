import $ from 'jquery';
import { addAnimation } from './modules/mysza-animations';

let isActive = false;

export function removeEvent() {
  addAnimation('reset-to-defaults');
  $('#text-container').empty();
  isActive = false;
}

function addEvent(animationName, text) {
  isActive = true;
  addAnimation(animationName);
  if (text) {
    $('#text-container').append('<p>' + text + '</p>');
  }
}

function singleBehaviour(animationName, text, time) {
  return new Promise((resolve, reject) => {
    while ((isActive = true)) {
      // czekaj dopóki wykonuje się jakieś zachowanie
    }
    addEvent(animationName, text);
    setTimeout(() => {
      removeEvent();
      resolve();
    }, time);
  });
}

function manageBehaviours() {
  const animationName1 = document.getElementById('animation-list1').value;
  const text1 = document.getElementById('text-field1').value;
  const duration1 = document.getElementById('duration-time1').value;
  const animationName2 = document.getElementById('animation-list2').value;
  const text2 = document.getElementById('text-field2').value;
  const duration2 = document.getElementById('duration-time2').value;
  singleBehaviour(animationName1, text1, duration1).then((value) => {
    singleBehaviour(animationName2, text2, duration2);
  });
}

function addInterval(animationName, interval) {
  setInterval(() => {

    addEvent(animationName);
  }, interval);
}

// document.addEventListener('DOMContentLoaded', () => {
$('#trigger-events').click(manageBehaviours);
// });

$('#add-interval').click(addInterval);
