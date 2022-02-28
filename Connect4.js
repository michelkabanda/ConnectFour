//Connect Four Javascript File

//Creating a 6 by 7 board to hold the game state
let board = [[null, null, null, null, null, null, null], 
             [null, null, null, null, null, null, null], 
             [null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null]]

//Starting the required players p1 and p2
let playerOne = "red"
let playerTwo = "yellow"
let currentPlayer = playerOne
let human = false
let computer = false 
let gameOver = false
let gameStarted = false
let playerOneScore = 0 
let playerTwoScore = 0
let playerOneName = ""
let playerTwoName = ""


// Return the current board state with either a "red" or a "yellow" in
// each position. Put a null in a position that hasn't been played yet.
function getBoard() {
    console.log("getBoard was called");
    return board
}

// Take the row and column number between 0 and 2 
// (inclusive) and update the game state.
function takeTurn(row, column) {
    console.log("takeTurn was called with row: "+row+", column:"+column);
    //Check to see if the game isn't over yet and the chosen positions is valid. 
    if (gameOver === true){
        console.log(`The game is over`)
        return
    }
    
    //Check the column that was clicked on.
    //Find the bottom empty cell and place the counter in that cell.

    if (gameStarted){
        let bottomRowIndex = -1
        for (let rowIndex = 0; rowIndex < 6; rowIndex++){
            if (!board[rowIndex][column]){
                // console.log(`Row index is: ${rowIndex}`)
                // console.log(`Column index is: ${column}`)
                bottomRowIndex = rowIndex
                // console.log(`Bottom available index is: ${bottomRowIndex}`)
            } else {
                // console.log(`Column: ${column}, Row: ${row} is taken.`)
                continue
            }
        } 
        console.log(`takeTurn found empty row ${bottomRowIndex} for column ${column}`)
        if (bottomRowIndex >= 0){
            board[bottomRowIndex][column] = currentPlayer
            console.log(`takeTurn set row ${bottomRowIndex} for column ${column} to player ${currentPlayer}`)
        } else {
            console.log(`takeTurn column ${column} is full`)
        }

        //Now update the DOM to show the counter in the right place
        if (currentPlayer === playerOne) {
            console.log(`The player is ${currentPlayer}`)
            displayWinner()
            // console.log(`The current player is ${currentPlayer}`)
            currentPlayer = playerTwo
            console.log(`The player is ${currentPlayer}`)
            computerPlayer()
        } else if (currentPlayer === playerTwo){
            console.log(`The player is ${currentPlayer}`)
            displayWinner()
            currentPlayer = playerOne
            console.log(`The player is ${currentPlayer}`)
        }
    }
}

//Function to initialise and set the computer player
function computerPlayer(){
    if (computer){
        if (currentPlayer === playerTwo){
            const randomRow = Math.floor(Math.random() * board.length)
            const randomColumn = Math.floor(Math.random() * board[0].length)
            takeTurn(randomRow, randomColumn)
        }
    } else{
        return
    }
}

//Set the game state back to its original state to play another game.
function fullGameParameterReset(){
    playAgainParameterReset()
    gameStarted = false 
    human = false 
    computer = false
    playerOneScore = 0
    playerTwoScore = 0
}

//Function which resets the entire game including scores and names
function resetGame() {
    console.log("The game was reset completely");
    console.log("Current player is red")
    fullGameParameterReset()
    board = [[null, null, null, null, null, null, null], 
             [null, null, null, null, null, null, null], 
             [null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null]]
    console.log("The board state is now ready")
    console.log(board)
}

//Function which resets the play again parameters
function playAgainParameterReset(){
    currentPlayer = playerOne
    gameOver = false
}

//Function to reset the board only
function playAgain() {
    console.log("The game was reset");
    console.log("Current player is red")
    playAgainParameterReset()
    board = [[null, null, null, null, null, null, null], 
             [null, null, null, null, null, null, null], 
             [null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null],
             [null, null, null, null, null, null, null]]
    console.log("The board state is now ready")
    console.log(board)
}


