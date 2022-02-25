// This file contains helper code beyond the first week "Intro to JavaScript" course content.
// You should not have to make any changes in this file to get your game working.

// Clear down the elements drawn on the board.
function clearBoard() {
    if (gameStarted) {
        for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
            for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
                console.log("Working")
                //document.getElementById(`row-${rowIndex}-column-${columnIndex}`).innerHTML = ""
                document.getElementById(`row-${rowIndex}-column-${columnIndex}`).style.backgroundColor = "white"
            }
        }
    } else {
        for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
            for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
                console.log("Working")
                //document.getElementById(`row-${rowIndex}-column-${columnIndex}`).innerHTML = ""
                document.getElementById(`row-${rowIndex}-column-${columnIndex}`).style.backgroundColor = "rgb(100, 100, 100)"
            }
        }
    }
}

// // Clear down the elements drawn on the board.
// function clearBoard() {
//     for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
//         for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
//             console.log("Working")
//             //document.getElementById(`row-${rowIndex}-column-${columnIndex}`).innerHTML = ""
//             cell = document.getElementById(`row-${rowIndex}-column-${columnIndex}`)
//             if (gameStarted) {
//                 cell.style.backgroundColor = "white"
//             } else{
//             cell.style.backgroundColor = "rbg(100,100,100)"
//             }
//         } 
//     } 
// }

// Populate the grid with images based on the board state.
function drawBoard(board) {
    if (gameStarted){
        console.log(board)
        clearBoard();
        for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
            for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
                if (!board[rowIndex][columnIndex]) {
                    //document.getElementById(`row-${rowIndex}-column-${columnIndex}`).style.backgroundColor = "white"
                    continue;
                }
                const cellText = board[rowIndex][columnIndex] === "red" ? "red" : "yellow";
                document.getElementById(`row-${rowIndex}-column-${columnIndex}`).style.backgroundColor = cellText
            }
        }
    }    
}


// A grid position was clicked call the game's turn function, redraw and then check for a winner.
function positionClick(rowIndex, columnIndex, event) {
    takeTurn(rowIndex, columnIndex);
    const board = getBoard();
    // if (!isValidRowOrColumn(board) || !board.every(isValidColumn)) {
    //     throw "Expecting 'getBoard' to return a 2d array where all values match are null or one of the strings 'nought' or 'cross'. Actually received: " + JSON.stringify(board);
    // }
    drawBoard(board);
    const winner = checkWinner();
    if (winner) {
        if (typeof winner !== "string" || !["red", "yellow", "nobody"].includes(winner)) {
            throw "Expecting 'checkWinner' to return null or one of the strings 'red', 'yellow' or 'nobody'. Actually received: " + winner;
        }
        // const winnerDis = document.getElementById("winner-name");
        updateNameAndScore()
        const winnerDisplay = document.getElementById("winner-display");
        if (winner === "red"){
            winnerDisplay.innerText = `The winner is ${playerOneName}`;
        } else {
            winnerDisplay.innerText = `The winner is ${playerTwoName}`;
        }
        winnerDisplay.style.display = "block";
        winnerDisplay.style.backgroundColor = winner;
        if (winner !== "nobody"){
            winnerDisplay.style.backgroundColor = winner;
        } else {
            winnerDisplay.style.backgroundColor = "black"
        }
    }
}

// Bind the click events for the grid.
for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        const gridPosition = document.getElementById(`row-${rowIndex}-column-${columnIndex}`)
        gridPosition.addEventListener("click", positionClick.bind(null, rowIndex, columnIndex));
    }
}

// The reset button was clicked, call the game's reset function then reset the DOM.
function resetClick(event) {
    resetGame();
    // const winnerName = document.getElementById("winner-name");
    // winnerName.innerText = "";
    const winnerDisplay = document.getElementById("winner-display");
    winnerDisplay.innerText = "";
    winnerDisplay.style.display = "None";
    humanVsHumanOptionButton.style.backgroundColor = ""
    humanVsComputerOptionButton.style.backgroundColor = ""
    clearBoard()
    hideNameAndScore()
    // updateNameAndScore()
    console.log("The board was cleared")

    // for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    //     for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
    //         console.log("Working")
    //         document.getElementById(`row-${rowIndex}-column-${columnIndex}`).style.backgroundColor = "white"
    //         console.log(board)
    //     }
    // }
}

// Bind the click event for the reset button.
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetClick);

// The reset button was clicked, call the game's reset function then reset the DOM.
function playAgainResetClick(event) {
    if (gameStarted){
        playAgain();
        const winnerDisplay = document.getElementById("winner-display");
        winnerDisplay.innerText = "";
        winnerDisplay.style.display = "None";
        // humanVsHumanOptionButton.style.backgroundColor = ""
        // humanVsComputerOptionButton.style.backgroundColor = ""
        clearBoard()
        console.log("The board was cleared")
    }
}

