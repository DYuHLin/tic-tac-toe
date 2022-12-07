const block = document.querySelectorAll(".block");
let turnO = false;

//the module for the gameboard
const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    
    const winningCombo = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return {board, winningCombo};
})();

//factory function for players
const playerCreator = (name, item) => {
    return {name, item}
};

//factory function for game logic
function game(){

    const gameBoardObj = document.querySelector(".board");

    const restartBtn = document.getElementById("restart-btn");

    block.forEach(cell => cell.addEventListener('click', gameBoardSelect));
    restartBtn.addEventListener('click', restartGame);
   
};

function gameBoardSelect(){
    const tiles = this.getAttribute("blockPos");
    if(!gameBoard.board[tiles] !== ""){return};

    updateTile(this, tiles);
};

function updateTile(block, index){
    let player1 = playerCreator("Damian", "X");
    let player2 = playerCreator("Bot", "O");
    gameBoard.board[index] = player1.item;

    block.textContent = player1.item;
};

function restartGame(){

};

game();
//gameBoardSelect()