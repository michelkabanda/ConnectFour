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

describe("When checking for a winner using a the horizontal check", () => {
    let playerOne = "red"
    let playerTwo = "yellow"
    let setCurrentPlayer = playerOne
    let boardToCheck = [[null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]]

    test(`The horizontal check should check return nothing if the board is null`, () => {
        //arrange
        setCurrentPlayer = playerTwo
        boardToCheck = [[null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],]

        //Expected output
        const expectedOutput = undefined

        //act
        const actualHorizontalCheckResult = horizontalWinnerCheck(boardToCheck, setCurrentPlayer)

        //assert
        expect(actualHorizontalCheckResult).toStrictEqual(expectedOutput)
    })

    test(`The horizontal check should check that it returns red if four reds are in a row
    and game over should be set to true`, () => {

        //arrange
        setCurrentPlayer = playerOne
        let boardToTest = [[null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        ["red", "red", "red", "red", null, null]]

        //Expected output
        const expectedOutput = "red"

        //act
        const actualHorizontalCheckResult = horizontalWinnerCheck(boardToTest, setCurrentPlayer)

        //assert
        // actualHorizontalCheckResult
        expect(actualHorizontalCheckResult).toStrictEqual(expectedOutput)

    })

    test(`The horizontal check should check return yellow if four yellow are in a row`, () => {
        //arrange
        setCurrentPlayer = playerTwo
        boardToTest = [[null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        ["yellow", "yellow", "yellow", "yellow", null, null, null]]

        //Expected output
        const expectedOutput = "yellow"

        //act
        const actualHorizontalCheckResult = horizontalWinnerCheck(boardToTest, setCurrentPlayer)

        //assert
        expect(actualHorizontalCheckResult).toStrictEqual(expectedOutput)
    })

    test(`The horizontal check should check return undefined if there are three yellows followed
     by a space followed by a yellow`, () => {
        //arrange
        setCurrentPlayer = playerTwo
        boardToTest = [[null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        ["yellow", "yellow", "yellow", null, "yellow", null, null]]

        //Expected output
        const expectedOutput = undefined

        //act
        const actualHorizontalCheckResult = horizontalWinnerCheck(boardToTest, setCurrentPlayer)

        //assert
        expect(actualHorizontalCheckResult).toStrictEqual(expectedOutput)
    })

    test(`The horizontal check should check return undefined if there are three reds followed
     by a space followed by a red`, () => {
        //arrange
        setCurrentPlayer = playerOne
        boardToTest = [[null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        ["red", "red", "red", null, "red", null, null]]

        //Expected output
        const expectedOutput = undefined

        //act
        const actualHorizontalCheckResult = horizontalWinnerCheck(boardToTest, setCurrentPlayer)

        //assert
        expect(actualHorizontalCheckResult).toStrictEqual(expectedOutput)
    })

    test(`The horizontal check should check return undefined if there is one red followed
    by three reds on the following row`, () => {
        //arrange
        setCurrentPlayer = playerOne
        boardToTest = [[null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, "red"],
        ["red", "red", "red", null, null, null, null]]

        //Expected output
        const expectedOutput = undefined

        //act
        const actualHorizontalCheckResult = horizontalWinnerCheck(boardToTest, setCurrentPlayer)

        //assert
        expect(actualHorizontalCheckResult).toStrictEqual(expectedOutput)
    })

    test(`The horizontal check should check return undefined if there is one yellow followed
    by three yellows on the following row`, () => {
        //arrange
        setCurrentPlayer = playerTwo
        boardToTest = [[null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, "yellow"],
        ["yellow", "yellow", "yellow", null, null, null, null]]

        //Expected output
        const expectedOutput = undefined

        //act
        const actualHorizontalCheckResult = horizontalWinnerCheck(boardToTest, setCurrentPlayer)

        //assert
        expect(actualHorizontalCheckResult).toStrictEqual(expectedOutput)
    })

    test(`The horizontal check should return undefined if the board 
    has four vertical yellows in a row `, () => {
        //arrange
        setCurrentPlayer = playerTwo
        boardToTest = [[null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        ["yellow", null, null, null, null, null, null],
        ["yellow", null, null, null, null, null, null],
        ["yellow", null, null, null, null, null, null],
        ["yellow", "yellow", "yellow", null, null, null, null]]

        //Expected output
        const expectedOutput = undefined

        //act
        const actualHorizontalCheckResult = horizontalWinnerCheck(boardToTest, setCurrentPlayer)

        //assert
        expect(actualHorizontalCheckResult).toStrictEqual(expectedOutput)
    })

    test(`The horizontal check should return undefined if the board 
    has four vertical reds in a row `, () => {
        //arrange
        setCurrentPlayer = playerOne
        boardToTest = [[null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        ["reds", null, null, null, null, null, null],
        ["reds", null, null, null, null, null, null],
        ["reds", null, null, null, null, null, null],
        ["reds", "reds", "reds", null, null, null, null]]

        //Expected output
        const expectedOutput = undefined

        //act
        const actualHorizontalCheckResult = horizontalWinnerCheck(boardToTest, setCurrentPlayer)

        //assert
        expect(actualHorizontalCheckResult).toStrictEqual(expectedOutput)
    })
})

describe("When checking for a winner using a the vertical check", () => {
    let playerOne = "red"
    let playerTwo = "yellow"
    let setCurrentPlayer = playerOne
    let boardToCheck = [[null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null]]

    test(`The vertical check should check return nothing if the board is null`, () => {
        //arrange
        setCurrentPlayer = playerTwo
        boardToCheck = [[null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],]

        //Expected output
        const expectedOutput = undefined

        //act
        const actualHorizontalCheckResult = verticalWinnerCheck(boardToCheck, setCurrentPlayer)

        //assert
        expect(actualHorizontalCheckResult).toStrictEqual(expectedOutput)
    })

    test(`The vertical check should check that it returns red if four reds are in a row
    and game over should be set to true`, () => {

        //arrange
        setCurrentPlayer = playerOne
        let boardToTest = [[null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        ["red", "red", "red", "red", null, null]]

        //Expected output
        const expectedOutput = "red"

        //act
        const actualHorizontalCheckResult = verticalWinnerCheck(boardToTest, setCurrentPlayer)

        //assert
        // actualHorizontalCheckResult
        expect(actualHorizontalCheckResult).toStrictEqual(expectedOutput)

    })

    test(`The vertical check should check return yellow if four yellow are in a row`, () => {
        //arrange
        setCurrentPlayer = playerTwo
        boardToTest = [[null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        [null, null, null, null, null, null, null],
        ["yellow", "yellow", "yellow", "yellow", null, null, null]]

        //Expected output
        const expectedOutput = "yellow"

        //act
        const actualHorizontalCheckResult = horizontalWinnerCheck(boardToTest, setCurrentPlayer)

        //assert
        expect(actualHorizontalCheckResult).toStrictEqual(expectedOutput)
    })
})