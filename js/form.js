import { isEscapeKey } from './util.js';

const uploadFile = document.querySelector('#upload-file');
const editorForm = document.querySelector('.img-upload__overlay');
const editorCloseButton = document.querySelector('#upload-cancel');
const imgForm = document.querySelector('.img-upload__form');
const hashtagField = imgForm.querySelector('.text__hashtags');
const commentField = imgForm.querySelector('.text__description');

// Закрываем модалку-редактор по кнопке
const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditor();
  }
};

//Убираем возможность закрывать редактор по кнопке при фокусе на хэштеге
const deleteEscKeydownForHash = () => {
  hashtagField.addEventListener('focus', () => {
    document.removeEventListener('keydown', onModalEscKeydown);
  });

  hashtagField.addEventListener('blur', () => {
    document.addEventListener('keydown', onModalEscKeydown);
  });
};

//Убираем возможность закрывать редактор по кнопке при фокусе на окне комментариев
const deleteEscKeydownForTextField = () => {
  commentField.addEventListener('focus', () => {
    document.removeEventListener('keydown', onModalEscKeydown);
  });

  commentField.addEventListener('blur', () => {
    document.addEventListener('keydown', onModalEscKeydown);
  });
};

//Функция по открытия загруженного фото в редакторе
const openEditor = () => {
  editorForm.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onModalEscKeydown);
  deleteEscKeydownForHash();
  deleteEscKeydownForTextField();
};

uploadFile.addEventListener('change', openEditor);

//Функция по закрытию загруженного фото в редакторе
function closeEditor () {
  editorForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // resetScale() from editor.js
  // resetEffects() from editor.js
  imgForm.reset();
  //pristine.reset();
  //uploadFile.value = '';

  document.removeEventListener('keydown', onModalEscKeydown);
}

editorCloseButton.addEventListener('click', closeEditor);


export { imgForm };
