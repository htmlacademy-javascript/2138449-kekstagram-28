import { isEscapeKey } from './util.js';
import { renderThumbnails, container } from './thumbnail.js';

const COMMENTS_BLOCK = 5;

const bigPhotoPreview = document.querySelector('.big-picture__preview');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCloseElement = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPhotoPreview.querySelector('.big-picture__img img');
const commentList = bigPicture.querySelector('.social__comments');
const commentItem = commentList.querySelector('.social__comment');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const commentLoad = bigPicture.querySelector('.comments-loader');

let pictures = [];

let commentsLoaded = 0;
let comments = [];

const renderBigPhoto = ({url, description, likes}) => {
  bigPictureImg.src = url;
  bigPictureImg.alt = description;
  bigPhotoPreview.querySelector('.likes-count').textContent = likes;
  bigPhotoPreview.querySelector('.social__caption').textContent = description;
};

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPhoto();
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

const openBigPhoto = (element) => {
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

const onMiniatureClick = (evt) => {
  const targetMiniature = evt.target.closest('.picture');
  if (!targetMiniature) {
    return;
  }
  const targetMiniatureId = pictures.find((picture) =>
    picture.id === parseInt(targetMiniature.dataset.id, 10));
  openBigPhoto(targetMiniatureId);
};

const renderPhotos = (currentPictures) => {
  pictures = currentPictures;
  renderThumbnails(pictures);
  container.addEventListener('click', onMiniatureClick);
};

function closeBigPhoto () {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
}

bigPictureCloseElement.addEventListener('click', closeBigPhoto);

export { renderPhotos, openBigPhoto, closeBigPhoto };
