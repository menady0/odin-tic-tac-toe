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

  function startGame(playerName1, playerName2) {
    player1 = createPlayer(playerName1, "X");
    player2 = createPlayer(playerName2, "O");
    currentPlayer = player1;
    gameBoard.resetBoard();
    isGameOver = false;
  }
  function restartGame() {
    currentPlayer = player1;
    isGameOver = false;
    gameBoard.resetBoard();
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
    let move = false;
    if (!isGameOver) {
      move = gameBoard.placeSymbol(position, currentPlayer.symbol);
    }
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
      player1,
      player2,
      currentPlayer,
      gameOver: isGameOver,
      winner: checkWinner(),
      board: gameBoard.getBoard(),
    };
  }
  return {
    startGame,
    restartGame,
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
  const player1 = document.querySelector(".player1");
  const player2 = document.querySelector(".player2");
  player1.textContent = `Player: ${gameState.player1.name}, Symbol: ${gameState.player1.symbol}`;
  player2.textContent = `Player: ${gameState.player2.name}, Symbol: ${gameState.player2.symbol}`;

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
const restart = document.querySelector(".restart");
restart.addEventListener("click", () => {
  game.restartGame();
  updateUI();
});

const startGameElement = document.querySelector("form");
const inpPlayer1 = document.querySelector("#player1");
const inpPlayer2 = document.querySelector("#player2");
startGameElement.addEventListener("submit", (e) => {
  e.preventDefault();
  const player1Name = inpPlayer1.value;
  const player2Name = inpPlayer2.value;
  game.startGame(player1Name, player2Name);
  updateUI();
  document.querySelector(".game-start").classList.add("hide");
  document.querySelector(".game").classList.remove("hide");
});
