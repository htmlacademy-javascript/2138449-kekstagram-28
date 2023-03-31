import { getData } from './api.js';

const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');

const createThumbnail = ({ url, description, likes, comments, id }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.dataset.id = id;

  return thumbnail;
};

const renderThumbnails = (thumbnails) => {
  const fragment = document.createDocumentFragment();

  thumbnails.forEach((thumbnail) => {
    fragment.append(createThumbnail(thumbnail));
  });

  container.append(fragment);
};

//const renderMiniatures = createPhotoDescriptions(); // Тут надо заменить серверными данными
//renderThumbnails(renderMiniatures);


/*const renderMiniatures = getData().then((data) => {
  renderThumbnails(data);
  return data;
});*/

//renderThumbnails(renderMiniatures);

export { /*renderMiniatures,*/ renderThumbnails, container };
