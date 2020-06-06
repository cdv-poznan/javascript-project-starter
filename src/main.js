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
    const technoKick = new Tone.Buffer('./assets/samples/techno/technoKick.wav');
    const technoHat = new Tone.Buffer('./assets/samples/techno/technoHat.wav');
    const technoSnare = new Tone.Buffer('./assets/samples/techno/technoSnare.wav');
    const technoShaker = new Tone.Buffer('./assets/samples/techno/technoShaker.wav');
    let technoKickPlayer = {};
    let technoHatPlayer = {};
    let technoSnarePlayer = {};
    let technoShakerPlayer = {};
    Tone.Buffer.on('load', function () {
      technoKickPlayer = new Tone.Player(technoKick);
      technoKickPlayer.toMaster();
      technoHatPlayer = new Tone.Player(technoHat);
      technoHatPlayer.toMaster();
      technoSnarePlayer = new Tone.Player(technoSnare);
      technoSnarePlayer.toMaster();
      technoShakerPlayer = new Tone.Player(technoShaker);
      technoShakerPlayer.toMaster();
    });
    let index = 0;
    function repeat() {
      const step = index % 16;
      let kickInputs = [];
      let hatInputs = [];
      let snareInputs = [];
      let shakerInputs = [];
      kickInputs = document.querySelector(`.kick input:nth-of-type(${step + 1})`);
      hatInputs = document.querySelector(`.hihat input:nth-of-type(${step + 1})`);
      snareInputs = document.querySelector(`.snare input:nth-of-type(${step + 1})`);
      shakerInputs = document.querySelector(`.shaker input:nth-of-type(${step + 1})`);
      if (kickInputs.checked) {
        technoKickPlayer.start();
      }
      if (hatInputs.checked) {
        technoHatPlayer.start();
      }
      if (snareInputs.checked) {
        technoSnarePlayer.start();
      }
      if (shakerInputs.checked) {
        technoShakerPlayer.start();
      }
      index += 1;
    }
    if (state === 'start') {
      Tone.Transport.bpm.value = 140;
      Tone.Transport.scheduleRepeat(repeat, '16n');
      Tone.Transport.start();
    }
    if (state === 'stop') {
      Tone.Transport.cancel();
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
  playBtn.addEventListener('click', function () {
    if (technoIsPlayed === true) {
      playBtn.innerHTML = '<i class="icon-play-circled2"></i>';
    } else playBtn.innerHTML = '<i class="icon-pause-circle-o"></i>';
    playTechno();
  });
});
