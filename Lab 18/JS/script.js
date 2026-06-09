$(document).ready(function() {

let currentGameActive = false;
let timerInterval = null;
let timeLeft = 60;
let currentNumber = 1;
let gamesHistory = [];
let totalAttemptsCounter = 0;
let isGameWin = false;
let shuffledNumbers = [];

const $mainScreen = $('#mainScreen');
const $gameScreen = $('#gameScreen');
const $startBtn = $('#startGameBtn');
const $restartBtn = $('#restartGameBtn');
const $timerSpan = $('#timerValue');
const $attemptSpan = $('#attemptCounter');
const $gameBoard = $('#gameBoard');
const $statsBody = $('#statsBody');
const $errorModal = $('#errorModal');
const $winModal = $('#winModal');

function getRandomColor() {
const hue = Math.floor(Math.random() * 360);
const sat = 55 + Math.floor(Math.random() * 40);
const light = 55 + Math.floor(Math.random() * 30);
return `hsl(${hue}, ${sat}%, ${light}%)`;}

function getRandomFontSize() {
const sizes = [22, 26, 30, 34, 38, 42];
const randomIndex = Math.floor(Math.random() * sizes.length);
return sizes[randomIndex];}

function shuffleArray(arr) {
for (let i = arr.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[arr[i], arr[j]] = [arr[j], arr[i]];}
return arr;}

function renderGameBoard() {
$gameBoard.empty();
shuffledNumbers.forEach(num => {
const $tile = $('<div>').addClass('number-tile').text(num);
const bgColor = getRandomColor();
const fontSize = getRandomFontSize() + 'px';
$tile.css({
'background': bgColor,
'font-size': fontSize,
'font-weight': 'bold'});
if (num < currentNumber) {
$tile.addClass('selected-correct');}
$tile.data('value', num);
$tile.on('click', function() {
if (!currentGameActive) return;
const clickedValue = $(this).data('value');
handleTileClick(clickedValue, $(this));});
$gameBoard.append($tile);});}

function handleTileClick(value, $tile) {
if (!currentGameActive) return;
if (value === currentNumber) {
$tile.addClass('selected-correct');
currentNumber++;
if (currentNumber === 21) {
finishGameWin();}} else {
showErrorModal();}}

function showErrorModal() {
if (!currentGameActive) return;
$errorModal.fadeIn(200);}

$('.modal-ok, .close-modal').on('click', function() {
$errorModal.fadeOut(150);
$winModal.fadeOut(150);});

$('.win-ok').on('click', function() {
$winModal.fadeOut(150);
resetAndStartGame();});

function finishGameWin() {
if (!currentGameActive) return;
stopTimer();
currentGameActive = false;
isGameWin = true;

let spentTime = 60 - timeLeft;
if (spentTime < 0) spentTime = 60;
const gameRecord = {
gameName: `Гра ${gamesHistory.length + 1}`,
timeSec: spentTime};
gamesHistory.push(gameRecord);
updateStatsTable();
$winModal.fadeIn(200);}

function updateStatsTable() {
if (gamesHistory.length === 0) {
$statsBody.html('<tr><td colspan="2">Ще немає завершених ігор</td></tr>');
return;}
let bestTime = Math.min(...gamesHistory.map(g => g.timeSec));
let html = '';
gamesHistory.forEach((game) => {
const isBest = (game.timeSec === bestTime);
const rowClass = isBest ? 'best-row' : '';
html += `<tr class="${rowClass}"><td>${game.gameName}</td><td>${game.timeSec} с.</td></tr>`;});
$statsBody.html(html);}

function startTimer() {
if (timerInterval) clearInterval(timerInterval);
timerInterval = setInterval(() => {
if (!currentGameActive) return;
if (timeLeft <= 1) {
timeLeft = 0;
$timerSpan.text('0');
if (currentGameActive) {
currentGameActive = false;
stopTimer();
alert("⏰ Час вичерпано! Натисніть «Почати з початку», щоб спробувати ще раз.");
}} else {timeLeft--;
$timerSpan.text(timeLeft);}}, 1000);}

function stopTimer() {
if (timerInterval) {
clearInterval(timerInterval);
timerInterval = null;}}

function resetAndStartGame() {
stopTimer();
currentNumber = 1;
timeLeft = 60;
isGameWin = false;
totalAttemptsCounter++;
$attemptSpan.text(totalAttemptsCounter);
$timerSpan.text('60');
let numbers = Array.from({length: 20}, (_, i) => i + 1);
shuffledNumbers = shuffleArray([...numbers]);
currentGameActive = true;
renderGameBoard();
startTimer();}

$startBtn.on('click', function() {
$mainScreen.removeClass('active');
$gameScreen.addClass('active');
totalAttemptsCounter = 0;
gamesHistory = [];
updateStatsTable();
$attemptSpan.text('0');
resetAndStartGame();});

$restartBtn.on('click', function() {
resetAndStartGame();});

$(window).on('click', function(e) {
if ($(e.target).hasClass('modal')) {
$('.modal').fadeOut(150);}});
$mainScreen.addClass('active');
$gameScreen.removeClass('active');

gamesHistory = [
{ gameName: "Гра 1", timeSec: 56 },
{ gameName: "Гра 2", timeSec: 54 },
{ gameName: "Гра 3", timeSec: 52 }];
updateStatsTable();
totalAttemptsCounter = 0;
$attemptSpan.text('0');});