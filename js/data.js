import { getRandomInteger, createRandomIdFromRangeGenerator } from './util.js';

// Описания к фотографиям
const DESCRIPTIONS = [
  'прекрасный вид',
  'отличное настроение',
  'наконец-то отдых',
  'просто оставлю это здесь'
];

// Имена авторов комментариев
const NAMES = [
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
const COMMENTS_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

// Количество объектов-описаний, которые хотим сгенерировать
const DESCRIPTIONS_COUNT = 25;

const generatePhotoId = createRandomIdFromRangeGenerator(1, 25);
const generateCommentId = createRandomIdFromRangeGenerator(1, 100000);


// Функция для создания объектов comments
function createComments () {
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg.`,
    message: COMMENTS_TEXT[getRandomInteger(0, COMMENTS_TEXT.length - 1)],
    name: NAMES[getRandomInteger(0, NAMES.length - 1)],
  };
}

// Функция для создания описаний к фотографиям
function createPhotoDescription () {
  return {
    id: generatePhotoId(),
    url: `photos/${getRandomInteger(1, 25)}.jpg`,
    description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
    likes: getRandomInteger(15, 200),
    comments: Array.from({length: 2}, createComments),
  };
}

// Создаём массив из 25 объектов
const createPhotoDescriptions = () => Array.from({length: DESCRIPTIONS_COUNT}, createPhotoDescription);
export { createPhotoDescriptions };
