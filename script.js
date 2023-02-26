const tiles = document.querySelectorAll(".tile");
const player_X = "X";
const player_y = "O";
let turn = player_X;

const boardState = Array(tiles.length);
boardState.fill(null);

const win = document.getElementById("win");
const gameOverArea = document.getElementById("game-over-area");
const gameOverText = document.getElementById("game-over-text");
const playAgain = document.getElementById("play-again");
playAgain.addEventListener("click", startNewGame);

function setHoverText() {
  tiles.forEach((tile) => {
    tile.classList.remove("x-hover");
    tile.classList.remove("o-hover");
  });
  const hoverClass = `${turn.toLowerCase()}-hover`;

  tiles.forEach((tile) => {
    if (tile.innerText === "") {
      tile.classList.add(hoverClass);
    }
  });
}

/*for each tile call tile click*/
tiles.forEach((tile) => tile.addEventListener("click", tileClick));

function tileClick(event) {
  if (gameOverArea.classList.contains("visible")) {
    return;
  }

  /*targets the tile that is clicked at this moment*/
  const tile = event.target;
  const tileNumber = tile.dataset.index;
  if (tile.innerText != "") {
    return;
  }
  if (turn === player_X) {
    tile.innerText = player_X;
    boardState[tileNumber - 1] = player_X;
    turn = player_y;
  } else {
    tile.innerText = player_y;
    boardState[tileNumber - 1] = player_y;
    turn = player_X;
  }

  setHoverText();
  checkWinner();
}
const winningCombinations = [
  //horizontal
  { combo: [1, 2, 3], strikeClass: "line-row-1" },
  { combo: [4, 5, 6], strikeClass: "line-row-2" },
  { combo: [7, 8, 9], strikeClass: "line-row-3" },
  //vertical
  { combo: [1, 4, 7], strikeClass: "line-col-1" },
  { combo: [2, 5, 8], strikeClass: "line-col-2" },
  { combo: [3, 6, 9], strikeClass: "line-col-3" },
  //diagonals
  { combo: [1, 5, 9], strikeClass: "line-diagonal-1" },
  { combo: [3, 5, 7], strikeClass: "line-diagonal-2" },
];

function checkWinner() {
  for (const winningCombination of winningCombinations) {
    const { combo, strikeClass } = winningCombination;
    const tileValue1 = boardState[combo[0] - 1];
    const tileValue2 = boardState[combo[1] - 1];
    const tileValue3 = boardState[combo[2] - 1];

    if (
      tileValue1 != null &&
      tileValue1 === tileValue2 &&
      tileValue2 === tileValue3
    ) {
      win.classList.add(strikeClass);
      gameOverScreen(tileValue1);
      return;
    }
  }

  const allTileFilledIn = boardState.every((tile) => tile !== null);
  if (allTileFilledIn) {
    gameOverScreen(null);
  }
}

function gameOverScreen(winnerText) {
  let text = "Draw!";
  if (winnerText != null) {
    text = `Winner is ${winnerText}!`;
  }
  gameOverArea.className = "visible";
  gameOverText.innerText = text;
}
function startNewGame() {
  win.className = "line";
  gameOverArea.className = "hidden";
  boardState.fill(null);
  tiles.forEach((tile) => (tile.innerText = ""));
  turn = player_X;
  setHoverText();
}
