'use strict';

const WIZARDS_DATA = {
  NUMBER_OF_WIZARDS: 4,
  NAMES: [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`],
  SURNAMES: [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`],
  COAT_COLORS: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
  EYES_COLORS: [`black`, `red`, `blue`, `yellow`, `green`],
  FIREBALL_COLORS: [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`]
};

// Генерация случайного числа
function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

// Получение имени персонажа
function getWizardName(names = WIZARDS_DATA.NAMES, surnames = WIZARDS_DATA.SURNAMES) {
  return getRandomNumber(2) ? `${getElementArray(names)} ${getElementArray(surnames)}` : `${getElementArray(surnames)} ${getElementArray(names)}`;
}

// Получение случайного элемента массива
function getElementArray(arr) {
  return arr[getRandomNumber(arr.length)];
}

// Получение массива похожих персонажей
function getWizards(wizardData = WIZARDS_DATA) {
  const wizards = [];
  for (let i = 0; i < wizardData.NUMBER_OF_WIZARDS; i++) {
    const wizard = {};
    wizard.name = getWizardName();
    wizard.coatColor = getElementArray(wizardData.COAT_COLORS);
    wizard.eyesColor = getElementArray(wizardData.EYES_COLORS);
    wizards.push(wizard);
  }
  return wizards;
}

// Отрисовка похожего персонажа
function renderWizard(wizard, wizardTemplate) {
  const wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;
  return wizardElement;
}

// Обработчик событий для окна настроек персонажа
function eventHandlerSetup(setup) {
  const setupOpen = document.querySelector(`.setup-open`);
  const setupClose = setup.querySelector(`.setup-close`);
  const setupPlayer = setup.querySelector(`.setup-player`);
  const coatInput = setupPlayer.querySelector(`input[name="coat-color"]`);
  const eyesInput = setupPlayer.querySelector(`input[name="eyes-color"]`);
  const setupPlayerFireballWrap = setupPlayer.querySelector(`.setup-fireball-wrap`);
  const fireballInput = setupPlayerFireballWrap.querySelector(`input[name="fireball-color"]`);

  // Настройка персонажа и фаербола
  function changeWizardAndFireball(evt) {
    if (evt.target.matches(`.wizard-coat`)) {
      evt.target.style.fill = getElementArray(WIZARDS_DATA.COAT_COLORS);
      coatInput.value = evt.target.style.fill;

    } else if (evt.target.matches(`.wizard-eyes`)) {
      evt.target.style.fill = getElementArray(WIZARDS_DATA.EYES_COLORS);
      eyesInput.value = evt.target.style.fill;

    } else if (evt.target.matches(`.setup-fireball`)) {
      const colorFireball = getElementArray(WIZARDS_DATA.FIREBALL_COLORS);

      setupPlayerFireballWrap.style.background = colorFireball;
      fireballInput.value = colorFireball;
    }
  }

  function onPopupKeyPress(evt) {
    if ((evt.key === `Escape` || evt.key === `Enter`) && !evt.target.matches(`.setup-user-name`)) {
      evt.preventDefault();
      closePopup();
    }
  }

  function onPopupCloseClick() {
    closePopup();
  }

  function openPopup() {
    setup.classList.remove(`hidden`);
    document.addEventListener(`keydown`, onPopupKeyPress);
    setupClose.addEventListener(`click`, onPopupCloseClick);
    setupPlayer.addEventListener(`click`, changeWizardAndFireball);
  }

  function closePopup() {
    setup.classList.add(`hidden`);
    document.removeEventListener(`keydown`, onPopupKeyPress);
    setupClose.removeEventListener(`click`, onPopupCloseClick);
    setupPlayer.removeEventListener(`click`, changeWizardAndFireball);
  }

  setupOpen.addEventListener(`click`, function () {
    openPopup();
  });

  setupOpen.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      openPopup();
    }
  });

}

function main() {
  const userDialog = document.querySelector(`.setup`);
  const similarListElement = userDialog.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

  // Генерация массива похожих персонажей
  const wizards = getWizards();

  // Добавление похожих персонажей на форму
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));
  }
  similarListElement.appendChild(fragment);

  // Вывод на экран блока похожих персонажей
  userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);

  // Вызов обработчика событий для окна настроек персонажа
  eventHandlerSetup(userDialog);
}

main();
