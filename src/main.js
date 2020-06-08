import $ from 'jquery';

import gapi from 'gapi-client';

import { videoFiles } from './filesJs/video';
import { sidebarFiles } from './filesJs/sidebar';

const authentic = document.getElementById('authentical');
const execut = document.getElementById('execute');
const channelInput = document.getElementById('searchInput');

$(document).ready(sidebarFiles());

function startPage() {
  $(document).ready(function () {
    const key = 'AIzaSyDv5owCJlHoQzrksy3625i5xKNyKU-KsVc';
    const URL = 'https://www.googleapis.com/youtube/v3/search';
    const options = {
      part: 'snippet',
      key: key,
      q: 'react tutorial',
      maxResults: 8,
    };
    function loadVids() {
      $.getJSON(URL, options, function (data) {
        videoFiles(data);
      });
    }
    loadVids();
  });
}

function loadClient() {
  gapi.client.setApiKey('AIzaSyDv5owCJlHoQzrksy3625i5xKNyKU-KsVc');
  return gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest').then();
}

function authenticate() {
  loadClient();
  return gapi.auth2
    .getAuthInstance()
    .signIn({ scope: 'https://www.googleapis.com/auth/youtube.force-ssl' })
    .then(
      function () {
        gapi.load('client:auth2', startPage);
      },
      function (err) {
        console.error('Error signing in', err);
      },
    );
}
authentic.addEventListener('click', authenticate);

gapi.load('client:auth2', function () {
  gapi.auth2.init({ client_id: '496761076959-ktq3d6ofsnmub63dms35iuvdqnca6g69.apps.googleusercontent.com' });
});

function searchVideo(channel) {
  $(document).ready(function () {
    const URL = 'https://www.googleapis.com/youtube/v3/search';
    const key = 'AIzaSyDv5owCJlHoQzrksy3625i5xKNyKU-KsVc';
    const options = {
      part: 'snippet',
      key: key,
      q: channel,
      maxResults: 8,
    };

    $.getJSON(URL, options, function (data) {
      videoFiles(data);
    });
  });
}

execut.addEventListener('click', function (e) {
  e.preventDefault();
  const boxVideo = [...document.querySelectorAll('.boxVideo')];
  boxVideo.forEach((box) => box.remove());
  const channel = channelInput.value;
  searchVideo(channel);
});
