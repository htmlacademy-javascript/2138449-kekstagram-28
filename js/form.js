import { isEscapeKey } from './util.js';
import { scaleValueReset } from './editor.js';
import { resetEffects } from './editor-effects.js';
import { pristineReset } from './validation.js';
import { getMessageType } from './messages.js';

const uploadFile = document.querySelector('#upload-file');
const editorForm = document.querySelector('.img-upload__overlay');
const editorCloseButton = document.querySelector('#upload-cancel');
const imgForm = document.querySelector('.img-upload__form');
const hashtagField = imgForm.querySelector('.text__hashtags');
const commentField = imgForm.querySelector('.text__description');

const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    const messageType = getMessageType();
    if (!messageType) {
      onEditorClose();
    }
  }
};

const deleteEscKeydownForHash = () => {
  hashtagField.addEventListener('focus', () => {
    document.removeEventListener('keydown', onModalEscKeydown);
  });

  hashtagField.addEventListener('blur', () => {
    document.addEventListener('keydown', onModalEscKeydown);
  });
};

const deleteEscKeydownForTextField = () => {
  commentField.addEventListener('focus', () => {
    document.removeEventListener('keydown', onModalEscKeydown);
  });

  commentField.addEventListener('blur', () => {
    document.addEventListener('keydown', onModalEscKeydown);
  });
};

const onEditorOpen = () => {
  editorForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onModalEscKeydown);
  deleteEscKeydownForHash();
  deleteEscKeydownForTextField();
};

uploadFile.addEventListener('change', onEditorOpen);

function onEditorClose () {
  editorForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  scaleValueReset();
  resetEffects();
  imgForm.reset();
  pristineReset();

  document.removeEventListener('keydown', onModalEscKeydown);
}

editorCloseButton.addEventListener('click', onEditorClose);

export {
  imgForm,
  deleteEscKeydownForHash,
  deleteEscKeydownForTextField,
  onEditorClose,
  onModalEscKeydown,
  uploadFile
};