// Bind the click event for the reset button.
const playAgainButton = document.getElementById("play-again-button");
playAgainButton.addEventListener("click", playAgainResetClick);



//The instructions button was clicked call change the display of the instructions
//to flex if display === none or none if display === flex
function instructionsClick(event) {
    console.log("I was clicked!!")
    const instructions = document.getElementById("instructions")
    if (instructions.style.display === ""){
        //null evaluates to an empty string not false or "none "
        console.log("Changed the display to block")
        instructions.style.display = "block"
        console.log(instructions.style.display)
    } else {
        console.log("Changed the display to none")
        instructions.style.display = ""
        console.log(instructions.style.display)

    }

    // instructions.style.display === "" ? instructions.style.display = "block" : 
    //                                     instructions.style.display = ""
}

// Bind the click event for the instructions button.
const instructionsButton = document.getElementById("instructions-button");
instructionsButton.addEventListener("click", instructionsClick);



function mouseOverCellHighlight(row,column){
    if (gameStarted){
        // console.log("The mouse went over me")
        // console.log(`Row ${row}, Column: ${column}`)
        // console.log(`[${row},${column}]`)
        for (rowIndex = 0; rowIndex < board.length; rowIndex++){
            const MouseOverColour = document.getElementById(`row-${rowIndex}-column-${column}`)
            console.log(board[rowIndex][column])
            if (board[rowIndex][column] === null){
                if (!gameOver){
                    if (currentPlayer === playerOne){
                        MouseOverColour.style.backgroundColor = "rgba(255, 0, 0, 0.6)"
                    } else {
                        MouseOverColour.style.backgroundColor = "rgba(255, 255, 0, 0.6)"
                    }
                }
            }
        }
    }
}

// Bind the mouse over a cell events for the grid.
for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        const mouseOverGridCell = document.getElementById(`row-${rowIndex}-column-${columnIndex}`)
        mouseOverGridCell.addEventListener("mouseover", mouseOverCellHighlight.bind(null, rowIndex, columnIndex));
    }
} 

function mouseOutCellRemoveHighlight(row,column){
    if (gameStarted){
        // console.log("The mouse went out of me")
        // console.log(`Row ${row}, Column: ${column}`)
        // console.log(`[${row},${column}]`)
        for (rowIndex = 0; rowIndex < board.length; rowIndex++){
            const MouseOutOfColour = document.getElementById(`row-${rowIndex}-column-${column}`)
            console.log(board[rowIndex][column])
            if (board[rowIndex][column] === null){
                MouseOutOfColour.style.backgroundColor = "white"
            }
        }
    }
}

// Bind the mouse out of cell events for the grid.
for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        const mouseOutOfGridCell = document.getElementById(`row-${rowIndex}-column-${columnIndex}`)
        mouseOutOfGridCell.addEventListener("mouseout", 
        mouseOutCellRemoveHighlight.bind(null, rowIndex, columnIndex));
    }
} 

//Start game click function
function startClick(event) {
    console.log("I was clicked!!")
    console.log("The game has started")
    const start = document.getElementById("start-button")
    const playerVsPlayerOption = document.getElementById("player-player-option-button")
    const playerVsComputerOption = document.getElementById("player-computer-option-button")
    start.style.display = "none"
    // playerVsPlayerOption.style.display = "inline-block"
    // playerVsComputerOption.style.display = "inline-block"
    gameStarted = true
    changeCellColour()

    //changes to player one 
    console.log("I was clicked!! P1")
    const playerOneSubmitButton = document.getElementById("submit-button-player-one")
    const playerOneTextBox = document.getElementById("player-one-name-box")
    const playerOneNameLabel = document.getElementById("player-one-name-bar")
    playerOneNameLabel.style.display = 'none'
    playerOneTextBox.style.display = 'none'
    playerOneSubmitButton.style.display = 'none'


    //changes to player two
    const playerTwoSubmitButton = document.getElementById("submit-button-player-two")
    const playerTwoTextBox = document.getElementById("player-two-name-box")
    const playerTwoNameLabel = document.getElementById("player-two-name-bar")
    playerTwoNameLabel.style.display = 'none'
    playerTwoTextBox.style.display = 'none'
    playerTwoSubmitButton.style.display = 'none'

    if (playerTwoName === ""){
        playerTwoName = "Yellow Player"

    } if (playerOneName === ""){
        playerOneName = "Red Player"
    }

    updateNameAndScore()
}

function changeCellColour(){
    if (gameStarted){
        for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
            for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
                const cell = document.getElementById(`row-${rowIndex}-column-${columnIndex}`)
                cell.style.backgroundColor = "rgb(255, 255, 255)"
            }
        } 
    } 
}

// Bind the click event for the start button.
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startClick);


