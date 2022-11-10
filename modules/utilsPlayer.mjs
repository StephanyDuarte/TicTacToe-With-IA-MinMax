import {loadFunctionsBtnsResult} from "./pages/resultPage.mjs";
import {velhaPage, resultPage } from "./pages/pagesSelector.mjs";
import {changeDisplay } from "./pages/playerPage.mjs";
import {cellClicker} from "./pages/twoPlayersPage.mjs"
import {cellClickerWithBot } from "./pages/onePlayerPage.mjs";


const board = document.querySelector(".board");
const turn_x = document.querySelector(".turn-x");
const turn_o = document.querySelector(".turn-o");
const score_x = document.querySelector(".score-x");
const score_o = document.querySelector(".score-o");
const showResult = document.querySelector(".result");
export const cells = document.querySelectorAll(".cell");
export const btnBackMove = document.querySelector(".btn-back-move");
let winner_i;
let winner_j;
let winner_k;

export const boardActual = () => {
  let board = [];
  for (let i = 0; i < cells.length; i++) {
    if (cells[i] == undefined || cells[i].textContent == "") {
      board.push("");
    } else {
      board.push(cells[i].textContent);
    }
  };
  return board;
};


const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export const checkWinner = (currentPlayer, board = boardActual()) => {
  for ([winner_i, winner_j, winner_k] of winningCombinations) {
    if (
      (board[winner_i] == currentPlayer) &
      (board[winner_j] == currentPlayer) &
      (board[winner_k] == currentPlayer)
    ) {
      return true;
    }
  }
  return false;
};

export const checkDraw = (board = boardActual()) => {
  let total =  board.reduce((sum, cell) => {
    if (cell == "X" || cell == "O") sum++;
    return sum;
  }, 0);
  if (total == 9) return true;
  return false;
};

export const displayBtnBackMove = (flag) => {
  if (flag) btnBackMove.style.display = "block";
  else btnBackMove.style.display = "none";
};

export const addListenerCell = (func) => {
  for (const cell of cells) {
    creatingListener(cell, func, true);
  }
};

export const creatingListener = (cell, func, isOnce) => {
  if (isOnce){
    cell.addEventListener("click", func, { once: true });
  } else {
    cell.addEventListener("click", func);
  };
};

export const changeClassBoard = (isCircleTurn) => {
  board.classList.remove("X");
  board.classList.remove("O");
  board.classList.add(isCircleTurn ? "O" : "X");
};

export const changeScore = (isCircleTurn) => {
  if (isCircleTurn) {
    turn_x.classList.remove("active");
    turn_o.classList.add("active");
    score_x.classList.remove("active");
    score_o.classList.add("active");
  } else {
    turn_o.classList.remove("active");
    turn_x.classList.add("active");
    score_o.classList.remove("active");
    score_x.classList.add("active");
  }
};

export const endingGame = (isDraw, winner="") => {
  if (isDraw) {
    showResult.innerText = "Draw!!!";
    openFinalPage()
  } else {  
    classWinner(true);
    setTimeout(classWinner, 1800, false);
    showResult.innerText = `${winner} Winner`;
  }
};

const openFinalPage = () => {
  cleanBoard();
  changeDisplay(velhaPage);
  changeDisplay(resultPage, "");
  loadFunctionsBtnsResult();
}

const classWinner = (add=false) => {
  if (add){
    cells[winner_i].classList.add("winner");
    cells[winner_j].classList.add("winner");
    cells[winner_k].classList.add("winner");
  } else {
    cells[winner_i].classList.remove("winner");
    cells[winner_j].classList.remove("winner");
    cells[winner_k].classList.remove("winner");
    openFinalPage()
  };
};

export const removingListener = (cell) => {
  cell.removeEventListener('click', cellClicker);
  cell.removeEventListener('click', cellClickerWithBot);
}

const cleanBoard = () => {
  for (const cell of cells) {
    cell.classList.remove("X");
    cell.classList.remove("O");
    cell.innerText = "";
    removingListener(cell);
  }
  board.classList.remove("X");
  board.classList.remove("O");
};