const {
    resetBoard,
    playAgainParameterReset,
    horizontalWinnerCheck,
    verticalWinnerCheck,
    diagonalWinnerCheck
} = require('./Connect4');

// import {playAgainParameterReset} from ('./Connect4Test')

describe("When resetting the board ", () => {
    test("The board should return a board full of nulls (empty board)", () => {
        //arrange
        let board = [[null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null], 
                    [null, null, null, null, null, null, null],
                    [null, null, null, null, null, null, null],
                    ["red", "yellow", null, null, null, null, null],
                    ["red", "yellow", "red", "yellow", null, null, null]]


        expectedOutput = [[null, null, null, null, null, null, null], 
                            [null, null, null, null, null, null, null], 
                            [null, null, null, null, null, null, null],
                            [null, null, null, null, null, null, null],
                            [null, null, null, null, null, null, null],
                            [null, null, null, null, null, null, null]]

        //act
        const actualOutput = resetBoard(board)

        //assert
        expect(actualOutput).toStrictEqual(expectedOutput)
    })
})


describe("When resetting the parameters", () => {
    test(`The current player should be player one, game over should be false and the game
    scores should be returned to zero `, () => {
        //arrange
        let playerOne = "red"
        let playerTwo = "yellow"
        let currentPlayer = playerTwo
        let gameOver = true
        let playerOneGameCount = 10
        let playerTwoGameCount = 5

        //Expected output
        const expectedPlayer = playerOne
        const expectedGameOver = false
        const expectedPlayerOneGameCount = 0
        const expectedPlayerTwoGameCount = 0

        //act
        // const actualOutput = resetBoard()
        const actualPlayAgainOutput = playAgainParameterReset()

        //assert
        actualPlayAgainOutput
        expect(currentPlayer).toStrictEqual(expectedPlayer)
        expect(gameOver).toStrictEqual(expectedGameOver)
        expect(playerOneGameCount).toStrictEqual(expectedPlayerOneGameCount)
        expect(playerTwoGameCount).toStrictEqual(expectedPlayerTwoGameCount)

    })
})

// describe("When checking for a winner", () => {
//     let playerOne = "red"
//     let playerTwo = "yellow"
//     let currentPlayer = playerOne
//     let gameOver = false
//     let count = 0
//     let board = [[null, null, null, null, null, null, null], 
//                 [null, null, null, null, null, null, null], 
//                 [null, null, null, null, null, null, null],
//                 [null, null, null, null, null, null, null],
//                 [null, null, null, null, null, null, null],
//                 [null, null, null, null, null, null, null]]

//     test(`The horizontal check should check return nothing if the board is null`, () => {
//         //arrange
//         board = [[null, null, null, null, null, null, null], 
//                 [null, null, null, null, null, null, null], 
//                 [null, null, null, null, null, null, null],
//                 [null, null, null, null, null, null, null],
//                 [null, null, null, null, null, null, null],
//                 [null, null, null, null, null, null, null]]
        
//         //Expected output
//         const expectedOutput = undefined

//         //act
//         const actualHorizontalCheckResult = horizontalWinnerCheck()

//         //assert
//         expect(actualHorizontalCheckResult).toStrictEqual(expectedOutput)
//     })

//     test(`The horizontal check should check that it returns red if four reds are in a row
//     and game over should be set to true`, () => {

//         //arrange
//         currentPlayer = playerOne
//         board = [[null, null, null, null, null, null, null], 
//                 [null, null, null, null, null, null, null], 
//                 [null, null, null, null, null, null, null],
//                 [null, null, null, null, null, null, null],
//                 [null, null, null, null, null, null, null],
//                 ["red", "red", "red", "red", null, null]]
//         count = 0
        
//         //Expected output
//         const expectedOutput = "red"
//         const expectedGameOver = true
//         const expectedCount = 4

//         //act
//         const actualHorizontalCheckResult = horizontalWinnerCheck()

//         //assert
//         // actualHorizontalCheckResult
//         expect(actualHorizontalCheckResult).toStrictEqual(expectedOutput)
//         // expect(count).toStrictEqual(expectedCount)
//         // expect(gameOver).toStrictEqual(expectedGameOver)
        
        
//     })

//     // test(`The horizontal check should check return yellow if four yellow are in a row`, () => {
//     //     //arrange
//     //     currentPlayer = playerTwo
//     //     board = [[null, null, null, null, null, null, null], 
//     //             [null, null, null, null, null, null, null], 
//     //             [null, null, null, null, null, null, null],
//     //             [null, null, null, null, null, null, null],
//     //             [null, null, null, null, null, null, null],
//     //             ["yellow", "yellow", "yellow", "yellow", null, null, null]]
        
//     //     //Expected output
//     //     const expectedOutput = "red"

//     //     //act
//     //     const actualHorizontalCheckResult = horizontalWinnerCheck()

//     //     //assert
//     //     expect(actualHorizontalCheckResult).toStrictEqual(expectedOutput)
//     // })
// })