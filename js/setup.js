'use strict';

const WIZARDS_DATA = {
  NUMBER_OF_WIZARDS: 4,
  NAMES: [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`],
  SURNAMES: [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`],
  COAT_COLORS: [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`],
  EYES_COLORS: [`black`, `red`, `blue`, `yellow`, `green`]
};

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

function getWizardName(names = WIZARDS_DATA.NAMES, surnames = WIZARDS_DATA.SURNAMES) {
  return getRandomNumber(2) ? `${getElementArray(names)} ${getElementArray(surnames)}` : `${getElementArray(surnames)} ${getElementArray(names)}`;
}

function getElementArray(arr) {
  return arr[getRandomNumber(arr.length)];
}

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

function renderWizard(wizard, wizardTemplate) {
  const wizardElement = wizardTemplate.cloneNode(true);
  wizardElement.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardElement.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardElement.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;
  return wizardElement;
}

function main() {
  const userDialog = document.querySelector(`.setup`);
  userDialog.classList.remove(`hidden`);

  const similarListElement = userDialog.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content.querySelector(`.setup-similar-item`);

  const wizards = getWizards();
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < wizards.length; i++) {
    fragment.appendChild(renderWizard(wizards[i], similarWizardTemplate));
  }
  similarListElement.appendChild(fragment);
  userDialog.querySelector(`.setup-similar`).classList.remove(`hidden`);
}

main();
