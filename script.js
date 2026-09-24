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

function createPlayer(name, symbol) {
  return {
    name,
    symbol,
  };
}
