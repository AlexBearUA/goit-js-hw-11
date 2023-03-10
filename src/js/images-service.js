import { Notify } from 'notiflix/build/notiflix-notify-aio';
const axios = require('axios').default;
const API_KEY = '34213016-753010ce7a0400954b4163a43';
const BASE_URL = 'https://pixabay.com/api';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 40;
  }

  async fetchImages(loadMoreBtn) {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=${this.perPage}&page=${this.page}`;

    const data = await axios.get(url);
    const images = data.data.hits;
    const totalHits = data.data.totalHits;

    if (images.length === 0) {
      Notify.info(
        'Sorry, there are no images matching your search query. Please try again.',
        {
          position: 'left-top',
        }
      );
      return;
    }

    if (this.page === 1) {
      data.total <= 500
        ? Notify.info(`Hooray! We found ${data.total} images!`, {
            position: 'left-top',
          })
        : Notify.info(
            `Hooray! We found ${data.total} images, but we will show you only ${totalHits}. Ha-ha!`,
            {
              position: 'left-top',
            }
          );
    }
    console.log(this.perPage, this.page, totalHits);
    if (this.perPage * this.page >= totalHits) {
      loadMoreBtn.hide();
      Notify.info(
        "We're sorry, but you've reached the end of search results.",
        {
          position: 'left-top',
        }
      );
      return images;
    }

    this.incrementPage();
    loadMoreBtn.show();
    return images;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
