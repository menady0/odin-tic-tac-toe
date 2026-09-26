// This game contains 4 components

// First Component -------- Game Board ------------
const gameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];
  function placeSymbol(position, symbol) {
    if (board[position] === "") {
      board[position] = symbol;
      return true;
    }
    return false;
  }
  function getBoard() {
    return [...board];
  }
  function resetBoard() {
    for (let i = 0; i < board.length; i++) {
      board[i] = "";
    }
  }
  return {
    placeSymbol,
    getBoard,
    resetBoard,
  };
})();

// Second Component -------- Player ------------
function createPlayer(name, symbol) {
  return {
    name,
    symbol,
  };
}

// Third Component -------- Game Controller ------------
function gameController() {
  let player1, player2, currentPlayer, isGameOver;

  function startGame() {
    player1 = createPlayer("Mina", "X");
    player2 = createPlayer("Alex", "O");
    currentPlayer = player1;
    gameBoard.resetBoard();
    isGameOver = false;
  }
  function turnOver() {
    if (currentPlayer === player1) currentPlayer = player2;
    else currentPlayer = player1;
  }
  function checkTie() {
    const board = gameBoard.getBoard();
    for (let i = 0; i < board.length; i++) {
      if (board[i] === "") return false;
    }
    return true;
  }
  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const board = gameBoard.getBoard();

    for (let i = 0; i < winningCombinations.length; i++) {
      const item = winningCombinations[i];
      const first = item[0];
      const second = item[1];
      const third = item[2];
      if (
        board[first] !== "" &&
        board[first] === board[second] &&
        board[second] === board[third]
      ) {
        return board[first];
      }
    }
    return null;
  }
  function playTurn(position) {
    const move = gameBoard.placeSymbol(position, currentPlayer.symbol);
    if (move) {
      const winner = checkWinner();
      if (winner) {
        isGameOver = true;
      } else {
        const tie = checkTie();
        if (tie) {
          isGameOver = true;
        } else {
          turnOver();
        }
      }
    }
    return move;
  }
  function getGameState() {
    return {
      currentPlayer,
      gameOver: isGameOver,
      winner: checkWinner(),
      board: gameBoard.getBoard(),
    };
  }
  return {
    startGame,
    turnOver,
    checkTie,
    checkWinner,
    playTurn,
    getGameState,
  };
}

// Fourth Component -------- Display Controller ------------
const game = gameController();
const cells = document.querySelectorAll(".cell");
game.startGame();
updateUI();
cells.forEach((cell) =>
  cell.addEventListener("click", () => {
    const position = Number(cell.dataset.cell);
    const moveSuccessful = game.playTurn(position);
    if (moveSuccessful) {
      updateUI();
    }
  }),
);
function updateUI() {
  const gameState = game.getGameState();
  const board = gameState.board;
  for (let i = 0; i < board.length; i++) {
    cells[i].textContent = board[i];
  }
  const gameStatusElement = document.querySelector(".game-status");
  if (gameState.winner) {
    gameStatusElement.textContent = `${gameState.currentPlayer.name} wins!`;
  } else if (gameState.gameOver && gameState.winner === null) {
    gameStatusElement.textContent = `It is a tie!`;
  } else {
    gameStatusElement.textContent = `${gameState.currentPlayer.name}'s turn`;
  }
}
