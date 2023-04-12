const SCALE_STEP = 25;
const MAX_SCALE_COUNT = 100;
const MIN_SCALE_COUNT = 25;
const DEFAULT_SCALE_VALUE = 100;

const biggerSizeButton = document.querySelector('.scale__control--bigger');
const smallerSizeButton = document.querySelector('.scale__control--smaller');
const scaleElement = document.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview img');

const resizeImg = (value) => {
  imageUploadPreview.style.transform = `scale(${value / 100})`;
  scaleElement.value = `${value}%`;
};

const decreaseButtonValue = () => {
  const currentValue = parseInt(scaleElement.value, 10);
  let newScaleValue = currentValue - SCALE_STEP;
  if (newScaleValue < MIN_SCALE_COUNT) {
    newScaleValue = MIN_SCALE_COUNT;
  }

  resizeImg(newScaleValue);
};

const increaseButtonValue = () => {
  const currentValue = parseInt(scaleElement.value, 10);
  let newScaleValue = currentValue + SCALE_STEP;
  if (newScaleValue > MAX_SCALE_COUNT) {
    newScaleValue = MAX_SCALE_COUNT;
  }

  resizeImg(newScaleValue);
};

const scaleValueReset = () => resizeImg(DEFAULT_SCALE_VALUE);

biggerSizeButton.addEventListener('click', increaseButtonValue);

smallerSizeButton.addEventListener('click', decreaseButtonValue);

export { scaleValueReset, imageUploadPreview };