//Start game click function
function humanVsHumanOptionClick(event) {
    if (!computer){
        human = true
        console.log("I was clicked!!")
        console.log("Huuummmaaannnn")
        humanVsHumanOptionButton.style.backgroundColor = "rgb(80, 220, 100)"
        const playersOnScreenTitles = document.getElementById("players-container")
        playersOnScreenTitles.style.display = "flex"
        const start = document.getElementById("start-button")
        start.style.display = "inline-block"
        // gameStarted = true
        // changeCellColour()
    } else{
        return
    }
}

function humanVsComputerOptionClick(event) {
    if (!human){
        computer = true
        console.log("I was clicked!!")
        console.log("Compuuuuuteerrr")
        humanVsComputerOptionButton.style.backgroundColor = "rgb(80, 220, 100)"
        const playersOnScreenTitles = document.getElementById("players-container")
        playersOnScreenTitles.style.display = "flex"
        const start = document.getElementById("start-button")
        start.style.display = "inline-block"
        // gameStarted = true
        // changeCellColour()
    } else {
        return
    }
}

// Bind the click event for the player vs player button.
const humanVsHumanOptionButton = document.getElementById("player-player-option-button");
humanVsHumanOptionButton.addEventListener("click", humanVsHumanOptionClick);

// Bind the click event for the player vs computer button.
const humanVsComputerOptionButton = document.getElementById("player-computer-option-button");
humanVsComputerOptionButton.addEventListener("click", humanVsComputerOptionClick);



function submitPlayerOneName(event) {
    console.log("I was clicked!! P1")
    const submitButton = document.getElementById("submit-button-player-one")
    const playerOneTextBox = document.getElementById("player-one-name-box")
    playerOneName = playerOneTextBox.value
    const playerOneNameLabel = document.getElementById("player-one-name-bar")
    
    // playerOneNameLabel.style.display = 'none'
    playerOneTextBox.style.backgroundColor = 'rgb(80, 220, 100)'
    // submitButton.style.display = 'none'
    console.log(playerOneTextBox.value)

    // playersNameBox.innerText = `${playerOneName}: ${playerOneScore} |  ${playerTwoName}: ${playerTwoScore}`

}

// Bind the click event for the player vs player button.
const playerOneNameSubmitButton = document.getElementById("submit-button-player-one");
playerOneNameSubmitButton.addEventListener("click", submitPlayerOneName);



function submitPlayerTwoName(event) {
    console.log("I was clicked!! P2")
    const submitButton = document.getElementById("submit-button-player-two")
    const playerTwoTextBox = document.getElementById("player-two-name-box")
    playerTwoName = playerTwoTextBox.value
    
    const playerTwoNameLabel = document.getElementById("player-two-name-bar")
    // playerTwoNameLabel.style.display = 'none'
    playerTwoTextBox.style.backgroundColor = 'rgb(80, 220, 100)'
    // submitButton.style.display = 'none'


    console.log(playerTwoTextBox.value)

    
}

// Bind the click event for the player vs player button.
const playerTwoNameSubmitButton = document.getElementById("submit-button-player-two");
playerTwoNameSubmitButton.addEventListener("click", submitPlayerTwoName)


function updateNameAndScore(){
    const playersNameBox = document.getElementById("player-scores-box")
    playersNameBox.style.display = "inline-flex"
    playersNameBox.innerText = `${playerOneName}: ${playerOneScore} |  ${playerTwoName}: ${playerTwoScore}`
}

function hideNameAndScore(){
    const playersNameBox = document.getElementById("player-scores-box")
    playersNameBox.style.display = "none"
    playersNameBox.innerText = ``


       //changes to player one 
       console.log("I was clicked!! P1")
       const playerOneSubmitButton = document.getElementById("submit-button-player-one")
       const playerOneTextBox = document.getElementById("player-one-name-box")
       const playerOneNameLabel = document.getElementById("player-one-name-bar")
       playerOneNameLabel.style.display = 'inline-block'
       playerOneTextBox.style.backgroundColor = ''
       playerOneTextBox.style.display = 'inline-block'
       
       playerOneSubmitButton.style.display = 'inline-block'
   
   
       //changes to player two
       const playerTwoSubmitButton = document.getElementById("submit-button-player-two")
       const playerTwoTextBox = document.getElementById("player-two-name-box")
       const playerTwoNameLabel = document.getElementById("player-two-name-bar")
       playerTwoNameLabel.style.display = 'inline-block'
       playerTwoTextBox.style.display = 'inline-block'
       playerTwoTextBox.style.backgroundColor = ''
       playerTwoSubmitButton.style.display = 'inline-block'
}


if (typeof exports === 'object') {
    console.log("Running in Node")
    // Node. Does not work with strict CommonJS, but only CommonJS-like 
    // environments that support module.exports, like Node.
    module.exports = {
        clearBoard,
        drawBoard,
        isValidRowOrColumn,
        isValidColumn,
        positionClick,
        resetClick,
    }
} else {
    console.log("Running in Browser")
}
