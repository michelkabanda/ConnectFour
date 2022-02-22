// This file contains helper code beyond the first week "Intro to JavaScript" course content.
// You should not have to make any changes in this file to get your game working.

// Clear down the elements drawn on the board.
function clearBoard() {
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
            console.log("Working")
            //document.getElementById(`row-${rowIndex}-column-${columnIndex}`).innerHTML = ""
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).style.backgroundColor = "white"
        }
    }
}

// Populate the grid with images based on the board state.
function drawBoard(board) {
    console.log(board)
    clearBoard();
    for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
        for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
            if (!board[rowIndex][columnIndex]) {
                //document.getElementById(`row-${rowIndex}-column-${columnIndex}`).style.backgroundColor = "white"
                continue;
            }
            //document.getElementById(`row-${rowIndex}-column-${columnIndex}`).innerText = cellText;
            const cellText = board[rowIndex][columnIndex] === "red" ? "red" : "yellow";
            //const cellText = board[rowIndex][columnIndex] === "red" ? "⭕" : "❌";
            document.getElementById(`row-${rowIndex}-column-${columnIndex}`).style.backgroundColor = cellText
            //document.getElementById(`row-${rowIndex}-column-${columnIndex}`).style.innerText = cellText
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
        const winnerDisplay = document.getElementById("winner-display");
        winnerDisplay.innerText = `The winner is ${winner}`;
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
    clearBoard()
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
    console.log("The mouse went over me")
    console.log(`Row ${row}, Column: ${column}`)
    console.log(`[${row},${column}]`)
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

// Bind the mouse over a cell events for the grid.
for (let rowIndex = 0; rowIndex < 6; rowIndex++) {
    for (let columnIndex = 0; columnIndex < 7; columnIndex++) {
        const mouseOverGridCell = document.getElementById(`row-${rowIndex}-column-${columnIndex}`)
        mouseOverGridCell.addEventListener("mouseover", mouseOverCellHighlight.bind(null, rowIndex, columnIndex));
    }
} 

function mouseOutCellRemoveHighlight(row,column){
    console.log("The mouse went out of me")
    console.log(`Row ${row}, Column: ${column}`)
    console.log(`[${row},${column}]`)
    for (rowIndex = 0; rowIndex < board.length; rowIndex++){
        const MouseOutOfColour = document.getElementById(`row-${rowIndex}-column-${column}`)
        console.log(board[rowIndex][column])
        if (board[rowIndex][column] === null){
            MouseOutOfColour.style.backgroundColor = ""
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
