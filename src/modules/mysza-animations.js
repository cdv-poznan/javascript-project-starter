// import $ from 'jquery';
import { gsap } from 'gsap';
import { removeEvent } from '../main';

// timeline'y
const tl = gsap.timeline();
const tl2 = gsap.timeline();
// cała mysza
const myszaShape = document.getElementById('mysza-cala');
// możliwe stany oczek myszy
const eyesShape = document.getElementById('eyes');
const eyeLeft = document.getElementById('left-eye');
const eyeRight = document.getElementById('right-eye');
// możliwe stan buzi myszy
const mouthShape = document.getElementById('mouth');
const mouthOpenedPath = 'M187.69,218.04l66.23-2.26c0,0,3.07,23.05-30.07,25.18C190.71,243.09,187.69,218.04,187.69,218.04z';
const mouthClosedPath = 'M187.69,218.04l66.23-2.26c0,0,3.24,0.89-29.91,3.02C190.87,220.93,187.69,218.04,187.69,218.04z';

export function addAnimation(animationName) {
  tl.clear();
  switch (animationName) {
    // krótkie zdanie
    case 'short-sentence':
      tl.repeat(6);
      tl.to(mouthShape, 0.1, { attr: { d: mouthOpenedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthClosedPath } });
      tl.add(removeEvent());
      break;
    // długie zdanie
    case 'long-sentence':
      tl.repeat(10);
      tl.to(mouthShape, 0.1, { attr: { d: mouthOpenedPath } });
      tl.to(mouthShape, 0.1, { attr: { d: mouthClosedPath } });
      break;
    // oczy na boki
    case 'eyes-aside':
      tl.to(eyesShape, 0.5, { x: 10 });
      tl.to(eyesShape, 0.5, { delay: 0.3, x: -10 });
      tl.to(eyesShape, 0.5, { delay: 0.3, x: 0 });
      tl2.to([eyeLeft, eyeRight], 0.2, { scaleY: 0.7, rotation: -25, transformOrigin: 'center' });
      break;
    case 'jump':
      tl.to(myszaShape, 0.5, { y: -100 });
      tl.to(myszaShape, 0.5, { y: 0 });
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
