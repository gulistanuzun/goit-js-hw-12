import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '54810342-78f3e5f8f5ab65816402207bb';

const form = document.getElementById('search-form');
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.querySelector('.load-more');
const loader = document.querySelector('.loader');

let query = '';
let page = 1;
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

async function getImages(query, page) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 20,
      page: page,
    },
  });
  return response.data;
}

function renderGallery(images) {
  const markup = images
    .map(
      img => `
    <li class="gallery-item">
      <a href="${img.largeImageURL}">
        <img src="${img.webformatURL}" alt="${img.tags}" />
      </a>
      <div class="info">
        <p>Likes: ${img.likes}</p>
        <p>Views: ${img.views}</p>
        <p>Comments: ${img.comments}</p>
        <p>Downloads: ${img.downloads}</p>
      </div>
    </li>
  `
    )
    .join('');

  gallery.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();
}

form.addEventListener('submit', async e => {
  e.preventDefault();
  query = e.target.elements.searchQuery.value.trim();
  if (!query) return;

  page = 1;
  gallery.innerHTML = '';
  loadMoreBtn.classList.add('hidden');
  loader.classList.remove('hidden');

  try {
    const data = await getImages(query, page);
    loader.classList.add('hidden');

    if (data.hits.length === 0) {
      iziToast.error({ message: 'No images found. Try another keyword!' });
      return;
    }

    renderGallery(data.hits);

    if (data.totalHits > page * 20) {
      loadMoreBtn.classList.remove('hidden');
    }
  } catch (error) {
    loader.classList.add('hidden');
    iziToast.error({ message: 'Something went wrong!' });
    console.error(error);
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  loader.classList.remove('hidden');

  try {
    const data = await getImages(query, page);
    loader.classList.add('hidden');

    renderGallery(data.hits);

    const { height: cardHeight } =
      gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (page * 20 >= data.totalHits) {
      loadMoreBtn.classList.add('hidden');
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results",
      });
    }
  } catch (error) {
    loader.classList.add('hidden');
    iziToast.error({ message: 'Something went wrong!' });
    console.error(error);
  }
});
