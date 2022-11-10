import { playerPage, velhaPage } from "./pagesSelector.mjs";
import { startPlay } from "./twoPlayersPage.mjs";
import {startPlayWithBot} from "./onePlayerPage.mjs";


const btnPlayer1 = document.querySelector(".btn-player-1");
const btnPlayer2 = document.querySelector(".btn-player-2");


export const loadFunctionsBtnPlayers = () => {
  btnPlayer1.addEventListener("click", onePlayerGame, { once: true });
  btnPlayer2.addEventListener("click", twoPlayersGame, { once: true });
};

export const changeDisplay = (cell, visivel = "none") => {
  cell.style.display = visivel;
};

const onePlayerGame = () => {
  changeDisplay(playerPage);
  changeDisplay(velhaPage, "");
  startPlayWithBot();
};

const twoPlayersGame = () => {
  changeDisplay(playerPage);
  changeDisplay(velhaPage, "");
  startPlay();
};