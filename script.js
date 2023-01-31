function PlayerFactory(name, mark) {
  return { name, mark };
}

const gameBoard = (() => {
  const _boardDOMCells = document.querySelector(".game-board").children;
  let _board = new Array(9).fill("");
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

  function _checkForWinner() {
    for (let i = 0; i < _winningConditions.length; i++) {
      const winCondition = _winningConditions[i];
      const a = _board[winCondition[0]];
      const b = _board[winCondition[1]];
      const c = _board[winCondition[2]];

      if (a === "" || b === "" || c === "") {
        continue;
      }

      if (a === b && b === c) {
        gameManager.endGame("winner");
      } else if (_board.every((elem) => elem !== "")) {
        gameManager.endGame("draw");
      }
    }
  }

  function resetBoard() {
    _board = new Array(9).fill("");
    Array.from(_boardDOMCells).forEach((cell) => (cell.textContent = ""));
  }

  function addMark(clickEvent) {
    if (gameManager.isGameRunning()) {
      const boardIndex = clickEvent.target.getAttribute("data-cell-index");

      if (_board[boardIndex] === "") {
        _board[boardIndex] = gameManager.getCurrentPlayer().mark;

        _checkForWinner();

        if (gameManager.isGameRunning()) {
          gameManager.changeCurrentPlayer();
        }
      }

      render();
    }
  }

  return { render, addMark, resetBoard };
})();

const gameManager = (() => {
  const _player1 = PlayerFactory("Tom", "X");
  const _player2 = PlayerFactory("John", "O");
  const results = document.querySelector(".final-results");
  let _currentPlayer = _player1;
  let _gameRunning = true;

  (function setupEventListeners() {
    document
      .querySelectorAll(".cell")
      .forEach((cell) => cell.addEventListener("click", gameBoard.addMark));

    document.querySelector(".reset").addEventListener("click", _resetGame);
  })();

  function _resetGame() {
    gameBoard.resetBoard();
    _currentPlayer = _player1;
    _gameRunning = true;
    results.textContent = "";
  }

  function getCurrentPlayer() {
    return _currentPlayer;
  }

  function changeCurrentPlayer() {
    getCurrentPlayer() === _player1
      ? (_currentPlayer = _player2)
      : (_currentPlayer = _player1);
  }

  function announceWinner() {
    _gameRunning = false;
    results.textContent = `Game over! The winner is ${getCurrentPlayer().name}`;
  }

  function announceDraw() {
    results.textContent = `Game over! It's a draw!`;
  }

  function isGameRunning() {
    return _gameRunning;
  }

  function endGame(result) {
    result === "winner" ? announceWinner() : announceDraw();
  }

  return {
    getCurrentPlayer,
    changeCurrentPlayer,
    endGame,
    isGameRunning,
  };
})();
