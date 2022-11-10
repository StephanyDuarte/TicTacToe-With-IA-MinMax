import { resultPage, startPage } from "./pagesSelector.mjs";
import { starter } from "./startPage.mjs";
import { changeDisplay } from "./playerPage.mjs";

const btnPlayAgain = document.querySelector(".btns-final-again");
const btnRestart = document.querySelector(".btns-final-restart");

export const loadFunctionsBtnsResult = () => {
//   btnPlayAgain.addEventListener("click", startGame, { once: true });
  btnRestart.addEventListener("click", restartGame, { once: true });
};

const restartGame = () => {
  changeDisplay(resultPage);
  changeDisplay(startPage, "");
  starter();
};
