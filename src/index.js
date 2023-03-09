import { Notify } from 'notiflix/build/notiflix-notify-aio';

import ImagesApiService from './js/images-service';
import LoadMoreBtn from './js/components/load-more-btn';

const refs = {
  searchForm: document.querySelector('#search-form'),
  imagesContainer: document.querySelector('.gallery'),
};

const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const imagesApiService = new ImagesApiService();

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchImages);

function onSearch(e) {
  e.preventDefault();
  imagesApiService.query = e.currentTarget.elements.searchQuery.value.trim();

  if (imagesApiService.searchQuery === '') {
    return alert('Введи что-то нормальное');
  }

  imagesApiService.resetPage();
  clearImagesContainer();
  fetchImages();
}

function fetchImages() {
  loadMoreBtn.disable();
  imagesApiService.fetchImages(loadMoreBtn).then(images => {
    appendImagesMarkup(images);
    loadMoreBtn.enable();
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

function clearImagesContainer() {
  refs.imagesContainer.innerHTML = '';
}
