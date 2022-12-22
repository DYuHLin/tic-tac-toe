const block = document.querySelectorAll(".block");

//the module for the gameboard
const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    let running = false;

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

    return {board, running, winningCombo};
})();

//factory function for players
const playerCreator = (name, item) => {
    return {name, item}
};

//factory function for game logic
function game(){
    const restartBtn = document.getElementById("restart-btn");

    block.forEach(blocks => blocks.addEventListener('click', gameBoardSelect));
    
    restartBtn.addEventListener('click', restartGame);
    gameBoard.running = true;
};

function gameBoardSelect(){
    const cellIndex = this.getAttribute("block");
     if(gameBoard.board[cellIndex] != "" || !gameBoard.running){
         return
    };

    updateTile(this, cellIndex);

    console.log(cellIndex)
};

function updateTile(blocks, index){
    let player1 = playerCreator("Damian", "X");
    let player2 = playerCreator("Bot", "O");
    gameBoard.board[index] = player1.item;

    blocks.textContent = player1.item;
};

function restartGame(){

};

game();
//gameBoardSelect()