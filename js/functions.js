// 1 задание
function checkLength (testString, sizeString) {
  return testString.length <= sizeString;
}
checkLength('Проверка функции', 20);
checkLength('Проверка функции', 18);
checkLength('Проверка функции', 10);

// 2 задание
function checkPalindrome(string) {
  const tempString = string
    .toLowerCase()
    .replaceAll(' ', '');

  let empty = '';
  for (let i = tempString.length - 1; i >= 0; i--) {
    empty += tempString[i];
  }
  if (tempString === empty) {
    return true;
  }
  return false;
}
checkPalindrome('топот');
checkPalindrome('ДовОд');
checkPalindrome('Кекс');
checkPalindrome('Лёша на полке клопа нашёл ');

// 3 задание
function changeString(words) {
  let emptyString = '';

  for (let i = 0; i < words.length; i++) {
    if (!Number.isNaN(parseInt(words.at[i], 10))) {
      emptyString += words[i];
    }
  }

  return parseInt(emptyString, 10);
}
changeString('2023 год');
changeString('ECMAScript 2022');
changeString('1 кефир, 0.5 батона');
changeString('а я томат');

//4 задание
function addSymbols(string, minLength, pad) {
  let result = string;

  while (result.length < minLength) {
    const newResultLength = result.length + pad.length;
    const actualPad = newResultLength <= minLength ? pad : pad.slice(0, minLength - newResultLength);
    result = actualPad + result;
  }
  return result;
}
addSymbols('1', 2, '0');
addSymbols('1', 4, '0');
addSymbols('q', 4, 'werty');
addSymbols('q', 4, 'we');
addSymbols('qwerty', 4, '0');
