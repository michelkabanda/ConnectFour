// Bind the click event for the reset button.
const playAgainButton = document.getElementById("play-again-button");
playAgainButton.addEventListener("click", playAgainResetClick);

// Bind the click event for the reset button.
const resetButton = document.getElementById("reset-button");
resetButton.addEventListener("click", resetClick);

// Bind the click event for the instructions button.
const instructionsButton = document.getElementById("instructions-button");
instructionsButton.addEventListener("click", instructionsClick);

// Bind the click event for the start button.
const startButton = document.getElementById("start-button");
startButton.addEventListener("click", startClick);

// Bind the click event for the player vs player button.
const humanVsHumanOptionButton = document.getElementById("player-player-option-button");
humanVsHumanOptionButton.addEventListener("click", humanVsHumanOptionClick);

// Bind the click event for the player vs computer button.
const humanVsComputerOptionButton = document.getElementById("player-computer-option-button");
humanVsComputerOptionButton.addEventListener("click", humanVsComputerOptionClick);

// Set the submit button functionality for player one 
const playerOneNameSubmitButton = document.getElementById("submit-button-player-one");
playerOneNameSubmitButton.addEventListener("click", submitPlayerOneName);

// Set the submit button functionality for player two.
const playerTwoNameSubmitButton = document.getElementById("submit-button-player-two");
playerTwoNameSubmitButton.addEventListener("click", submitPlayerTwoName)


// Bind the click events for the grid including clicks, mouse over and mouse out of positions.
for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        const gridPosition = document.getElementById(`row-${rowIndex}-column-${columnIndex}`)
        gridPosition.addEventListener("click", positionClick.bind(null, rowIndex, columnIndex));
        gridPosition.addEventListener("mouseover", mouseOverCellHighlight.bind(null, rowIndex, columnIndex));
        gridPosition.addEventListener("mouseout", mouseOutCellRemoveHighlight.bind(null, rowIndex, columnIndex));
    }
}


// Clear down the elements drawn on the board.
function clearBoard() {
    if (gameStarted) {
        for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
            for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
                console.log("Working")
                document.getElementById(`row-${rowIndex}-column-${columnIndex}`).style.backgroundColor = "white"
            }
        }
    } else {
        for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
            for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
                console.log("Working")
                document.getElementById(`row-${rowIndex}-column-${columnIndex}`).style.backgroundColor = "rgb(100, 100, 100)"
            }
        }
    }
}

