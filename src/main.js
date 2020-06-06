// import lodash from 'lodash';
import Tone from 'tone';
// import Transport from 'tone/transport';
// import Transport from 'tone/Tone/core/Transport';

document.addEventListener('DOMContentLoaded', () => {
  let technoIsPlayed = false;
  const styles = document.querySelector('#styles');
  document.querySelector('#styleChanger').addEventListener('click', () => styles.classList.toggle('hidden'));
  // TECHNO
  function technoSequencer(state) {
    const kick = new Tone.Player('./assets/samples/techno/technoKick.wav').toMaster();
    const hat = new Tone.Player('./assets/samples/techno/technoHat.wav').toMaster();
    const snare = new Tone.Player('./assets/samples/techno/technoSnare.wav').toMaster();
    const shaker = new Tone.Player('./assets/samples/techno/technoShaker.wav').toMaster();
    let index = 0;
    function repeat() {
      const step = index % 16;
      const kickInputs = document.querySelector(`.kick input:nth-of-type(${step + 1})`);
      const hatInputs = document.querySelector(`.hihat input:nth-of-type(${step + 1})`);
      const snareInputs = document.querySelector(`.snare input:nth-of-type(${step + 1})`);
      const shakerInputs = document.querySelector(`.shaker input:nth-of-type(${step + 1})`);
      if (kickInputs.checked) {
        kick.start();
      }
      if (hatInputs.checked) {
        hat.start();
      }
      if (snareInputs.checked) {
        snare.start();
      }
      if (shakerInputs.checked) {
        shaker.start();
      }
      index += 1;
      console.log(index);
    }
    Tone.Transport.scheduleRepeat(repeat, '16n');
    Tone.Transport.start();
    if (state === 'stop') {
      Tone.Transport.stop();
      // kick.stop();
      // hat.stop();
      // snare.stop();
      // shaker.stop();
      Tone.Master.dispose();
      // index = 0;
    }
  }
  function playTechno() {
    if (!technoIsPlayed) {
      technoIsPlayed = true;
      technoSequencer('start');
    } else {
      technoIsPlayed = false;
      technoSequencer('stop');
    }
  }
  const playBtn = document.querySelector('#play');
  //  TO DO
  playBtn.addEventListener('click', function () {
    if (technoIsPlayed === true) {
      playBtn.innerHTML = '<i class="icon-play-circled2"></i>';
    } else playBtn.innerHTML = '<i class="icon-pause-circle-o"></i>';
    playTechno();
  });
});
