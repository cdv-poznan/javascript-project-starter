import $ from 'jquery';
import 'bootstrap';
import { addAnimation, isAnimationActive } from './modules/mysza-animations';
import { getUrbanDefinition } from './modules/urban-dictionary-api';
import { editText, sliceLongString } from './modules/text-editor-module';
import { translateString } from './modules/google-translate-module';

let isSingleTalkEventActive = false;
let newInterval = false;
const intervalsList = [];

function removeTalkEvent() {
  // addAnimation('reset-to-defaults');
  $('#text-container').empty();
}

// dodaje kontener z tekstem
function addTextToContainer(text) {
  $('#text-container').append('<p>' + text + '</p>');
}

// pojedyncze zdarzenie gadania
function singleTalkEvent(editedText) {
  const isActiveChecker = setInterval(() => {
    if (isAnimationActive() === false) {
      clearInterval(isActiveChecker);
      if (editedText.length < 30) {
        addAnimation('short-sentence');
      } else {
        addAnimation('long-sentence');
      }
      addTextToContainer(editedText);
      isSingleTalkEventActive = true;
      const isEndedChecker = setInterval(() => {
        if (isAnimationActive() === false) {
          removeTalkEvent();
          isSingleTalkEventActive = false;
        }
      }, 100);
    }
  }, 100);
}

// chciałem to zrobić rekurencją, ale nie potrafiłem ogarnąć :( chętnie przyjmę pomoc :)
// obsługa gadania
function addTalkingEvent(text) {
  const editedText = sliceLongString(text);
  // jeśli zmieści się w jednej chmurce
  if (typeof editedText === 'string') {
    singleTalkEvent(text);
    // jeśli tekst jest dłuższy
  } else if (typeof editedText === 'object') {
    singleTalkEvent(editedText[0]);
    let isActiveChecker = setInterval(() => {
      if (isSingleTalkEventActive === false) {
        clearInterval(isActiveChecker);
        singleTalkEvent(editedText[1]);
        isActiveChecker = setInterval(() => {
          if (isSingleTalkEventActive === false) {
            clearInterval(isActiveChecker);
            if (editedText[2]) {
              singleTalkEvent(editedText[2]);
              isActiveChecker = setInterval(() => {
                if (isSingleTalkEventActive === false) {
                  clearInterval(isActiveChecker);
                  if (editedText[3]) {
                    singleTalkEvent(editedText[2]);
                  }
                }
              }, 100);
            }
          }
        }, 100);
      }
    }, 100);
  }
}

// dodaje interwał
function addInterval(animationName, interval) {
  // pierwszy active ckecker, zeby dodac pierwsze zdarzenie przed wlasciwym interwalem
  let isActiveChecker = setInterval(() => {
    if (isAnimationActive() === false) {
      // pierwsze zdarzenie
      clearInterval(isActiveChecker);
      addAnimation(animationName);
      // wlasciwy interwal
      newInterval = setInterval(() => {
        // wewnetrzy active checker
        isActiveChecker = setInterval(() => {
          if (isAnimationActive() === false) {
            clearInterval(isActiveChecker);
            console.log(intervalsList);
            addAnimation(animationName);
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
  for (i = 0; i < intervalsList.length; i++) {
    if (intervalsList[i][1] === animationName) {
      clearInterval(intervalsList[i][0]);
      intervalsList.splice(i, 1);
    }
  }
}

// szuka, czy podana animacja interwalu jest już na liście - zwraca true/false
function isIntervalAdded(animationName) {
  let i;
  for (i = 0; i < intervalsList.length; i++) {
    if (intervalsList[i][1] === animationName) {
      return true;
    }
  }
  return false;
}

// switche z interwalami
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

// animacja raz guzik
$('.interval-once').click(function (event) {
  const animationName = event.target.getAttribute('animation-name');
  const isActiveChecker = setInterval(() => {
    if (isAnimationActive() === false) {
      addAnimation(animationName);
      clearInterval(isActiveChecker);
    }
  }, 100);
});

// guzik dodaj tekst
$('.single-event-button').click(function () {
  const text = $('input.single-event-text-input').val();
  addTalkingEvent(text);
});

// guzik podaj definicje
$('.api-button').click(async function () {
  const toDefine = $('input.api-text-input').val();
  const definition = await getUrbanDefinition(toDefine);
  addTalkingEvent(editText(definition));
});