// //Return either "reds", "cross" or "nobody" if the game is over.
// //Otherwise return null to continue playing.
function checkWinner() {
    console.log("checkWinner was called");

    let count = 0
    //Check horizontal for winner
    for (rowIndex = 0; rowIndex<board.length; rowIndex++){
        for (columnIndex = 0; columnIndex<board[0].length; columnIndex++){
            if (board[rowIndex][columnIndex] === currentPlayer){
                count+=1
                if (count >= 4) {
                    gameOver = true
                    console.log(`The winner is ${currentPlayer}`)
                    return currentPlayer
                } else{
                    continue
                }
            } else{
                count = 0
            }
        } count = 0
    }

    //Check Vertical
    for (columnIndex = 0; columnIndex<board[0].length; columnIndex++){
        for (rowIndex = 0; rowIndex<board.length; rowIndex++){
            if (board[rowIndex][columnIndex] === currentPlayer){
                count+=1
                if (count >= 4) {
                    gameOver = true
                    console.log(`The winner is ${currentPlayer}`)
                    return currentPlayer
                } else{
                    continue
                }
            } else{
                count = 0
            }
        } count = 0
    }
    
    //Check Upper left Diagonal
    for (columnIndex = 0; columnIndex < board[0].length; columnIndex++) {
        for(rowIndex = 0; rowIndex < board.length; rowIndex++) {
        //for (columnIndex = 0; columnIndex < board.length; columnIndex++) {
            try{
                if (board[rowIndex][columnIndex] == currentPlayer && 
                    board[rowIndex-1][columnIndex-1] == currentPlayer && 
                    board[rowIndex-2][columnIndex-2] == currentPlayer && 
                    board[rowIndex-3][columnIndex-3] == currentPlayer) {
                    gameOver = true
                    console.log(`The winner is ${currentPlayer} with a diagonal`)
                    return currentPlayer
                }  else {
                    continue
                }
            } catch(TypeError){
                console.error(`The position selected caused the error when checking for
                an upper left diagonal win: ${TypeError}`)
            }
        }
    }

    //Check Upper Right Diagonal
    for (columnIndex = 0; columnIndex < board [0].length; columnIndex++) {
        for(rowIndex = 0; rowIndex < board.length; rowIndex++) {
            try{
                if (board[rowIndex][columnIndex] == currentPlayer && 
                    board[rowIndex-1][columnIndex+1] == currentPlayer && 
                    board[rowIndex-2][columnIndex+2] == currentPlayer && 
                    board[rowIndex-3][columnIndex+3] == currentPlayer) {
                    gameOver = true
                    console.log(`The winner is ${currentPlayer} with a diagonal`)
                    playerOneScore += 1
                    return currentPlayer
                } else {
                    continue
                }
            } catch(TypeError){
                console.error(`The position selected caused the error when checking for
                an upper right diagonal win: ${TypeError}`)
            }
        }
    } 

    count = 0
    for (columnIndex = 0; columnIndex<6; columnIndex++) {
        for(rowIndex = 0; rowIndex<7; rowIndex++) {
            if (board[columnIndex][rowIndex] === "red" 
            || board[columnIndex][rowIndex] === "yellow"){
                count += 1
                console.log(`The game count is: ${count}`)
                if (count >= 42){
                    console.log('The game is over: Its a draw')
                    gameOver = true
                    return "nobody"

                }
            }
        }
    }

}

if (typeof exports === 'object') {
    console.log("Running in Node")
    // Node. Does not work with strict CommonJS, but only CommonJS-like 
    // environments that support module.exports, like Node.
    module.exports = {
        takeTurn,
        checkWinner,
        resetGame,
        getBoard,
        playAgain,
        playAgainParameterReset,
        fullGameParameterReset,
        playAgain,
        resetGame,
    }
} else {
    console.log("Running in Browser")
}
