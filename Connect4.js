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
let playerOneGameCount = 0
let playerTwoGameCount = 0


//Return the current board state with either a "red" or a "yellow" in
//each position. Put a null in a position that hasn't been played yet.
function getBoard() {
    console.log("getBoard was called");
    return board
}

// Take the row and column number between 0 and 2 
// (inclusive) and update the game state.
function takeTurn(row, column) {
    console.log("takeTurn was called with row: " + row + ", column:" + column);
    if (gameOver === true) {
        console.log(`The game is over`)
        return
    }
    if (gameStarted) {
        let bottomRowIndex = -1
        for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
            if (!board[rowIndex][column]) {
                bottomRowIndex = rowIndex
            } else {
                continue
            }
        }
        console.log(`takeTurn found empty row ${bottomRowIndex} for column ${column}`)
        if (bottomRowIndex >= 0) {
            board[bottomRowIndex][column] = currentPlayer
            console.log(`takeTurn set row ${bottomRowIndex} for column ${column} to player ${currentPlayer}`)
        } else {
            console.log(`takeTurn column ${column} is full`)
        }

        swapPlayerTurns()
    }
}

//Swap the players and updates their move counts
function swapPlayerTurns() {
    if (currentPlayer === playerOne) {
        console.log(`The player is ${currentPlayer}`)
        playerOneGameCount += 1
        console.log(`${playerOneName}'s ${playerOneGameCount} move`)
        displayWinner()
        currentPlayer = playerTwo
        playerTurnDisplay()
        console.log(`The player is ${currentPlayer}`)
        computerPlayer()

    } else if (currentPlayer === playerTwo) {
        console.log(`The player is ${currentPlayer}`)
        playerTwoGameCount += 1
        console.log(`${playerTwoName}'s ${playerTwoGameCount} move`)
        displayWinner()
        currentPlayer = playerOne
        playerTurnDisplay()
        console.log(`The player is ${currentPlayer}`)
    }
}

//Function to initialize and set the computer player
function computerPlayer() {
    if (computer) {
        if (currentPlayer === playerTwo) {
            const randomRow = Math.floor(Math.random() * board.length)
            const randomColumn = Math.floor(Math.random() * board[0].length)
            takeTurn(randomRow, randomColumn)
        }
    } else {
        return
    }
}

//Function which resets the game board and returns it
function resetBoard(boardToReset) {
    boardToReset = [[null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]]
    return boardToReset
}

//Function which resets the play again parameters
function playAgainParameterReset() {
    currentPlayer = playerOne
    gameOver = false
    playerOneGameCount = 0
    playerTwoGameCount = 0
}

//Function to reset the board only
function playAgain() {
    console.log("The game was reset");
    console.log("Current player is red")
    playAgainParameterReset()
    board = resetBoard(board)
    console.log("The board state is now ready")
    console.log(board)
}

//Set the game state back to its original state to restart the game
function fullGameParameterReset() {
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
    board = resetBoard(board)
    console.log("The board state is now ready")
    console.log(board)
}

//Returns red or yellow if a winner was found or draw if the game ends in a draw
function checkWinner() {
    console.log("checkWinner was called");
    const horizontalWin = horizontalWinnerCheck(board, currentPlayer)
    const verticalWin = verticalWinnerCheck(board, currentPlayer)
    const diagonalWin = diagonalWinnerCheck(board, currentPlayer)
    const draw = drawGame(board)
    if (horizontalWin !== undefined) {
        return horizontalWin
    } else if (verticalWin !== undefined) {
        return verticalWin
    } else if (diagonalWin !== undefined) {
        return diagonalWin
    } else {
        return draw
    }
}

//Checks the grid for a horizontal winner
function horizontalWinnerCheck(boardToCheck, currentPlayerToCheck) {
    let count = 0
    //Check horizontal for winner
    for (rowIndex = 0; rowIndex < boardToCheck.length; rowIndex++) {
        for (columnIndex = 0; columnIndex < boardToCheck[0].length; columnIndex++) {
            if (boardToCheck[rowIndex][columnIndex] === currentPlayerToCheck) {
                count += 1
                if (count >= 4) {
                    gameOver = true
                    console.log(`The winner is ${currentPlayerToCheck}`)
                    return currentPlayerToCheck
                } else {
                    continue
                }
            } else {
                count = 0
            }
        } 
        count = 0
    }

}

