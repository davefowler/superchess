// Import piece classes
const { Pawn, Rook, Knight, Bishop, Queen, King } = typeof window !== 'undefined' ? window : require('./pieces.js');

class Board {
    constructor() {
        this.squares = Array(8).fill().map(() => Array(8).fill(null));
        this.setupPieces();
    }

    setupPieces() {
        // Modified setup according to Amendment #1
        // Setup pawns
        [0, 1, 6, 7].forEach(y => {
            this.squares[0][y] = new Pawn('black', [0, y]);
            this.squares[7][y] = new Pawn('white', [7, y]);
        });

        // Setup other pieces according to the new corner setup
        // Black pieces
        this.squares[1][0] = new Rook('black', [1, 0]);
        this.squares[1][1] = new Knight('black', [1, 1]);
        this.squares[2][0] = new King('black', [2, 0]);
        this.squares[2][1] = new Bishop('black', [2, 1]);

        // White pieces
        this.squares[6][6] = new Knight('white', [6, 6]);
        this.squares[6][7] = new Rook('white', [6, 7]);
        this.squares[7][6] = new Bishop('white', [7, 6]);
        this.squares[7][7] = new Queen('white', [7, 7]);
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

// Export for Node.js, attach to window for browser
if (typeof window !== 'undefined') {
    window.Board = Board;
} else {
    module.exports = { Board };
}
