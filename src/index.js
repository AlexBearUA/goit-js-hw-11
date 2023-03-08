import ImagesApiService from './js/images-service';

const refs = {
  searchForm: document.querySelector('#search-form'),
  imagesContainer: document.querySelector('.gallery'),
};
const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  imagesApiService.query = e.currentTarget.elements.searchQuery.value;

  if (imagesApiService.searchQuery === '') {
    return alert('Введи что-то нормальное');
  }

  fetchImages();
}

function fetchImages() {
  imagesApiService.fetchImages().then(images => {
    appendImagesMarkup(images);
  });
}

function appendImagesMarkup(images) {
  refs.imagesContainer.insertAdjacentHTML(
    'beforeend',
    createImagesMarkup(images)
  );
}

function createImagesMarkup(images) {
  return images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
                  <img src="${webformatURL}" alt="${tags}" loading="lazy" />
                  <div class="info">
                    <p class="info-item">
                      <b>Likes ${likes}</b>
                    </p>
                    <p class="info-item">
                      <b>Views ${views}</b>
                    </p>
                    <p class="info-item">
                      <b>Comments ${comments}</b>
                    </p>
                    <p class="info-item">
                      <b>Downloads ${downloads}</b>
                    </p>
                  </div>
                </div>`;
      }
    )
    .join('');
}
