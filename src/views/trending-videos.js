import $ from 'jquery';

function appendVideos(videos) {
  const trendingYoutubeViedeosWrapper = $('#trending-youtube-videos');

  if (videos.items) {
    videos.items.map((item) => {
      trendingYoutubeViedeosWrapper.append(
        $(`
        <div class="video-item">
          <h2>${item.snippet.title}</h2>
          <div class="video-content">
            <div><p>${item.snippet.description}</p></div>
            <div>
              <iframe type="text/html" width="640" height="360"
                src="http://www.youtube.com/embed/${item.id}"
                frameborder="0"/>
            </div>
          </div>
        </div>
      `),
      );

      return item;
    });
  }
}

export async function trendingYoutubeView() {
  async function getTrendingVideosForPoland(limit) {
    const API_KEY = 'AIzaSyAuDhPTKYedbL1EGEtERgu9KC-Dj4Et5hg';

    const api = `https://www.googleapis.com/youtube/v3/videos?part=id,snippet&chart=mostPopular&regionCode=PL&maxResults=${limit}&key=${API_KEY}`;

    const res = await fetch(api);
    const json = await res.json();
    return json;
  }

  const trendingVideos = await getTrendingVideosForPoland(5);

  appendVideos(trendingVideos);
}
