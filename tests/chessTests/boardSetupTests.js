const assert = require('assert');
const { Board } = require('../../board.js');

describe('Board Setup Tests', () => {
    let board;

    beforeEach(() => {
        board = new Board();
    });

    describe('Initial Layout', () => {
        it('should have correct corner setup according to Amendment #1', () => {
            // Check black pieces in top-left corner
            assert(board.squares[0][0] instanceof Pawn && board.squares[0][0].color === 'black');
            assert(board.squares[0][1] instanceof Pawn && board.squares[0][1].color === 'black');
            assert(board.squares[1][0] instanceof Rook && board.squares[1][0].color === 'black');
            assert(board.squares[1][1] instanceof Knight && board.squares[1][1].color === 'black');
            assert(board.squares[2][0] instanceof King && board.squares[2][0].color === 'black');
            assert(board.squares[2][1] instanceof Bishop && board.squares[2][1].color === 'black');

            // Check white pieces in bottom-right corner
            assert(board.squares[7][6] instanceof Pawn && board.squares[7][6].color === 'white');
            assert(board.squares[7][7] instanceof Pawn && board.squares[7][7].color === 'white');
            assert(board.squares[6][6] instanceof Knight && board.squares[6][6].color === 'white');
            assert(board.squares[6][7] instanceof Rook && board.squares[6][7].color === 'white');
            assert(board.squares[5][6] instanceof Bishop && board.squares[5][6].color === 'white');
            assert(board.squares[5][7] instanceof Queen && board.squares[5][7].color === 'white');
        });

        it('should have pawns in correct positions', () => {
            // Check additional pawns
            assert(board.squares[0][6] instanceof Pawn && board.squares[0][6].color === 'black');
            assert(board.squares[0][7] instanceof Pawn && board.squares[0][7].color === 'black');
            assert(board.squares[7][0] instanceof Pawn && board.squares[7][0].color === 'white');
            assert(board.squares[7][1] instanceof Pawn && board.squares[7][1].color === 'white');
        });

        it('should have empty squares in the middle', () => {
            // Check some middle squares are empty
            for (let i = 3; i < 5; i++) {
                for (let j = 0; j < 8; j++) {
                    assert(board.squares[i][j] === null);
                }
            }
        });
    });
});
