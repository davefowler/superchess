import assert from 'assert';
import { Board } from '../../board.js';
import { Pawn, Rook, Knight, Bishop, Queen, King } from '../../pieces.js';

describe('Piece Fusion Tests', () => {
    let board;

    beforeEach(() => {
        board = new Board();
        // Clear the board for clean testing
        board.squares = Array(8).fill().map(() => Array(8).fill(null));
    });

    describe('Fusion Eligibility', () => {
        it('should allow fusion between pieces of same color', () => {
            const rook = new Rook('white', [4, 4]);
            const bishop = new Bishop('white', [4, 5]);
            board.squares[4][4] = rook;
            board.squares[4][5] = bishop;
            
            assert(rook.canFuseWith(bishop));
            assert(bishop.canFuseWith(rook));
        });

        it('should prevent fusion between pieces of different colors', () => {
            const whiteRook = new Rook('white', [4, 4]);
            const blackBishop = new Bishop('black', [4, 5]);
            
            assert(!whiteRook.canFuseWith(blackBishop));
            assert(!blackBishop.canFuseWith(whiteRook));
        });

        it('should prevent fusion with kings', () => {
            const king = new King('white', [4, 4]);
            const bishop = new Bishop('white', [4, 5]);
            
            assert(!king.canFuseWith(bishop));
            assert(!bishop.canFuseWith(king));
        });

        it('should prevent fusion of already fused pieces', () => {
            const rook = new Rook('white', [4, 4]);
            const bishop1 = new Bishop('white', [4, 5]);
            const bishop2 = new Bishop('white', [4, 6]);
            
            rook.fusedWith = bishop1;
            bishop1.fusedWith = rook;
            
            assert(!rook.canFuseWith(bishop2));
            assert(!bishop2.canFuseWith(rook));
        });
    });

    describe('Fused Piece Movement', () => {
        it('should combine movement capabilities of rook and bishop (like queen)', () => {
            const rook = new Rook('white', [4, 4]);
            const bishop = new Bishop('white', [4, 5]);
            board.squares[4][4] = rook;
            
            // Fuse the pieces
            rook.fusedWith = bishop;
            bishop.fusedWith = rook;
            
            const validMoves = rook.getValidMoves(board);
            
            // Should have both diagonal and straight moves
            // Check diagonal moves
            assert(validMoves.some(([x, y]) => x === 2 && y === 2)); // up-left
            assert(validMoves.some(([x, y]) => x === 2 && y === 6)); // up-right
            // Check straight moves
            assert(validMoves.some(([x, y]) => x === 4 && y === 0)); // left
            assert(validMoves.some(([x, y]) => x === 0 && y === 4)); // up
        });

        it('should combine knight and bishop movements', () => {
            const knight = new Knight('white', [4, 4]);
            const bishop = new Bishop('white', [4, 5]);
            board.squares[4][4] = knight;
            
            // Fuse the pieces
            knight.fusedWith = bishop;
            bishop.fusedWith = knight;
            
            const validMoves = knight.getValidMoves(board);
            
            // Should have both L-shaped and diagonal moves
            // Check knight moves
            assert(validMoves.some(([x, y]) => x === 2 && y === 5)); // knight move
            assert(validMoves.some(([x, y]) => x === 6 && y === 5)); // knight move
            // Check bishop moves
            assert(validMoves.some(([x, y]) => x === 2 && y === 2)); // diagonal
            assert(validMoves.some(([x, y]) => x === 6 && y === 6)); // diagonal
        });

        it('should allow pawn fusion with special movement rules', () => {
            const pawn = new Pawn('white', [6, 4]);
            const bishop = new Bishop('white', [6, 5]);
            board.squares[6][4] = pawn;
            
            // Fuse the pieces
            pawn.fusedWith = bishop;
            bishop.fusedWith = pawn;
            
            const validMoves = pawn.getValidMoves(board);
            
            // Should have both pawn and bishop moves
            // Check pawn moves
            assert(validMoves.some(([x, y]) => x === 5 && y === 4)); // forward
            // Check bishop moves
            assert(validMoves.some(([x, y]) => x === 4 && y === 2)); // diagonal movement
            assert(validMoves.some(([x, y]) => x === 4 && y === 6)); // diagonal movement
        });
    });

    describe('Board Integration', () => {
        it('should properly execute fusion moves', () => {
            const rook = new Rook('white', [4, 4]);
            const bishop = new Bishop('white', [4, 5]);
            board.squares[4][4] = rook;
            board.squares[4][5] = bishop;
            
            // Move rook onto bishop's square
            board.movePiece([4, 4], [4, 5]);
            
            // Check that fusion occurred
            const fusedPiece = board.getPiece([4, 5]);
            assert(fusedPiece instanceof Rook);
            assert(fusedPiece.fusedWith instanceof Bishop);
            assert(board.squares[4][4] === null);
        });

        it('should maintain fusion state after multiple moves', () => {
            const rook = new Rook('white', [4, 4]);
            const bishop = new Bishop('white', [4, 5]);
            board.squares[4][4] = rook;
            board.squares[4][5] = bishop;
            
            // Create fusion
            board.movePiece([4, 4], [4, 5]);
            // Move fused piece
            board.movePiece([4, 5], [3, 5]);
            
            const fusedPiece = board.getPiece([3, 5]);
            assert(fusedPiece instanceof Rook);
            assert(fusedPiece.fusedWith instanceof Bishop);
        });
    });
});
