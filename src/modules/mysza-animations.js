// import $ from 'jquery';
import { gsap } from 'gsap';
// import { removeEvent } from '../main';

let animationActive = false;

// timeline'y
const tl = gsap.timeline();
const tl2 = gsap.timeline();
const tl3 = gsap.timeline();
const tl4 = gsap.timeline();
const tl5 = gsap.timeline();
// cała mysza
const myszaShape = document.getElementById('mysza-cala');
// możliwe stany oczek myszy
const eyesShape = document.getElementById('eyes');
const eyeLeft = document.getElementById('left-eye');
const eyeRight = document.getElementById('right-eye');
// możliwe stany rąk
const handLeft = document.getElementById('left-hand');
const handRight = document.getElementById('right-hand');
// możliwe stany stóp
const footLeft = document.getElementById('left-foot');
const footRight = document.getElementById('right-foot');
// możliwe stan buzi myszy
const mouthShape = document.getElementById('mouth');
const mouthOpenedPath = 'M187.69,218.04l66.23-2.26c0,0,3.07,23.05-30.07,25.18C190.71,243.09,187.69,218.04,187.69,218.04z';
const mouthClosedPath = 'M187.69,218.04l66.23-2.26c0,0,3.24,0.89-29.91,3.02C190.87,220.93,187.69,218.04,187.69,218.04z';
// możliwe stan ogonka
const tailShape = document.getElementById('tail');

// funkcja zwracają wartość zmiennej animationEnded
export function isAnimationActive() {
  return animationActive;
}

// zmienia wartość animationEnded na false - umieszczam na końcu każdej animacji
function animationStart() {
  animationActive = true;
  console.log('poczatek animacji');
}

// zmienia wartość animationActive na true - umieszczam na początku każdej animacji
function animationEnd() {
  animationActive = false;
  console.log('koniec animacji');
}

export function addAnimation(animationName) {
  tl.clear();
  switch (animationName) {
    // krótkie zdanie
    case 'short-sentence':
      tl.call(animationStart);
      tl.to(mouthShape, 0.1, { attr: { d: mouthOpenedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthClosedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthOpenedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthClosedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthOpenedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthClosedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthOpenedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthClosedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthOpenedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthClosedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthOpenedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthClosedPath } });
      tl.call(animationEnd);
      break;
    // długie zdanie
    case 'long-sentence':
      tl.call(animationStart);
      tl.to(mouthShape, 0.1, { attr: { d: mouthOpenedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthClosedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthOpenedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthClosedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthOpenedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthClosedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthOpenedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthClosedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthOpenedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthClosedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthOpenedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthClosedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthOpenedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthClosedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthOpenedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthClosedPath } });
      tl.call(animationEnd);
      break;
    // oczy na boki
    case 'eyes-aside':
      tl.call(animationStart);
      tl.to(eyesShape, 0.5, { x: 10 });
      tl.to(eyesShape, 0.5, { delay: 0.3, x: -10 });
      tl.to(eyesShape, 0.5, { delay: 0.3, x: 0 });
      tl2.to([eyeLeft, eyeRight], 0.7, { scaleY: 0.7, rotation: -25, transformOrigin: 'center' });
      tl2.to([eyeLeft, eyeRight], 0.7, { scaleY: 1, rotation: 0, transformOrigin: 'center', delay: 1 });
      tl.call(animationEnd);
      break;
    // skok
    case 'jump':
      tl.call(animationStart);
      tl.to(myszaShape, 0.4, { y: -100 });
      tl2.to(handLeft, 0.4, { rotation: 70, transformOrigin: 'top, right' });
      tl3.to(handRight, 0.4, { rotation: -70, transformOrigin: 'top, left' });
      tl4.to(footLeft, 0.4, { rotation: -50, transformOrigin: 'top, right' });
      tl5.to(footRight, 0.4, { rotation: 50, transformOrigin: 'top, left' });
      tl.to(myszaShape, 0.4, { y: 0 });
      tl2.to(handLeft, 0.4, { rotation: 0, transformOrigin: 'top, right' });
      tl3.to(handRight, 0.4, { rotation: 0, transformOrigin: 'top, left' });
      tl4.to(footLeft, 0.4, { rotation: 0, transformOrigin: 'top, right' });
      tl5.to(footRight, 0.4, { rotation: 0, transformOrigin: 'top, left' });
      tl.call(animationEnd);
      break;
    // mrugnięcie
    case 'blink':
      tl.call(animationStart);
      tl.to([eyeLeft, eyeRight], 0.1, { scaleY: 0.1, rotation: 35, transformOrigin: 'center' });
      tl.to([eyeLeft, eyeRight], 0.1, { scaleY: 1, rotation: 0, transformOrigin: 'center' });
      tl.call(animationEnd);
      break;
    // machanie ogonkiem
    case 'move-tail':
      tl.call(animationStart);
      tl.to(tailShape, 0.2, { scaleY: 0.8, rotation: 10, transformOrigin: 'left, bottom' });
      tl.to(tailShape, 0.4, { scaleY: 1.2, rotation: -10, transformOrigin: 'left, bottom' });
      tl.to(tailShape, 0.2, { scaleY: 1, rotation: 0, transformOrigin: 'left, bottom' });
      tl.call(animationEnd);
      break;
    // czyszczenie timeline'a
    case 'reset-to-defaults':
      gsap.to(myszaShape, 0, { x: 0, y: 0 });
      gsap.to(mouthShape, 0, { attr: { d: mouthClosedPath } });
      gsap.to(eyesShape, 0, { x: 0, y: 0 });
      tl.restart();
      tl.clear();
      tl.repeat(0);
      tl2.restart();
      tl2.clear();
      tl2.repeat(0);
      break;
    default:
      alert('cos innego');
      break;
  }
}
