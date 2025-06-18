let gridItems = document.getElementsByClassName("square");
let currentTurn = "X";
let boardArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
let gameIsFinished = false;
let result = document.getElementById("result");

for (const item of gridItems) {
  item.addEventListener("click", function () {
    let value = item.getAttribute("value");
    let index = value - 1;
    if (boardArray[index] == "X" || boardArray[index] == "O") {
      return;
    }

    // visually

    let squareContent = document.querySelector(`.square[value='${value}']`);
    squareContent.textContent = currentTurn;

    // logic

    boardArray[index] = currentTurn;

    evaluateBoard();
    currentTurn === "X" ? (currentTurn = "O") : (currentTurn = "X");
    document.getElementById("instruction").textContent = currentTurn + " turn";
    function evaluateBoard() {
      if (
        (boardArray[0] == boardArray[1] && boardArray[1] == boardArray[2]) ||
        (boardArray[0] == boardArray[3] && boardArray[3] == boardArray[6]) ||
        (boardArray[0] == boardArray[4] && boardArray[4] == boardArray[8]) ||
        (boardArray[1] == boardArray[4] && boardArray[4] == boardArray[7]) ||
        (boardArray[2] == boardArray[4] && boardArray[4] == boardArray[6]) ||
        (boardArray[2] == boardArray[5] && boardArray[5] == boardArray[8]) ||
        (boardArray[3] == boardArray[4] && boardArray[4] == boardArray[5]) ||
        (boardArray[6] == boardArray[7] && boardArray[7] == boardArray[8])
      ) {
        gameIsFinished = true;
        result.textContent = currentTurn + " Winner";
      }
      // game is Finished
      if (gameIsFinished) {
        return;
      }
      // draw
      let isDraw = true;
      for (square of boardArray) {
        if (square != "X" && square != "O") {
          isDraw = false;
        }
      }

      if (isDraw) {
        gameIsFinished = true;
        result.textContent = "Draw";
      }
    }
  });
}
// reset button
let reset = document.getElementById("reset-btn");
reset.addEventListener("click", function () {
  for (const item of gridItems) {
    let value = item.getAttribute("value");
    let squareContent = document.querySelector(`.square[value='${value}']`);
    squareContent.textContent = " ";
  }
  boardArray = ["0", "1", "2", "3", "4", "5", "6", "7", "8"];
  isDraw = false;
  gameIsFinished = false;
  showResult = false;
  currentTurn = "X";
  result.textContent = "";
});
