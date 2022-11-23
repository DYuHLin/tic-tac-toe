'use strict'

//the module for the gameboard
const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    const block1 = document.getElementById("block-0");
    const block2 = document.getElementById("block-1");
    const block3 = document.getElementById("block-2");
    const block4 = document.getElementById("block-3");
    const block5 = document.getElementById("block-4");
    const block6 = document.getElementById("block-5");
    const block7 = document.getElementById("block-6");
    const block8 = document.getElementById("block-7");
    const block9 = document.getElementById("block-8");
})();

//factory function for players
const playerCreator = (name, item) => {
    return {name, item}
};

//factory function for game logic
function game(){
    let player1 = playerCreator("Damian", "X");
    let player2 = playerCreator("Bot", "O");

    let turnO = false;

    const gameBoardObj = document.querySelector(".block");

    gameBoardObj.addEventListener('click', (e) => {
        e.preventDefault();

        if(turnO === false){
            gameBoardObj.textContent = player1.item;
            turnO = true;
        } else if(turnO === true){
            gameBoardObj.textContent = player2.item;
            turnO = false;
        };
        
    });
};

game();