function PlayerFactory(name, mark) {
  return { name, mark };
}

const gameBoard = (() => {
  const _boardDOMCells = document.querySelector(".container").children;
  const _board = new Array(9).fill(null);

  function render() {
    for (let i = 0; i < _board.length; i++) {
      if (_board[i] !== null) {
        _boardDOMCells[i].textContent = _board[i];
      }
    }
  }

  function checkForWinner() {}

  function addMark(clickEvent) {
    const boardIndex = clickEvent.target.getAttribute("data-cell-index");

    if (_board[boardIndex] === null) {
      _board[boardIndex] = gameManager.getCurrentPlayer().mark;
      gameManager.changeCurrentPlayer();
    }
    render();
    checkForWinner();
  }

  return { render, addMark };
})();

const gameManager = (() => {
  const _player1 = PlayerFactory("Tom", "X");
  const _player2 = PlayerFactory("John", "O");
  let _currentPlayer = _player1;

  function setupEventListeners() {
    document
      .querySelectorAll(".cell")
      .forEach((cell) => cell.addEventListener("click", gameBoard.addMark));
  }

  function getCurrentPlayer() {
    return _currentPlayer;
  }

  function changeCurrentPlayer() {
    getCurrentPlayer() === _player1
      ? (_currentPlayer = _player2)
      : (_currentPlayer = _player1);
  }

  setupEventListeners();
  return { getCurrentPlayer, changeCurrentPlayer };
})();
