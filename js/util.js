//Время задержки алерта
const ALERT_SHOW_TIME = 5000;

//Функция для проверки клавиши Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

//Функция по показу алерта при ошибке при отправке фото
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.classList.add('allert-class');
  alertContainer.textContent = message;
  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

function debounce (callback, timeoutDelay) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}


export { isEscapeKey, showAlert, debounce };
