const {
    resetBoard
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
        const actualOutput = resetBoard()

        //assert
        expect(actualOutput).toScrictEqual(expectedOutput)
    })
})