import { renderThumbnails } from './thumbnail.js';
import { openBigPicture } from './big-picture.js';

const container = document.querySelector('.pictures');

const renderGallery = (pictures) => {
  container.addEventListener('click', (evt) => {
    const thumbnail = evt.target.closest('[data-thumbnail-id]');
    if (!thumbnail) {
      return;
    }
    const picture = pictures.find(
      (item) => item.id === +thumbnail.dataset.thumbnailId //Сравниваем ID миниатюры и большого фото
    );

    openBigPicture(picture);
  });

  renderThumbnails(pictures, container);
};

export { renderGallery };
