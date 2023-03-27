/*Валидация хэштегов и комментов*/
import { imgForm } from './form.js';

const HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i; //Хэштег в форме регулярки
const HASHTAG_ERROR_MESSAGE = 'Неверно заполнено поле с хэштегами';
const COMMENTS_ERROR_MESSAGE = 'Максимальная длина комментария 140 символов';
const MAX_COUNT_HASTAGS = 5;
const MAX_COMMENTS_LENGTH = 140;

const hashtagText = imgForm.querySelector('.text__hashtags');
const commentsText = imgForm.querySelector('.text__description');

const pristine = new Pristine(imgForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper_error',
}
);

//Валидируем количество хэштегов
const validateTagsLength = (tags) => tags.length <= MAX_COUNT_HASTAGS;

//Валидируем уникальность хэштегов
const validateUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return new Set(lowerCaseTags).size === lowerCaseTags.length;
};

//Валидируем остальные требования к тегу
const isValidTag = (tag) => HASHTAG.test(tag);

const validateTags = (value) => {
  if (value === undefined || value.length === 0) {
    return true;
  }
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return validateTagsLength(tags) && validateUniqueTags(tags) && tags.every(isValidTag);
};

//Функция по валидации длины комментариев
const validateCommentsField = (value) => value.length <= MAX_COMMENTS_LENGTH;

//Описываем валидацию хэштегов
pristine.addValidator(
  hashtagText,
  validateTags,
  HASHTAG_ERROR_MESSAGE
);

//Описываем валидацию комментариев
pristine.addValidator(
  commentsText,
  validateCommentsField,
  COMMENTS_ERROR_MESSAGE
);

imgForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
