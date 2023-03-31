import { renderThumbnails } from './thumbnail.js';
//import './big-picture.js';
import './form.js';
import './validation.js';
import './editor.js';
import './editor-effects.js';
import { showAlert } from './util.js';
import { getData } from './api.js';
import { createGallery } from './big-picture.js';

getData()
  .then((pictures) => {
    createGallery(pictures);
  })
  .catch((err) => {
    showAlert(err.message);
  });

//renderThumbnails(renderMiniatures);