// Populate the grid with images based on the board state.
function drawBoard(board) {
    if (gameStarted){
        console.log(board)
        clearBoard();
        for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
            for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
                if (!board[rowIndex][columnIndex]) {
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
    drawBoard(board);
}


function mouseOverCellHighlight(row,column){
    if (gameStarted){
        for (rowIndex = 0; rowIndex < board.length; rowIndex++){
            const mouseOverColour = document.getElementById(`row-${rowIndex}-column-${column}`)
            if (board[rowIndex][column] === null){
                if (!gameOver){
                    if (currentPlayer === playerOne){
                        mouseOverColour.style.backgroundColor = "rgba(255, 0, 0, 0.6)"
                    } else {
                        mouseOverColour.style.backgroundColor = "rgba(255, 255, 0, 0.6)"
                    }
                }
            }
        }
    }
}


function mouseOutCellRemoveHighlight(row,column){
    if (gameStarted){
        for (rowIndex = 0; rowIndex < board.length; rowIndex++){
            const mouseOutOfColour = document.getElementById(`row-${rowIndex}-column-${column}`)
            if (board[rowIndex][column] === null){
                mouseOutOfColour.style.backgroundColor = "white"
            }
        }
    }
}


function displayWinner(){
    const winner = checkWinner();
    console.log(`I am ${winner}`)
    if (winner) {
        if (typeof winner !== "string" || !["red", "yellow", "nobody"].includes(winner)) {
            throw "Expecting 'checkWinner' to return null or one of the strings 'red', 'yellow' or 'nobody'. Actually received: " + winner;
        }
        const winnerDisplay = document.getElementById("winner-display");
        if (winner === "red"){
            playerOneScore += 1
            winnerDisplay.innerText = `The winner is ${playerOneName} with ${playerOneGameCount} moves!`;

        } else if (winner === "yellow"){
            playerTwoScore += 1
            winnerDisplay.style.color = "black"
            winnerDisplay.innerText = `The winner is ${playerTwoName} with ${playerTwoGameCount} moves!`;
        } else {
            winnerDisplay.innerText = `The game ended in a draw!`;
        }
        winnerDisplay.style.display = "block";
        winnerDisplay.style.backgroundColor = winner;
        if (winner !== "nobody"){
            winnerDisplay.style.backgroundColor = winner;
        } else {
            winnerDisplay.style.backgroundColor = "black"
        } 
    } updateNameAndScore()
}

//Sets the grid colour to white once the game starts
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

// The reset button was clicked, call the game's reset function then reset the DOM.
function resetClick(event) {
    resetGame();
    const winnerDisplay = document.getElementById("winner-display");
    winnerDisplay.innerText = "";
    winnerDisplay.style.display = "None";
    humanVsHumanOptionButton.style.backgroundColor = ""
    humanVsComputerOptionButton.style.backgroundColor = ""
    clearBoard()
    hideScoreboardShowNames()
    console.log("The board was cleared")

}

// The reset button was clicked, call the game's reset function then reset the DOM.
function playAgainResetClick(event) {
    if (gameStarted){
        playAgain();
        playerTurnDisplay()
        const winnerDisplay = document.getElementById("winner-display");
        winnerDisplay.innerText = "";
        winnerDisplay.style.display = "None";
        clearBoard()
        console.log("The board was cleared")
    } 
}

//The instructions button was clicked call change the display of the instructions
//to block if display === none or none if display === block
function instructionsClick(event) {
    const instructions = document.getElementById("instructions")
    if (instructions.style.display === ""){
        console.log("Changed the display to block")
        instructions.style.display = "block"
        console.log(instructions.style.display)
    } else {
        console.log("Changed the display to none")
        instructions.style.display = ""
        console.log(instructions.style.display)

    }
}

//Start game click function
function startClick(event) {
    const start = document.getElementById("start-button")
    const playerVsPlayerOption = document.getElementById("player-player-option-button")
    const playerVsComputerOption = document.getElementById("player-computer-option-button")
    start.style.display = "none"
    gameStarted = true
    changeCellColour()

    //Make changes to player one submit, text box and name elements
    const playerOneSubmitButton = document.getElementById("submit-button-player-one")
    const playerOneTextBox = document.getElementById("player-one-name-box")
    const playerOneNameLabel = document.getElementById("player-one-name-bar")
    playerOneNameLabel.style.display = 'none'
    playerOneTextBox.style.display = 'none'
    playerOneSubmitButton.style.display = 'none'


    //Make changes to player two submit, text box and name elements
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

    playerTurnDisplay()
    updateNameAndScore()
}


//Enable the human vs human option click 
function humanVsHumanOptionClick(event) {
    if (!computer){
        human = true
        humanVsHumanOptionButton.style.backgroundColor = "rgb(80, 220, 100)"
        const playersOnScreenTitles = document.getElementById("players-container")
        playersOnScreenTitles.style.display = "flex"
        const start = document.getElementById("start-button")
        start.style.display = "inline-block"
    } else{
        return
    }
}


//Enable the human vs computer option click
function humanVsComputerOptionClick(event) {
    if (!human){
        computer = true
        humanVsComputerOptionButton.style.backgroundColor = "rgb(80, 220, 100)"
        const playersOnScreenTitles = document.getElementById("players-container")
        playersOnScreenTitles.style.display = "flex"
        const start = document.getElementById("start-button")
        start.style.display = "inline-block"
    } else {
        return
    }
}

//Function to submit the player name to the scoreboard
function submitPlayerOneName(event) {
    console.log("I was clicked!! P1")
    const playerOneTextBox = document.getElementById("player-one-name-box")
    playerOneTextBox.style.backgroundColor = 'rgb(80, 220, 100)'
    playerOneName = playerOneTextBox.value
    console.log(playerOneTextBox.value)
}


function submitPlayerTwoName(event) {
    console.log("I was clicked!! P2")
    const playerTwoTextBox = document.getElementById("player-two-name-box")
    playerTwoTextBox.style.backgroundColor = 'rgb(80, 220, 100)'
    playerTwoName = playerTwoTextBox.value
    console.log(playerTwoTextBox.value)
}

//Update the on-screen names and the scores
function updateNameAndScore(){
    const playersNameBox = document.getElementById("player-scores-box")
    playersNameBox.style.display = "inline-flex"
    playersNameBox.innerText = `${playerOneName}: ${playerOneScore} |  ${playerTwoName}: ${playerTwoScore}`
    
    if (human){
        const playersTurn = document.getElementById("player-turn")
        playersTurn.style.display = "inline-flex"
    }  
}

function playerTurnDisplay(){
    const playersTurn = document.getElementById("player-turn")
    playersTurn.style.backgroundColor = currentPlayer
    if (gameOver){
        playersTurn.style.backgroundColor = "white"
        playersTurn.style.color = "black"
        playersTurn.innerText = `The Game is Over!`
    } else if (currentPlayer === playerOne){
        playersTurn.style.color = "white"
        playersTurn.innerText = `It is ${playerOneName}'s turn!`
    } else {
        playersTurn.style.color = "black"
        playersTurn.innerText = `It is ${playerTwoName}'s turn!`
    }
}

//function to hide player turn
function hidePlayerTurn(){
    const playersTurn = document.getElementById("player-turn")
    playersTurn.style.display = ""
}

//Function to hide the names and scores 
function hideScoreboardShowNames(){
    const playersNameBox = document.getElementById("player-scores-box")
    playersNameBox.style.display = "none"
    playersNameBox.innerText = ``

    hidePlayerTurn()

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
