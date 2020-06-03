// import lodash from 'lodash';
import Tone from 'tone';
// import Transport from 'tone/Tone/core/Transport';

document.addEventListener('DOMContentLoaded', () => {
  const styles = document.querySelector('#styles');
  document.querySelector('#styleChanger').addEventListener('click', () => styles.classList.toggle('hidden'));
  // TECHNO
  function technoSequencer() {
    const kick = new Tone.Player('./assets/samples/techno/technoKick.wav').toMaster();
    const hat = new Tone.Player('./assets/samples/techno/technoHat.wav').toMaster();
    let index = 0;
    function repeat() {
      const step = index % 16;
      const kickInputs = document.querySelector(`.kick input:nth-of-type(${step + 1})`);
      const hatInputs = document.querySelector(`.hihat input:nth-of-type(${step + 1})`);
      if (kickInputs.checked) {
        kick.start();
      }
      if (hatInputs.checked) {
        hat.start();
      }
      index += 1;
    }
    Tone.Transport.scheduleRepeat(repeat, '16n');
    Tone.Transport.start();
  }
  technoSequencer();
});
