$(document).ready(function() {

const imageDB = ['images/babak.jpg', 'images/redpanda.jpg', 'images/sova.jpg',
'images/dikikit.jpg', 'images/svin.jpg', 'images/ejik.jpg',
'images/svinka.jpg', 'images/enot.jpg', 'images/tigr.jpg',
'images/fenik.jpg', 'images/tulen.jpg', 'images/hipo.jpg',
'images/vovk.jpg', 'images/horek.jpg', 'images/zayac.jpg',
'images/karakal.jpg', 'images/kit.jpg', 'images/kola.jpg',
'images/krisa.jpg', 'images/lemur.jpg', 'images/leopard.jpg',
'images/lisa.jpg', 'images/panda.jpg', 'images/patron.jpg',
'images/babochka.jpg', 'images/tralalelo.jpg', 'images/fish.jpg'];

let gameImages = [];
let availableTargets = [];
let currentTargetImage = '';
let matchedCount = 0;

function shuffleArray(array) {
for (let i = array.length - 1; i > 0; i--) {
const j = Math.floor(Math.random() * (i + 1));
[array[i], array[j]] = [array[j], array[i]];}
return array;}

function initGame() {$('#game-container').show();
$('#main-menu').hide();
$('#grid-container').empty();
$('#current-card-area').empty();
matchedCount = 0;

shuffleArray(imageDB);
gameImages = imageDB.slice(0, 25);
availableTargets = [...gameImages];

let $grid = $('#grid-container');
for (let i = 0; i < 25; i++) {
let imgSrc = gameImages[i];
let $cell = $('<div class="grid-cell"></div>');
let $img = $('<img>').attr('src', imgSrc);
$cell.append($img);

$cell.droppable({
accept: "#draggable-target",
drop: function(event, ui) {
let targetSrc = ui.draggable.attr('src');
let cellSrc = $(this).find('img').attr('src');

if (targetSrc === cellSrc) {
$(this).addClass('match-success');
ui.draggable.remove();
matchedCount++;

let indexToRemove = availableTargets.indexOf(targetSrc);
if (indexToRemove > -1) {availableTargets.splice(indexToRemove, 1);}

if (matchedCount === 25) {$('#win-dialog').dialog({ 
modal: true,
buttons: {"Почати з початку": function() {$(this).dialog("close"); 
restartGame();}}});} 
else {loadNewTarget();}} 
else {ui.draggable.effect("shake", { distance: 10, times: 2 }, 300);}}});
$grid.append($cell);}
loadNewTarget();}

function loadNewTarget() {
if (availableTargets.length === 0) return;

let randomIndex = Math.floor(Math.random() * availableTargets.length);
currentTargetImage = availableTargets[randomIndex];

let $dropZone = $('#current-card-area');
$dropZone.empty();
let $targetImg = $('<img>').attr('src', currentTargetImage).attr('id', 'draggable-target');
$targetImg.draggable({ revert: "invalid", containment: "document", cursor: "move" });
$dropZone.append($targetImg);}

function restartGame() {initGame();}

$('#start-btn').click(initGame);
$('#restart-btn').click(restartGame);});