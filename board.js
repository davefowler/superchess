import { Pawn, Rook, Knight, Bishop, Queen, King } from './pieces.js';

class Board {
    constructor() {
        this.squares = Array(8).fill().map(() => Array(8).fill(null));
        this.setupPieces();
    }

    setupPieces() {
        // Setup according to Amendment #1
        // Black pieces - King's corner
        this.squares[0][0] = new King('black', [0, 0]);
        this.squares[0][1] = new Bishop('black', [0, 1]);
        this.squares[0][2] = new Pawn('black', [0, 2]);
        this.squares[1][0] = new Rook('black', [1, 0]);
        this.squares[1][1] = new Knight('black', [1, 1]);
        this.squares[1][2] = new Pawn('black', [1, 2]);
        this.squares[2][0] = new Pawn('black', [2, 0]);
        this.squares[2][1] = new Pawn('black', [2, 1]);

        // Black pieces - Queen's corner
        this.squares[0][7] = new Queen('black', [0, 7]);
        this.squares[0][6] = new Bishop('black', [0, 6]);
        this.squares[0][5] = new Pawn('black', [0, 5]);
        this.squares[1][7] = new Knight('black', [1, 7]);
        this.squares[1][6] = new Rook('black', [1, 6]);
        this.squares[1][5] = new Pawn('black', [1, 5]);
        this.squares[2][7] = new Pawn('black', [2, 7]);
        this.squares[2][6] = new Pawn('black', [2, 6]);


        // White pieces - King's corner
        this.squares[7][0] = new King('white', [7, 0]);
        this.squares[7][1] = new Bishop('white', [7, 1]);
        this.squares[7][2] = new Pawn('white', [7, 2]);
        this.squares[6][0] = new Rook('white', [6, 0]);
        this.squares[6][1] = new Knight('white', [6, 1]);
        this.squares[6][2] = new Pawn('white', [6, 2]);
        this.squares[5][0] = new Pawn('white', [5, 0]);
        this.squares[5][1] = new Pawn('white', [5, 1]);

        // White pieces - Queen's corner
        this.squares[7][7] = new Queen('white', [7, 7]);
        this.squares[7][6] = new Pawn('white', [7, 6]);
        this.squares[7][5] = new Bishop('white', [7, 5]);
        this.squares[6][7] = new Rook('white', [6, 7]);
        this.squares[6][6] = new Knight('white', [6, 6]);
        this.squares[6][5] = new Pawn('white', [6, 5]);
        this.squares[5][7] = new Pawn('white', [5, 7]);
        this.squares[5][6] = new Pawn('white', [5, 6]);
    }

    getPiece(position) {
        const [x, y] = position;
        return this.squares[x][y];
    }

    movePiece(from, to) {
        const [fromX, fromY] = from;
        const [toX, toY] = to;
        const piece = this.squares[fromX][fromY];
        
        if (piece) {
            piece.position = to;
            piece.hasMoved = true;
            this.squares[toX][toY] = piece;
            this.squares[fromX][fromY] = null;
        }
    }

    isValidPosition(x, y) {
        return x >= 0 && x < 8 && y >= 0 && y < 8;
    }
}

export { Board };
