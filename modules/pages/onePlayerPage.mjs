import {placeMark} from "./../editCellProperty.mjs";
import * as utils from "./../utilsPlayer.mjs"


let isCircleTurn;
const bot = "O";


const markMove = (board, pos, player) => {
  let new_board = [...board];
  new_board[pos] = player;
  return new_board;
};

const possibleMoves = (board = utils.boardActual()) => {
  return (
    board.reduce((moves, value, index) => {
      if (value == "") moves.push(index);
      return moves;    
    }, [])
  );
};
  
const miniMax = (board, player) => {
  let enemy = player == "X" ? "O" : "X";

  for (let person of [player, enemy]) {
    let isWin = utils.checkWinner(person, board);
    if ((isWin) & (person != bot)) return -1;
    if ((isWin) & (person == bot)) return 1;
  };
  if (utils.checkDraw(board)) return 0;

  let moves = possibleMoves(board);
  if (player == bot) {
    let best = -Infinity;
    for (let mov of moves) {
      let result = markMove(board, mov, player);
      let value = miniMax(result, player == "X" ? "O" : "X");
      if (value > best) best = value;
    }
    return best;
  } else {
    let best = Infinity;
    for (let mov of moves) {
      let result = markMove(board, mov, player);
      let value = miniMax(result,  player == "X" ? "O" : "X");
      if (value < best) best = value;
    }
    return best;
  }
};

const bestAction = () => {
  const board = utils.boardActual();
  let moves = possibleMoves(board);
  let best = -Infinity;
  let bestMove = null;
  for (let mov of moves) {
    let result = markMove(board, mov, bot);
    let value = miniMax(result, "X");
    if (value > best) {
      best = value;
      bestMove = mov;
    }
  }
  return bestMove;
};

export const startPlayWithBot = () => {
  utils.displayBtnBackMove(false);
  utils.addListenerCell(cellClickerWithBot);
  isCircleTurn = false;
  utils.changeClassBoard(isCircleTurn);
  utils.changeScore(isCircleTurn);
};

export const cellClickerWithBot = (e) => {
  disableCell(true)
  const cell = e.target;
  const classToAdd = isCircleTurn ? "O" : "X";
  if (!cell.textContent == '') {
    disableCell(); 
    return;
  }
  placeMark(cell, classToAdd);
  checkEndGame(classToAdd);
  if (isCircleTurn) {
    setTimeout(botClicking, 800);
  }
};

const botClicking = () => {
    placeMark(utils.cells[bestAction()], bot);
    disableCell();
    checkEndGame(bot);
} 

const disableCell = (isDisable=false) => {
    let blankCell = possibleMoves();
    if (isDisable) {
      blankCell.forEach(i => {
        utils.removingListener(utils.cells[i]);
      });
    } else {
      blankCell.forEach(i => {
        utils.cells[i].addEventListener(
          'click', cellClickerWithBot, {once: true});
      });
    }
};
  
const checkEndGame = (classToAdd) => {
    const isWin = utils.checkWinner(classToAdd);
    const isDraw = utils.checkDraw();
    if (isWin) {
      utils.endingGame(false, "Bot");
    } else if (isDraw) {
      utils.endingGame(true);
    } else {
      changeTurns();
    }
};
  
const changeTurns = () => {
  isCircleTurn = !isCircleTurn;
  utils.changeClassBoard(isCircleTurn);
  utils.changeScore(isCircleTurn);
};