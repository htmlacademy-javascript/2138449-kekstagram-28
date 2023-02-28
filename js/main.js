// Описание к фотографиям
const DESCRIPTION = [
  'прекрасный вид',
  'отличное настроение',
  'наконец-то отдых',
  'просто оставлю это здесь'
];

// Имена авторов комментариев
const NAME = [
  'Виктория',
  'Сергей',
  'Ксения',
  'Анатолий',
  'Надежда',
  'Максим',
  'Светлана',
  'Григорий',
  'Наталья'
];

// Тексты комментариев
const COMMENT_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Функция для генерации случайных целых чисел
function getRandomInteger (min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  const result = Math.random() * (upper - lower + 1) + lower;

  return Math.floor(result);
}

// Функция для получения неповторяющихся чисел
function createRandomIdFromRangeGenerator (min, max) {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
}

const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generateCommentId = createRandomIdFromRangeGenerator(1, 100000);

// Функция для создания объектов comments
function createComments () {
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg.`,
    message: COMMENT_TEXT[getRandomInteger(0, COMMENT_TEXT.length - 1)],
    name: NAME[getRandomInteger(0, NAME.length - 1)],
  };
}

// Функция для создания описания к фотографиям
function createPhotoDescription () {
  return {
    id: generatePhotoId(),
    url: `photos/${getRandomInteger(1, 25)}.jpg`,
    description: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: 2}, createComments),
  };
}

// Создаём массив из 25 объектов
// eslint-disable-next-line no-unused-vars
const photoDescriptions = Array.from({length: 25}, createPhotoDescription);
