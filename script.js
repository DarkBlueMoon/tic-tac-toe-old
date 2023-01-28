function PlayerFactory(name, mark) {
  return { name, mark };
}

const gameBoard = (() => {
  const board = new Array(9).fill(null);

  // Func: render board to DOM container
  // Func: check for winner after each click.

  return { board };
})();

// Root of the game.
const gameManager = (() => {
  // Create the players & hold reference to the two players.
  const player1 = PlayerFactory("Tom", "X");
  const player2 = PlayerFactory("John", "O");

  // Create the gameBoard and hold reference to the gameBoard.

  // Func: switch player upon valid move
  // Func: choose first player upon game start
  return { player1, player2 };
})();
