const block = document.querySelectorAll(".block");

//the module for the gameboard
const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    let running = false;
    let turnO = false;

    let againstAi = false;
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

    let firstName;
    let secondName;

    return {board, running, turnO, winningCombo, firstName, secondName, againstAi};
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

    const nameBtn = document.getElementById("confirmName");

    nameBtn.addEventListener('click', () => {
        createPlayer()
    });

    const againstPc = document.getElementById("computer-btn");

    againstPc.addEventListener('click', () => {
        gameBoard.againstAi = true;
        console.log(gameBoard.againstAi)

        const secondPlayerName = document.getElementById("playerTwo");
        secondPlayerName.textContent = "Computer"
    });
    //when the running is true the game is playable
    gameBoard.running = true;
};

//popup box to create the names of the players
function createPlayer(){
    const firstPlayerText = document.getElementById("first-player-name");
    const secondPlayerText = document.getElementById("second-player-name");

    gameBoard.firstName = firstPlayerText.value;
    gameBoard.secondName = secondPlayerText.value;

    const popupWindow = document.getElementById("chooseName");
    popupWindow.style = "visibility: hidden";

    console.log(gameBoard.firstName)
    console.log(gameBoard.secondName)
}

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
    logic();
    console.log(cellIndex)
};
//function to put an x or o in the tile
function updateTile(blocks, index){
    
    //creating the players
    let player1 = playerCreator(gameBoard.firstName, "X");
    let player2 = playerCreator(gameBoard.secondName, "O");

    //displays the name of the players
    const firstPlayerName = document.getElementById("playerOne");
    const secondPlayerName = document.getElementById("playerTwo");

    firstPlayerName.innerText = gameBoard.firstName;
    secondPlayerName.textContent = gameBoard.secondName;

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

//this functions checks for a winner
function logic(){
    const status = document.getElementById("status");
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
            if(blockA == "X" && blockB == "X" && blockC == "X"){
                status.innerText = `${gameBoard.firstName} won`
            } else if (blockA == "O" && blockB == "O" && blockC == "O"){
                status.innerText = `${gameBoard.secondName} won`
            }
            checkWin = true;
            break;
        };
    };

    if(checkWin){
         
        gameBoard.running = false;
    } else if(!gameBoard.board.includes("")){
        status.innerText = "It is a draw"
        gameBoard.running = false;
    }
};

//this function resets everything to restart the game
function restartGame(){
    const status = document.getElementById("status");
    status.innerText = "";
    gameBoard.running = true;
    gameBoard.turnO = false;
    gameBoard.board = ['', '', '', '', '', '', '', '', ''];
    block.forEach(blocks => blocks.textContent = "");
};

//function for playing against computer
function againstComputer(){
    gameBoard.againstAi = true;
    const cellIndex = this.getAttribute("block");
    const secondPlayerName = document.getElementById("playerTwo");
    secondPlayerName.textContent = "Computer"
    let player3 = playerCreator(gameBoard.secondName, "O");

    if(gameBoard.turnO === true){
        let randomNum = Math.floor(Math.random() * 8) +1;
        console.log(randomNum)
        gameBoard.board[randomNum] = player3.item;
        gameBoard.turnO = false;
    }
};

game();