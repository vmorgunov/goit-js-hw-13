import Notiflix from 'notiflix';

export function onFetchError() {
  return Notiflix.Notify.failure(
    'Sorry, there are no images matching your search query. Please try again.',
  );
}

export function onFetchEnd() {
  return Notiflix.Notify.info("We're sorry, but you've reached the end of search results");
}
