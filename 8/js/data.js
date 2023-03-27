import { getRandomInteger, createRandomIdFromRangeGenerator } from './util.js';

// Значения для ID комментариев
const MIN_COMMENT_ID = 1;
const MAX_COMMENT_ID = 100000;

//Количество аватарок
const AVATAR_COUNT = 6;

//Длина комментариев
const COMMENTS_LENGTH = 11;

//Количество лайков
const MIN_LIKES_COUNT = 15;
const MAX_LIKES_COUNT = 200;

// Количество объектов-описаний, которые хотим сгенерировать
const DESCRIPTIONS_COUNT = 25;

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

const generateCommentId = createRandomIdFromRangeGenerator(MIN_COMMENT_ID, MAX_COMMENT_ID);

// Функция для создания объектов comments
function createComments () {
  return {
    id: generateCommentId(),
    avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
    message: COMMENTS_TEXT[getRandomInteger(0, COMMENTS_TEXT.length - 1)],
    name: NAMES[getRandomInteger(0, NAMES.length - 1)],
  };
}

// Функция для создания описаний к фотографиям
function createPhotoDescription (index) {
  return {
    id: index,
    url: `photos/${ index }.jpg`,
    description: DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)],
    likes: getRandomInteger(MIN_LIKES_COUNT, MAX_LIKES_COUNT),
    comments: Array.from({length: COMMENTS_LENGTH}, createComments),
  };
}

// Создаём массив из 25 объектов
const createPhotoDescriptions = () => Array.from({length: DESCRIPTIONS_COUNT}, (_, photoIndex) => createPhotoDescription(photoIndex + 1));

export { createPhotoDescriptions };
