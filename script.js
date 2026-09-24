// This game contains 4 components

// First Component -------- Game Board ------------
const gameboard = (() => {
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
