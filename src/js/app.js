import ImagesApiService from './api_service';
import getRefs from './refs';
import { onFetchError } from './notifications';
import LoadMoreBtn from './load_more_btn';
import imagesTpl from '../templates/images.hbs';

const imagesApiService = new ImagesApiService();

const refs = getRefs();

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchHits);

function onSearch(e) {
  e.preventDefault();

  imagesApiService.query = e.currentTarget.elements.searchQuery.value;

  if (imagesApiService.query.trim() === '') {
    return onFetchError();
  }

  loadMoreBtn.show();
  imagesApiService.resetPage();
  clearImagesContainer();
  fetchHits();
}

function fetchHits() {
  loadMoreBtn.disable();
  imagesApiService.fetchImages().then(hits => {
    appendImagesMarkup(hits);
    loadMoreBtn.enable();
  });
}

function appendImagesMarkup(images) {
  refs.gallery.insertAdjacentHTML('beforeend', imagesTpl(images));
}

function clearImagesContainer() {
  refs.gallery.innerHTML = '';
}
