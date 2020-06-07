import $ from 'jquery';

import { videoFiles } from './video';

export function startPageFiles() {
  $(document).ready(function () {
    const key = 'AIzaSyDv5owCJlHoQzrksy3625i5xKNyKU-KsVc';
    const URL = 'https://www.googleapis.com/youtube/v3/search';
    const options = {
      part: 'snippet',
      key: key,
      q: 'react tutorial',
      maxResults: 12,
    };
      $.getJSON(URL, options, function (data) {
        videoFiles(data);
      });
  });
}
