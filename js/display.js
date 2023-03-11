import { createPhotoDescriptions } from './data.js';

const photoList = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarListFragment = document.createDocumentFragment();

const similarPhoto = createPhotoDescriptions();

similarPhoto.forEach(({url, likes, comments}) => {
  const photoElement = photoTemplate.cloneNode(true);
  photoList.append(photoElement);

  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;

  similarListFragment.append(photoElement);
});
const picturesList = photoList.append(similarListFragment);
export { picturesList };
