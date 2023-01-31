function PlayerFactory(name, mark) {
  return { name, mark };
}

// const boardContainer = document.querySelector(".container");
// boardContainer.addEventListener("click", (ev) => {
//   console.dir(ev.target);
//   console.log(Array.from(ev.target.parentNode.children).indexOf(ev.target));
// });

const gameBoard = (() => {
  // const boardDOMCells = boardContainer.children;
  const board = new Array(9).fill(null);
  board[0] = "X";
  board[4] = "X";
  board[8] = "X";

  // Func: render board to DOM container
  function render() {
    for (let i = 0; i < board.length; i++) {
      if (board[i] !== null) {
        // boardDOMCells[i].textContent = board[i];
      }
    }
  }

  function checkForWinner() {}

  function addMark(clickEvent) {
    const boardIndex = clickEvent.target.getAttribute("data-cell-index");

    if (board[boardIndex] === null) {
      board[boardIndex] = gameManager.getCurrentPlayer().mark;
    }

    checkForWinner();
  }
  // Func: check for winner after each click.

  return { board, render, addMark };
})();

// Root of the game.
const gameManager = (() => {
  // Create the players & hold reference to the two players.
  const player1 = PlayerFactory("Tom", "X");
  const player2 = PlayerFactory("John", "O");
  let currentPlayer = player1;

  function setupEventListeners() {
    document
      .querySelectorAll(".cell")
      .forEach((cell) => cell.addEventListener("click", gameBoard.addMark));
  }

  function getCurrentPlayer() {
    return currentPlayer;
  }

  function changeCurrentPlayer() {
    getCurrentPlayer() === player1
      ? (currentPlayer = player2)
      : (currentPlayer = player1);
  }

  setupEventListeners();
  // Create the gameBoard and hold reference to the gameBoard.

  // Func: switch player upon valid move
  // Func: choose first player upon game start
  return { getCurrentPlayer, changeCurrentPlayer };
})();
