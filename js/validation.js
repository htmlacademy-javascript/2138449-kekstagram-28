import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { onEditorClose } from './form.js';

const HASHTAG = /^#[a-zа-яё0-9]{1,19}$/i; //Хэштег в форме регулярки
const HASHTAG_ERROR_MESSAGE = 'Неверно заполнено поле с хэштегами';
const COMMENTS_ERROR_MESSAGE = 'Максимальная длина комментария 140 символов';
const MAX_COUNT_HASHTAGS = 5;
const MAX_COMMENTS_LENGTH = 140;

const SubmitButtonText = {
  IDLE: 'Сохранить',
  SENDING: 'Сохраняю...'
};

const imgForm = document.querySelector('.img-upload__form');
const hashtagText = imgForm.querySelector('.text__hashtags');
const commentsText = imgForm.querySelector('.text__description');
const submitButton = document.querySelector('.img-upload__submit');


const pristine = new Pristine(imgForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper_error',
}
);

const validateTagsLength = (tags) => tags.length <= MAX_COUNT_HASHTAGS;

const validateUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return new Set(lowerCaseTags).size === lowerCaseTags.length;
};

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

const validateCommentsField = (value) => value.length <= MAX_COMMENTS_LENGTH;

pristine.addValidator(
  hashtagText,
  validateTags,
  HASHTAG_ERROR_MESSAGE
);

pristine.addValidator(
  commentsText,
  validateCommentsField,
  COMMENTS_ERROR_MESSAGE
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const pristineReset = () => pristine.reset();

const setUserFormSubmit = () => {
  imgForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    const formData = new FormData(evt.target);

    if (isValid) {
      blockSubmitButton();
      sendData(formData)
        .then(() => {
          onEditorClose();
          showSuccessMessage();
        })
        .catch(
          () => {
            showErrorMessage();
          }
        )
        .finally(unblockSubmitButton);
    }
  });
};

export { setUserFormSubmit, pristineReset };
