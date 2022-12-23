const block = document.querySelectorAll(".block");

//the module for the gameboard
const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    let running = false;
    let turnO = false;

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

    return {board, running, turnO, winningCombo};
})();

//factory function for players
const playerCreator = (name, item) => {
    return {name, item}
};

//factory function for game logic
function game(){
    const restartBtn = document.getElementById("restart-btn");

    //loops through the tiles in the gameboard
    block.forEach(blocks => blocks.addEventListener('click', gameBoardSelect));
    
    //restart the game with clock of a button
    restartBtn.addEventListener('click', () => {
        restartGame()
    });
    //when the running is true the game is playable
    gameBoard.running = true;
};

//retrieves the tiles of the game board
function gameBoardSelect(){
    //gets the attribute of the html elemet "block"
    const cellIndex = this.getAttribute("block");

    //does nothing if the tile is empty
     if(gameBoard.board[cellIndex] != "" || !gameBoard.running){
         return
    };

    //calls the updateTile function
    updateTile(this, cellIndex);
    //logic();
    console.log(cellIndex)
};
//function to put an x or o in the tile
function updateTile(blocks, index){
    
    let player1 = playerCreator("Damian", "X");
    let player2 = playerCreator("Bot", "O");

    if(gameBoard.turnO === false){
        gameBoard.board[index] = player1.item;
        blocks.textContent = player1.item;
        gameBoard.turnO = true;
        console.log(gameBoard.turnO)

    } else if (gameBoard.turnO === true) {
        gameBoard.board[index] = player2.item;
        blocks.textContent = player2.item;
        gameBoard.turnO = false;
        console.log(gameBoard.turnO)
    }
    
};

function logic(){
    let checkWin = false;
    for(let i = 0; i < gameBoard.winningCombo.length; i++){
        const combo = gameBoard.winningCombo[i];
        const blockA = gameBoard.board[combo[0]];
        const blockB = gameBoard.board[combo[1]];
        const blockC = gameBoard.board[combo[2]];

        if(blockA == "" || blockB == "" || blockC == ""){
            continue;
        } 
        if(blockA == blockB && blockB == blockC){
            checkWin = true;
            break;
        };
    };

    if(checkWin){
        gameBoard.running = false;
    } else if(gameBoard.board.includes("")){
        gameBoard.running = false;
    } else {
        
    };
};

function restartGame(){
    gameBoard.running = true;
    gameBoard.turnO = false;
    gameBoard.board = ['', '', '', '', '', '', '', '', ''];
    block.forEach(blocks => blocks.textContent = "");
};

game();