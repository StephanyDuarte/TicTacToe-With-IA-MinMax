import {placeMark} from "./../editCellProperty.mjs";
import * as utils from "./../utilsPlayer.mjs"


let isCircleTurn;
let filoOfMoves = [];
let changeTurn = 0;


const changeTurns = () => {
  isCircleTurn = !isCircleTurn;
  utils.changeClassBoard(isCircleTurn);
  utils.changeScore(isCircleTurn);
};

const addInFilo = (cell, classToAdd) => {
  filoOfMoves.push([cell, classToAdd]);
};

const backMove = () => {
  if (filoOfMoves.length > 0) {
    const [cell, classToAdd] = filoOfMoves.pop();
    cell.classList.remove(classToAdd);
    cell.innerText = "";
    utils.creatingListener(cell, cellClicker, true);
    changeTurn++;
    if (changeTurn % 0 != 0) changeTurns();
    if (filoOfMoves.length == 0) utils.displayBtnBackMove(false);
  }
};

export const cellClicker = (e) => {
  const cell = e.target;
  const classToAdd = isCircleTurn ? "O" : "X";
  placeMark(cell, classToAdd);
  addInFilo(cell, classToAdd);
  utils.displayBtnBackMove(true);
  checkEndGame(classToAdd);
};

export const startPlay = () => {
  utils.displayBtnBackMove(false);
  utils.creatingListener(utils.btnBackMove, backMove, false)
  utils.addListenerCell(cellClicker);
  isCircleTurn = false;
  utils.changeClassBoard(isCircleTurn);
  utils.changeScore(isCircleTurn);
};

const checkEndGame = (classToAdd) => {
  const isWin = utils.checkWinner(classToAdd);
  const isDraw = utils.checkDraw();
  if (isWin) {
    cleanFiLo()
    utils.endingGame(false, classToAdd);
  } else if (isDraw) {
    cleanFiLo()
    utils.endingGame(true);
  } else {
    changeTurns();
  }
};

const cleanFiLo = () => {
  filoOfMoves = [];
}