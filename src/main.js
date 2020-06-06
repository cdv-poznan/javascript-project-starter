import $ from 'jquery';
import 'bootstrap';
import { addAnimation, isAnimationActive } from './modules/mysza-animations';
import { getUrbanDefinition } from './modules/urban-dictionary-api';

const isActive = false;
let newInterval = false;
const intervalsList = [];

export function removeEvent() {
  // addAnimation('reset-to-defaults');
  $('#text-container').empty();
}

function addEvent(animationName, text) {
  addAnimation(animationName);
  if (text) {
    $('#text-container').append('<p>' + text + '</p>');
  }
  const isEndedChecker = setInterval(() => {
    if (isAnimationActive() === false) {
      removeEvent();
    }
  }, 100);
}

function singleBehaviour(animationName, text, time) {
  return new Promise((resolve, reject) => {
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

// dodaje interwał
function addInterval(animationName, interval) {
  // pierwszy active ckecker, zeby dodac pierwsze zdarzenie przed wlasciwym interwalem
  let isActiveChecker = setInterval(() => {
    if (isAnimationActive() === false) {
      // pierwsze zdarzenie
      addAnimation(animationName);
      clearInterval(isActiveChecker);
      // wlasciwy interwal
      newInterval = setInterval(() => {
        // wewnetrzy active checker
        isActiveChecker = setInterval(() => {
          if (isAnimationActive() === false) {
            addAnimation(animationName);
            clearInterval(isActiveChecker);
          }
        }, 100);
      }, interval);
      intervalsList.push([newInterval, animationName]);
    }
  }, 100);
}

// usuwa interwał
function removeInterval(animationName) {
  let i;
  for (i = 0; i < intervalsList.length; i = +1) {
    if (intervalsList[i][1] === animationName) {
      clearInterval(intervalsList[i][0]);
      intervalsList.splice(i, 1);
    }
  }
}

// szuka, czy podana animacja interwalu jest już na liście - zwraca true/false
function isIntervalAdded(animationName) {
  let i;
  for (i = 0; i < intervalsList.length; i = +1) {
    if (intervalsList[i][1] === animationName) {
      return true;
    }
  }
  return false;
}

$('#trigger-events').click(manageBehaviours);

$('.add-interval-button').click(function (event) {
  addInterval(event.target.getAttribute('animation-name'), 3000);
});

$('.remove-interval-button').click(function (event) {
  removeInterval(event.target.getAttribute('animation-name'));
});

$('.interval-toggle-option').click(function (event) {
  const animationName = event.target.parentElement.parentNode.getAttribute('animation-name');
  const animationDuration = event.target.getAttribute('value');
  if (animationDuration) {
    removeInterval(animationName);
    addInterval(animationName, animationDuration);
  } else {
    removeInterval(animationName);
  }
});

$('.interval-once').click(function (event) {
  const animationName = event.target.getAttribute('animation-name');
  const isActiveChecker = setInterval(() => {
    if (isAnimationActive() === false) {
      addAnimation(animationName);
      clearInterval(isActiveChecker);
    }
  }, 100);
});

$('.single-event-button').click(function () {
  const animationText = $('input.single-event-text-input').val();
  if (animationText) {
    if (animationText.length < 15) {
      addEvent('short-sentence', animationText);
    } else {
      addEvent('long-sentence', animationText);
    }
  }
});

$('.api-button').click(function () {
  const wartosc = $('input.api-text-input').val();
  console.log(wartosc);
  const apiResponse = getUrbanDefinition(wartosc);
  if (apiResponse) {
    console.log(apiResponse);
    $('#output').text(apiResponse);
  }
});
