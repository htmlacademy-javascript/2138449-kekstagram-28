import { isEscapeKey } from './util.js';
import { renderMiniatures, container } from './thumbnail.js';

const COMMENTS_BLOCK = 5;
const bigPhotoPreview = document.querySelector('.big-picture__preview');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPicture.querySelector('.big-picture__cancel');

const commentList = bigPicture.querySelector('.social__comments');
const commentItem = commentList.querySelector('.social__comment');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentLoad = bigPicture.querySelector('.comments-loader');

let commentsLoaded = 0;
let comments = [];

const renderBigPhoto = ({url, description, likes}) => {
  bigPhotoPreview.querySelector('.big-picture__img img').src = url;
  bigPhotoPreview.querySelector('.big-picture__img img').alt = description;
  bigPhotoPreview.querySelector('.likes-count').textContent = likes;
  bigPhotoPreview.querySelector('.social__caption').textContent = description;
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const renderComment = (({avatar, name, message}) => {
  const comment = commentItem.cloneNode(true);
  comment.querySelector('.social__picture').src = avatar;
  comment.querySelector('.social__picture').alt = name;
  comment.querySelector('.social__text').textContent = message;

  return comment;
});

const renderComments = () => {
  commentsLoaded += COMMENTS_BLOCK;

  if (commentsLoaded >= comments.length) {
    commentLoad.classList.add('hidden');
    commentsLoaded = comments.length;
  } else {
    commentLoad.classList.remove('hidden');
  }
  const commentsFragment = document.createDocumentFragment();
  for (let i = 0; i < commentsLoaded; i++) {
    const commentElement = renderComment(comments[i]);
    commentsFragment.append(commentElement);
  }
  commentList.innerHTML = '';
  commentList.append(commentsFragment);
  commentsCount.innerHTML = `${commentsLoaded} из <span class="comments-count">${comments.length}</span> комментариев`;
};


const openBigPicture = (element) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  renderBigPhoto(element);
  comments = element.comments;
  commentsLoaded = 0;
  renderComments();

  document.addEventListener('keydown', onPopupEscKeydown);
};

const onCommentsLoaderButtonClick = () => renderComments();
commentLoad.addEventListener('click', onCommentsLoaderButtonClick);

container.addEventListener('click', (evt) => {
  const targetMiniature = evt.target.closest('.picture');
  if (targetMiniature) {
    evt.preventDefault();
    const targetMiniatureId = renderMiniatures[targetMiniature.dataset.id - 1];
    openBigPicture(targetMiniatureId);
  }
});

// Фукнция для закрытия большого фото
function closeBigPicture () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onPopupEscKeydown);
}
// eslint-disable-next-line no-unused-vars
const closeButton = bigPictureCloseElement.addEventListener('click', closeBigPicture);
