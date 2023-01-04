const block = document.querySelectorAll(".block");

//the module for the gameboard
const gameBoard = (() => {
    //board which the X and O goes
    let board = ['', '', '', '', '', '', '', '', ''];
    //variable to let the game run
    let running = false;

    //variable to let O haave a turn
    let turnO = false;

    //the sets of combos that win the game
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

    //variables for names of players
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

    //button that sets the name of players
    const nameBtn = document.getElementById("confirmName");
    nameBtn.addEventListener('click', () => {
        createPlayer()
    });
    //when the running is true the game is playable
    gameBoard.running = true;
};

//popup box to create the names of the players
function createPlayer(){
    //The UI of the tic tac toe game for the names
    const firstPlayerText = document.getElementById("first-player-name");
    const secondPlayerText = document.getElementById("second-player-name");
    gameBoard.firstName = firstPlayerText.value;
    gameBoard.secondName = secondPlayerText.value;

    //to close the window when the users have inputted their names
    const popupWindow = document.getElementById("chooseName");
    popupWindow.style = "visibility: hidden";
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

    //for the placing of pieces on gameboard
    if(gameBoard.turnO === false){
        gameBoard.board[index] = player1.item;
        blocks.textContent = player1.item;
        gameBoard.turnO = true;
        console.log(gameBoard.turnO)
        //to give player 2 O a turn
    } else if (gameBoard.turnO === true) {
        gameBoard.board[index] = player2.item;
        blocks.textContent = player2.item;
        gameBoard.turnO = false;
        console.log(gameBoard.turnO)

     } 
    
};

//this functions checks for a winner
function logic(){
    //above the board UI to let the users know the status of the game
    const status = document.getElementById("status");
    //variable that changes if there is a winner
    let checkWin = false;
    //loops through the winninh combinations to see if there is a winner in the gameboard array
    for(let i = 0; i < gameBoard.winningCombo.length; i++){
        const combo = gameBoard.winningCombo[i];
        const blockA = gameBoard.board[combo[0]];
        const blockB = gameBoard.board[combo[1]];
        const blockC = gameBoard.board[combo[2]];

        //continues the loop if there is no winner yet and there is still empty spaces
        if(blockA == "" || blockB == "" || blockC == ""){
            continue;
        } 
        //checks for a winner, seeing if these blocks match
        if(blockA == blockB && blockB == blockC){
            if(blockA == "X" && blockB == "X" && blockC == "X"){
                //checks if x won and changes the status of the text if so
                status.innerText = `${gameBoard.firstName} won`
            } else if (blockA == "O" && blockB == "O" && blockC == "O"){
                //checks if o won and changes the status of the text if so
                status.innerText = `${gameBoard.secondName} won`
            }
            //when there is a winner the checkwin changes to true and the loop stops
            checkWin = true;
            break;
        };
    };

    //if checkwin is true the game stops running
    if(checkWin){    
        gameBoard.running = false;
        //if the gameboard does not include empty spaces and there is no winner it is a draw and the
        //game stops running
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

game();