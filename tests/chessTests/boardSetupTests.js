import assert from 'assert';
import { Board } from '../../board.js';
import { Pawn, Rook, Knight, Bishop, Queen, King } from '../../pieces.js';

describe('Board Setup Tests', () => {
    let board;

    beforeEach(() => {
        board = new Board();
    });

    describe('Initial Layout', () => {
        it('should have correct corner setup according to Amendment #1', () => {
            // Check black pieces (top three rows)
            assert(board.squares[0][0] instanceof King && board.squares[0][0].color === 'black');
            assert(board.squares[0][1] instanceof Bishop && board.squares[0][1].color === 'black');
            assert(board.squares[0][7] instanceof Queen && board.squares[0][7].color === 'black');
            
            assert(board.squares[1][0] instanceof Rook && board.squares[1][0].color === 'black');
            assert(board.squares[1][1] instanceof Knight && board.squares[1][1].color === 'black');
            assert(board.squares[1][7] instanceof Knight && board.squares[1][7].color === 'black');
            
            assert(board.squares[1][6] instanceof Rook && board.squares[1][7].color === 'black');
            assert(board.squares[0][6] instanceof Bishop && board.squares[0][6].color === 'black');

            // Check white pieces (bottom three rows)
            assert(board.squares[7][0] instanceof King && board.squares[7][0].color === 'white');
            assert(board.squares[7][1] instanceof Bishop && board.squares[7][1].color === 'white');
            assert(board.squares[7][7] instanceof Queen && board.squares[7][7].color === 'white');
            
            assert(board.squares[6][0] instanceof Rook && board.squares[6][0].color === 'white');
            assert(board.squares[6][1] instanceof Knight && board.squares[6][1].color === 'white');
            assert(board.squares[6][6] instanceof Knight && board.squares[6][7].color === 'white');
            
            assert(board.squares[5][7] instanceof Pawn && board.squares[5][7].color === 'white');
            assert(board.squares[5][6] instanceof Pawn && board.squares[5][6].color === 'white');
        });

        it('should have pawns in correct positions', () => {
            // Check black pawns
            assert(board.squares[0][2] instanceof Pawn && board.squares[0][2].color === 'black');
            assert(board.squares[0][5] instanceof Pawn && board.squares[0][5].color === 'black');
            assert(board.squares[1][2] instanceof Pawn && board.squares[1][2].color === 'black');
            assert(board.squares[1][5] instanceof Pawn && board.squares[1][5].color === 'black');
            assert(board.squares[2][6] instanceof Pawn && board.squares[2][6].color === 'black');
            assert(board.squares[2][7] instanceof Pawn && board.squares[2][7].color === 'black');
            
            // Check white pawns
            assert(board.squares[7][2] instanceof Pawn && board.squares[7][2].color === 'white');
            assert(board.squares[7][6] instanceof Pawn && board.squares[7][6].color === 'white');
            assert(board.squares[6][2] instanceof Pawn && board.squares[6][2].color === 'white');
            assert(board.squares[6][6] instanceof Knight && board.squares[6][6].color === 'white');
            assert(board.squares[5][0] instanceof Pawn && board.squares[5][0].color === 'white');
            assert(board.squares[5][1] instanceof Pawn && board.squares[5][1].color === 'white');
        });

        it('should have empty squares in the center', () => {
            // Check center squares are empty
            for (let i = 3; i < 5; i++) {
                for (let j = 2; j < 6; j++) {
                    assert(board.squares[i][j] === null, `Square at ${i},${j} should be empty`);
                }
            }
        });
    });
});
