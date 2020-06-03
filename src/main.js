// import lodash from 'lodash';
import Tone from 'tone';
// import Transport from 'tone/Tone/core/Transport';

document.addEventListener('DOMContentLoaded', () => {
  function technoSequencer() {
    const kick = new Tone.Player('./assets/samples/techno/technoKick.wav').toMaster();
    // const hat = new Tone.Player('./assets/samples/techno/technoHat.wav').toMaster();
    let index = 0;
    function repeat() {
      const step = index % 16;
      // console.log(step);
      const kickInputs = document.querySelector(`.kick input:nth-of-type(${step + 1})`);
      if (kickInputs.checked) {
        kick.start();
      }
      index += 1;
      console.log('index: ', index);
      console.log('step: ', step);
    }
    Tone.Transport.scheduleRepeat(repeat, '16n');
    Tone.Transport.start();
  }
  technoSequencer();
});
