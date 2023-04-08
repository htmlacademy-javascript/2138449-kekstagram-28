import { imageUploadPreview } from './editor.js';
import { uploadFile } from './form.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

uploadFile.addEventListener('change', () => {
  const file = uploadFile.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imageUploadPreview .src = URL.createObjectURL(file);
  }
});
