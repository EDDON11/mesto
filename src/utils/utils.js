export function renderLoading(isLoading) {
  const renderButton = document.querySelector('.popup_open').querySelector('.popup__save-button');
  if (isLoading) {
      renderButton.textContent = 'Сохранение...';
  } else {
      renderButton.textContent = 'Сохранить';
  }
}