//Checks the grid for a vertical winner
function verticalWinnerCheck(boardToCheck, currentPlayerToCheck) {
    //Check Vertical
    let count = 0
    for (columnIndex = 0; columnIndex < boardToCheck[0].length; columnIndex++) {
        for (rowIndex = 0; rowIndex < boardToCheck.length; rowIndex++) {
            if (boardToCheck[rowIndex][columnIndex] === currentPlayerToCheck) {
                count += 1
                if (count >= 4) {
                    gameOver = true
                    console.log(`The winner is ${currentPlayerToCheck}`)
                    return currentPlayerToCheck
                } else {
                    continue
                }
            } else {
                count = 0
            }
        } count = 0
    }
}

//Checks the grid for a diagonal winner
function diagonalWinnerCheck(boardToCheck, currentPlayerToCheck) {
    //Check Upper left Diagonal
    for (columnIndex = 0; columnIndex < boardToCheck[0].length; columnIndex++) {
        for (rowIndex = 0; rowIndex < boardToCheck.length; rowIndex++) {
            //for (columnIndex = 0; columnIndex < board.length; columnIndex++) {
            try {
                if (boardToCheck[rowIndex][columnIndex] == currentPlayerToCheck &&
                    boardToCheck[rowIndex - 1][columnIndex - 1] == currentPlayerToCheck &&
                    boardToCheck[rowIndex - 2][columnIndex - 2] == currentPlayerToCheck &&
                    boardToCheck[rowIndex - 3][columnIndex - 3] == currentPlayerToCheck) {
                    gameOver = true
                    console.log(`The winner is ${currentPlayerToCheck} with a diagonal`)
                    return currentPlayerToCheck
                } else {
                    continue
                }
            } catch (TypeError) {
                console.error(`The position selected caused the error when checking for
                an upper left diagonal win: ${TypeError}`)
            }
        }
    }


    //Check Upper Right Diagonal
    for (columnIndex = 0; columnIndex < boardToCheck[0].length; columnIndex++) {
        for (rowIndex = 0; rowIndex < boardToCheck.length; rowIndex++) {
            try {
                if (boardToCheck[rowIndex][columnIndex] == currentPlayerToCheck &&
                    boardToCheck[rowIndex - 1][columnIndex + 1] == currentPlayerToCheck &&
                    boardToCheck[rowIndex - 2][columnIndex + 2] == currentPlayerToCheck &&
                    boardToCheck[rowIndex - 3][columnIndex + 3] == currentPlayerToCheck) {
                    gameOver = true
                    console.log(`The winner is ${currentPlayerToCheck} with a diagonal`)
                    playerOneScore += 1
                    return currentPlayerToCheck
                } else {
                    continue
                }
            } catch (TypeError) {
                console.error(`The position selected caused the error when checking for
                an upper right diagonal win: ${TypeError}`)
            }
        }
    }

}

//Checks the grid for a tie game
function drawGame(boardToCheck) {
    count = 0
    for (columnIndex = 0; columnIndex < 6; columnIndex++) {
        for (rowIndex = 0; rowIndex < 7; rowIndex++) {
            if (boardToCheck[columnIndex][rowIndex] === "red"
                || boardToCheck[columnIndex][rowIndex] === "yellow") {
                count += 1
                console.log(`The game count is: ${count}`)
                if (count >= 42) {
                    console.log('The game is over: Its a draw')
                    gameOver = true
                    return "nobody"
                }
            } else {
                return
            }
        }
    }
}

if (typeof exports === 'object') {
    console.log("Running in Node")
    // Node. Does not work with strict CommonJS, but only CommonJS-like 
    // environments that support module.exports, like Node.
    module.exports = {
        getBoard,
        takeTurn,
        swapPlayerTurns,
        computerPlayer,
        resetBoard,
        playAgainParameterReset,
        playAgain,
        fullGameParameterReset,
        resetGame,
        checkWinner,
        horizontalWinnerCheck,
        verticalWinnerCheck,
        diagonalWinnerCheck,
        drawGame,
    }
} else {
    console.log("Running in Browser")
}
