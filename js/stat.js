'use strict';

const CLOUD_WIDTH = 420; // ширина облака
const CLOUD_HEIGHT = 270; // высота облака
const CLOUD_RADIUS = 30; // радиус углов облака
const CLOUD_X = 100; // начальная координата X облака
const CLOUD_Y = 10; // начальная координата Y облака
const SHADOW_GAP = 10; // отступ тени облака
const GAP_DATA = 20; // отступ данных от края облака
const FONT = `16px PT Mono`; // шрифт и размер текста
const FONT_COLOR = `rgba(0, 0, 0, 1)`; // цвет текста
const FONT_GAP = 20; // межстрочный интервал
const COLUMN_HEIGHT = 150; // высота колонки
const COLUMN_WIDTH = 40; // ширина колонки
const COLUMN_GAP = 50; // расстояние между колонками
const COLUMN_COLOR_YOU = `rgba(255, 0, 0, 1)`; // цвет колонки игрока
const COLUMN_COLOR_PLAYERS = 240; // цвет колонки других игроков (цветовая модель HSL)

function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y + CLOUD_RADIUS);
  ctx.quadraticCurveTo(x, y, x + CLOUD_RADIUS, y);
  ctx.lineTo(x + CLOUD_WIDTH - CLOUD_RADIUS, y);
  ctx.quadraticCurveTo(x + CLOUD_WIDTH, y, x + CLOUD_WIDTH, y + CLOUD_RADIUS);
  ctx.lineTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT - CLOUD_RADIUS);
  ctx.quadraticCurveTo(x + CLOUD_WIDTH, y + CLOUD_HEIGHT, x + CLOUD_WIDTH - CLOUD_RADIUS, y + CLOUD_HEIGHT);
  ctx.lineTo(x + CLOUD_RADIUS, y + CLOUD_HEIGHT);
  ctx.quadraticCurveTo(x, y + CLOUD_HEIGHT, x, y + CLOUD_HEIGHT - CLOUD_RADIUS);
  ctx.lineTo(x, y + CLOUD_RADIUS);
  ctx.stroke();
  ctx.closePath();
  ctx.fill();
}

function getColumnColor(color, minSaturation, maxSaturation) {
  return `hsl(` + color + `, ` + Math.floor(Math.random() * (maxSaturation - minSaturation) + minSaturation) + `%, 50%)`;
}

function renderDiagram(ctx, names, times) {
  const maxTime = times.reduce((previousValue, currentValue) => Math.max(previousValue, currentValue), times[0]);

  for (let i = 0; i < names.length; i++) {
    ctx.fillStyle = FONT_COLOR;
    ctx.textBaseline = `hanging`;
    ctx.fillText(Math.round(times[i]), CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP_DATA - 2 * FONT_GAP - (COLUMN_HEIGHT * times[i] / maxTime));
    ctx.textBaseline = `alphabetic`;
    ctx.fillText(names[i], CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP_DATA);

    ctx.fillStyle = (names[i] === `Вы`) ? COLUMN_COLOR_YOU : getColumnColor(COLUMN_COLOR_PLAYERS, 30, 100);
    ctx.fillRect(CLOUD_X + COLUMN_GAP + (COLUMN_WIDTH + COLUMN_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - GAP_DATA - FONT_GAP, COLUMN_WIDTH, -(COLUMN_HEIGHT * times[i] / maxTime));
  }
}

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, CLOUD_X + SHADOW_GAP, CLOUD_Y + SHADOW_GAP, `rgba(0, 0, 0, 0.7)`);
  renderCloud(ctx, CLOUD_X, CLOUD_Y, `rgba(255, 255, 255, 1)`);

  ctx.font = FONT;
  ctx.fillStyle = FONT_COLOR;
  ctx.textBaseline = `hanging`;

  ctx.fillText(`Ура вы победили!`, CLOUD_X + GAP_DATA, CLOUD_Y + GAP_DATA);
  ctx.fillText(`Cписок результатов:`, CLOUD_X + GAP_DATA, CLOUD_Y + GAP_DATA + FONT_GAP);

  renderDiagram(ctx, names, times);
};
