const assert = require('assert');
const { Board } = require('../../board.js');
const { Pawn, Rook, Knight, Bishop, Queen, King } = require('../../pieces.js');

describe('Piece Movement Tests', () => {
    let board;

    beforeEach(() => {
        board = new Board();
        // Clear the board for clean testing
        board.squares = Array(8).fill().map(() => Array(8).fill(null));
    });

    describe('Pawn Movement', () => {
        it('should move forward one square when path is clear', () => {
            const pawn = new Pawn('white', [6, 0]);
            board.squares[6][0] = pawn;
            const validMoves = pawn.getValidMoves(board);
            assert(validMoves.some(move => move[0] === 5 && move[1] === 0));
        });

        it('should not move backward', () => {
            const pawn = new Pawn('white', [6, 0]);
            board.squares[6][0] = pawn;
            const validMoves = pawn.getValidMoves(board);
            assert(!validMoves.some(move => move[0] === 7 && move[1] === 0));
        });

        it('should capture diagonally', () => {
            const whitePawn = new Pawn('white', [6, 1]);
            const blackPawn = new Pawn('black', [5, 2]);
            board.squares[6][1] = whitePawn;
            board.squares[5][2] = blackPawn;
            const validMoves = whitePawn.getValidMoves(board);
            assert(validMoves.some(move => move[0] === 5 && move[1] === 2));
        });
    });

    describe('Rook Movement', () => {
        it('should move horizontally and vertically', () => {
            const rook = new Rook('white', [4, 4]);
            board.squares[4][4] = rook;
            const validMoves = rook.getValidMoves(board);
            
            // Check horizontal moves
            assert(validMoves.some(move => move[0] === 4 && move[1] === 0));
            assert(validMoves.some(move => move[0] === 4 && move[1] === 7));
            
            // Check vertical moves
            assert(validMoves.some(move => move[0] === 0 && move[1] === 4));
            assert(validMoves.some(move => move[0] === 7 && move[1] === 4));
        });

        it('should not move through pieces', () => {
            const rook = new Rook('white', [4, 4]);
            const blockingPiece = new Pawn('white', [4, 6]);
            board.squares[4][4] = rook;
            board.squares[4][6] = blockingPiece;
            const validMoves = rook.getValidMoves(board);
            assert(!validMoves.some(move => move[0] === 4 && move[1] === 7));
        });
    });

    describe('Knight Movement', () => {
        it('should move in L-shape pattern', () => {
            const knight = new Knight('white', [4, 4]);
            board.squares[4][4] = knight;
            const validMoves = knight.getValidMoves(board);
            
            const expectedMoves = [
                [2, 5], [2, 3], // Up 2, left/right 1
                [6, 5], [6, 3], // Down 2, left/right 1
                [3, 6], [5, 6], // Right 2, up/down 1
                [3, 2], [5, 2]  // Left 2, up/down 1
            ];
            
            expectedMoves.forEach(([x, y]) => {
                assert(validMoves.some(move => move[0] === x && move[1] === y));
            });
        });
    });
});
