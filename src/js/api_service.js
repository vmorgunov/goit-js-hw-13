const axios = require('axios');
import LoadMoreBtn from './load_more_btn';
import { onFetchEnd, onFetchError } from './notifications';

const API_KEY = '22738426-58af921ac2532cd8236517c49';

const BASE_URL = 'https://pixabay.com/api/';

const loadMoreBtn = new LoadMoreBtn({
  selector: '.load-more',
  hidden: true,
});

export default class ImagesApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 40;
  }

  async fetchImages() {
    const url = `${BASE_URL}/?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horisontal&safesearch=true&page=${this.page}&per_page=${this.per_page}`;

    try {
      const response = await axios(url);
      const newHits = await response.data.hits;

      this.incrementPage();

      if (newHits.length === 0) {
        loadMoreBtn.enable();
        loadMoreBtn.hide();
        return onFetchError();
      }

      if (newHits.length < 40) {
        loadMoreBtn.disable();
        loadMoreBtn.hide();
        onFetchEnd();
      }
      return newHits;
    } catch {
      console.log(error);
    }
  }

  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    return (this.searchQuery = newQuery);
  }
}
