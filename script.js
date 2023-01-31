function PlayerFactory(name, mark) {
  return { name, mark };
}

const gameBoard = (() => {
  const _boardDOMCells = document.querySelector(".container").children;
  const _board = new Array(9).fill("");
  const _winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function render() {
    for (let i = 0; i < _board.length; i++) {
      if (_board[i] !== "") {
        _boardDOMCells[i].textContent = _board[i];
      }
    }
  }

  function checkForWinner() {
    for (let i = 0; i < _winningConditions.length; i++) {
      const winCondition = _winningConditions[i];
      const a = _board[winCondition[0]];
      const b = _board[winCondition[1]];
      const c = _board[winCondition[2]];

      if (a === "" || b === "" || c === "") {
        continue;
      }

      if (a === b && b === c) {
        gameManager.announceWinner();
      }
    }
  }

  function addMark(clickEvent) {
    if (gameManager.isGameRunning()) {
      const boardIndex = clickEvent.target.getAttribute("data-cell-index");

      if (_board[boardIndex] === "") {
        _board[boardIndex] = gameManager.getCurrentPlayer().mark;

        checkForWinner();

        if (gameManager.isGameRunning()) {
          gameManager.changeCurrentPlayer();
        }
      }

      render();
    }
  }

  return { render, addMark, _board };
})();

const gameManager = (() => {
  const _player1 = PlayerFactory("Tom", "X");
  const _player2 = PlayerFactory("John", "O");
  let _currentPlayer = _player1;
  let gameRunning = true;

  (function setupEventListeners() {
    document
      .querySelectorAll(".cell")
      .forEach((cell) => cell.addEventListener("click", gameBoard.addMark));
  })();

  function getCurrentPlayer() {
    return _currentPlayer;
  }

  function changeCurrentPlayer() {
    getCurrentPlayer() === _player1
      ? (_currentPlayer = _player2)
      : (_currentPlayer = _player1);
  }

  function announceWinner() {
    gameRunning = false;
    console.log(`Game over! The winner is ${getCurrentPlayer().name}`);
  }

  function isGameRunning() {
    return gameRunning;
  }

  return {
    getCurrentPlayer,
    changeCurrentPlayer,
    announceWinner,
    isGameRunning,
  };
})();
