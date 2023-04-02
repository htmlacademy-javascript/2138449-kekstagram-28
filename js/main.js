import './thumbnail.js';
import './form.js';
import { setUserFormSubmit } from './validation.js';
import './editor.js';
import './editor-effects.js';
import { showAlert } from './util.js';
import { getData } from './api.js';
import { renderPhotos, closeBigPhoto } from './big-picture.js';

const PHOTOS_COUNT = 25;

getData()
  .then((pictures) => {
    renderPhotos(pictures.slice(0, PHOTOS_COUNT));
  })
  .catch((err) => {
    showAlert(err.message);
  });

setUserFormSubmit(closeBigPhoto);

