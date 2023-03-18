import { createPhotoDescriptions } from './data.js';

const photoList = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const similarListFragment = document.createDocumentFragment();

const similarPhoto = createPhotoDescriptions();

//const renderPhotoList = () => {
similarPhoto.forEach(({url, likes, comments, description}) => {
  const photoElement = photoTemplate.cloneNode(true);
  photoList.append(photoElement);

  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  photoElement.querySelector('.picture__img').alt = description;
  similarListFragment.append(photoElement);
});
const usersPhoto = photoList.append(similarListFragment);

//};

/*const clearPhotoList = () => {
  photoList.innerHTML = '';
};*/

export { usersPhoto, photoList };
