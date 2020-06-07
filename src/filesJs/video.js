import gapi from 'gapi-client';

import $ from 'jquery';

export function videoFiles(data) {
  $.each(data.items, function (i, item) {
    const id = item.id.videoId;
    gapi.client.youtube.videos
      .list({
        part: 'statistics',
        id: id,
      })
      .then(
        function (response) {
          let viewCounts = response.result.items[0].statistics.viewCount;
          if (viewCounts > 1000 && viewCounts < 1000000) {
            viewCounts = (viewCounts / 1000).toFixed(2) + 'tys wyswietleń';
          } else if (viewCounts > 1000000) {
            viewCounts = (viewCounts / 1000000).toFixed(1) + 'mln wyswietleń';
          }
          let titlesShort = item.snippet.title;
          if (titlesShort.length > 50) titlesShort = item.snippet.title.substring(0, 55) + `...`;
          const chinelTitle = item.snippet.channelTitle;

          $('#page').append(
            `
            <div class="col-sm-6 col-md-4 col-xl-3 bg-blue boxVideo" data-key = "${id}">
              <iframe src="https://www.youtube.com/embed/${id} " frameborder="0" class="img-fluid"></iframe>
              <div>
                <h4 class="h6">${titlesShort}</h4>
              </div>
              <div>
                <p class= "h8">${chinelTitle}</p>
                <p class= "h8">${viewCounts}</p>
              </div>
            </div>
            `,
          );
        },
        function (err) {
          console.error('Execute error', err);
        },
      );
  });
}
