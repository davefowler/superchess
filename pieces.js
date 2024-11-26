class Piece {
    constructor(color, position) {
        this.color = color;
        this.position = position;
        this.hasMoved = false;
    }

    getValidMoves(board) {
        return [];
    }
}

class Pawn extends Piece {
    getValidMoves(board) {
        const moves = [];
        const direction = this.color === 'black' ? 1 : -1;
        const [x, y] = this.position;
        
        // Normal move
        if (board.isValidPosition(x + direction, y) && !board.getPiece([x + direction, y])) {
            moves.push([x + direction, y]);
            
            // First move - two squares (only for side pawns)
            if (!this.hasMoved && (y === 0 || y === 7)) {
                if (!board.getPiece([x + 2 * direction, y])) {
                    moves.push([x + 2 * direction, y]);
                }
            }
        }

        // Captures
        [[direction, 1], [direction, -1]].forEach(([dx, dy]) => {
            if (board.isValidPosition(x + dx, y + dy)) {
                const piece = board.getPiece([x + dx, y + dy]);
                if (piece && piece.color !== this.color) {
                    moves.push([x + dx, y + dy]);
                }
            }
        });

        return moves;
    }
}

// Add other piece classes (Rook, Knight, Bishop, Queen, King)
// with their respective movement patterns
