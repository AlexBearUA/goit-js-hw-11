const API_KEY = '34213016-753010ce7a0400954b4163a43';
const BASE_URL = 'https://pixabay.com/api';

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  fetchImages() {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`;

    return fetch(url)
      .then(response => response.json())
      .then(data => {
        const images = data.hits;
        if (images.length === 0) {
          return alert('Ниче не нашли');
        }
        this.incrementPage();
        return images;
      });
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
