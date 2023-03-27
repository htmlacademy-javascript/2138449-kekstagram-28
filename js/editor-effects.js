import { imageUploadPreview } from './editor.js';

//Массив объектов-описаний фильтров
const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  }
];
const DEFAULT_EFFECTS_VALUE = 100;
const DEFAULT_EFFECT = EFFECTS[0];
let chosenEffect = DEFAULT_EFFECT;

const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectsElement = document.querySelector('.effects');
const effectLevelElement = document.querySelector('.effect-level__value');

//Функция-проверка на эффект по умолчанию
const isDeffaultEffect = () => chosenEffect === DEFAULT_EFFECT;

//Функция по скрытию слайдера
const hideSlider = () => {
  sliderContainer.classList.add('hidden');
};

//Функция по показу слайдера
const showSlider = () => {
  sliderContainer.classList.remove('hidden');
};

//Функция по обновлению слайдера
const updateSlider = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    step: chosenEffect.step,
    start: chosenEffect.max,
  });

  if (isDeffaultEffect()) {
    hideSlider();
  } else {
    showSlider();
  }
};

//Обработчик эффектов
const onEffectsChange = (evt) => {
  if (!evt.target.classList.contains('effects__radio')) {
    return;
  }
  chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
  imageUploadPreview.className = `effects__preview--${chosenEffect.name}`;
  updateSlider();
};

//Обработчик слайдера ПЕРЕПИСАТЬ на IF ELSE, НАЙТИ effectLevelElement
const onSliderUpdate = () => {
  const sliderValue = sliderElement.noUiSlider.get();
  imageUploadPreview.style.filter = isDeffaultEffect()
    ? DEFAULT_EFFECT.style
    : `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
  effectLevelElement.value = sliderValue;
};

//Функция по сбросу эффектов
const resetEffects = () => {
  chosenEffect = DEFAULT_EFFECT;
  updateSlider();
};

// Создаем слайдер
noUiSlider.create(sliderElement, {
  range: {
    min: DEFAULT_EFFECT.min,
    max: DEFAULT_EFFECT.max,
  },
  start: DEFAULT_EFFECTS_VALUE,
  step: DEFAULT_EFFECT.step,
  connect: 'lower',
});

//Прячем слайдер
hideSlider();

effectsElement.addEventListener('change', onEffectsChange);
sliderElement.noUiSlider.on('update', onSliderUpdate);

export { resetEffects };
