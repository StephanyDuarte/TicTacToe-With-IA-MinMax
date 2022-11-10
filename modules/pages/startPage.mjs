import { changeDisplay } from "./playerPage.mjs";
import {startPage, playerPage} from "./pagesSelector.mjs";
import {loadFunctionsBtnPlayers} from "./playerPage.mjs";

export const btnStart = document.querySelector(".button_start");

export const starter = () => {
  btnStart.addEventListener("click", startGame, { once: true });
};

const startGame = () => {
  changeDisplay(startPage);
  changeDisplay(playerPage, "");
  loadFunctionsBtnPlayers();
};