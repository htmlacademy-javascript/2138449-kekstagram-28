import { isEscapeKey } from './util.js';
import { photoList } from './display.js';
import { createComments } from './data.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureOpenElement = photoList;
const bigPictureCloseElement = bigPicture.querySelector('.big-picture__cancel');
const commentCount = document.querySelector('.social__comment-count');
const commentLoad = document.querySelector('.comments-loader');
const commentList = document.querySelector('.social__comments');

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Отрисовываем комментарии
const renderComments = (comments) => { //comments: undefined, но почему?
  commentList.innerHTML = '';

  const fragment = document.createDocumentFragment(); // было так - createFragment()
  comments.forEach((comment) => {
    const commentElement = createComments(comment);
    fragment.append(commentElement);
  });

  comments.append(fragment);
};

// Отрисовываем детали под фото
const renderPictureDetails = ({ url, likes, description }) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.big-picture__img img').alt = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.social__caption').textContent = description;
};

const openBigPicture = (data) => {

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open'); //Условие 4
  commentCount.classList.add('hidden'); //Условие 3
  commentLoad.classList.add('hidden'); //Условие 3
  document.addEventListener('keydown', onPopupEscKeydown);

  renderPictureDetails(data);
  renderComments(data.comments);
};

// Фукнция для закрытия большого фото
function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
}

const openButton = bigPictureOpenElement.addEventListener('click', openBigPicture);
//const closeButton = bigPictureCloseElement.addEventListener('click', () => {
//  closeBigPicture();
//});
const closeButton = bigPictureCloseElement.addEventListener('click', closeBigPicture);

export { openButton, closeButton, openBigPicture };
