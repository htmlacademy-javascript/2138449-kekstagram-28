import {isEscapeKey} from './util.js';

const errorTemplate = document.querySelector('#error');
const successTemplate = document.querySelector('#success');

const getMessageType = () => document.querySelector('.error, .success');

const onCloseMessage = () => {
  const messageType = getMessageType();
  if (messageType) {
    messageType.remove();
  }

  document.removeEventListener('click', onOutsideClick);
  document.removeEventListener('keydown', onMessageKeydown);
};

const showSuccessMessage = () => {
  const success = successTemplate.innerHTML;
  document.body.insertAdjacentHTML('beforeend', success);
  const successButton = document.querySelector('.success__button');
  successButton.addEventListener('click', onCloseMessage);

  document.addEventListener('click', onOutsideClick);
  document.addEventListener('keydown', onMessageKeydown);
};

const showErrorMessage = () => {
  const error = errorTemplate.innerHTML;
  document.body.insertAdjacentHTML('beforeend', error);
  const errorButton = document.querySelector('.error__button');
  errorButton.addEventListener('click', onCloseMessage);

  document.addEventListener('click', onOutsideClick);
  document.addEventListener('keydown', onMessageKeydown);
};

function onMessageKeydown (evt) {
  if (isEscapeKey(evt) && getMessageType()) {
    evt.preventDefault();
    onCloseMessage();
  }
}

function onOutsideClick (evt) {
  const type = getMessageType();
  if (evt.target === type) {
    onCloseMessage();
  }
}

export { getMessageType, showSuccessMessage, showErrorMessage };
