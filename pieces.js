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

class Rook extends Piece {
    getValidMoves(board) {
        const moves = [];
        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        const [x, y] = this.position;

        directions.forEach(([dx, dy]) => {
            let newX = x + dx;
            let newY = y + dy;
            while (board.isValidPosition(newX, newY)) {
                const piece = board.getPiece([newX, newY]);
                if (!piece) {
                    moves.push([newX, newY]);
                } else {
                    if (piece.color !== this.color) {
                        moves.push([newX, newY]);
                    }
                    break;
                }
                newX += dx;
                newY += dy;
            }
        });
        return moves;
    }
}

class Knight extends Piece {
    getValidMoves(board) {
        const moves = [];
        const jumps = [[2, 1], [1, 2], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1]];
        const [x, y] = this.position;

        jumps.forEach(([dx, dy]) => {
            const newX = x + dx;
            const newY = y + dy;
            if (board.isValidPosition(newX, newY)) {
                const piece = board.getPiece([newX, newY]);
                if (!piece || piece.color !== this.color) {
                    moves.push([newX, newY]);
                }
            }
        });
        return moves;
    }
}

class Bishop extends Piece {
    getValidMoves(board) {
        const moves = [];
        const directions = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
        const [x, y] = this.position;

        directions.forEach(([dx, dy]) => {
            let newX = x + dx;
            let newY = y + dy;
            while (board.isValidPosition(newX, newY)) {
                const piece = board.getPiece([newX, newY]);
                if (!piece) {
                    moves.push([newX, newY]);
                } else {
                    if (piece.color !== this.color) {
                        moves.push([newX, newY]);
                    }
                    break;
                }
                newX += dx;
                newY += dy;
            }
        });
        return moves;
    }
}

class Queen extends Piece {
    getValidMoves(board) {
        const moves = [];
        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
        const [x, y] = this.position;

        directions.forEach(([dx, dy]) => {
            let newX = x + dx;
            let newY = y + dy;
            while (board.isValidPosition(newX, newY)) {
                const piece = board.getPiece([newX, newY]);
                if (!piece) {
                    moves.push([newX, newY]);
                } else {
                    if (piece.color !== this.color) {
                        moves.push([newX, newY]);
                    }
                    break;
                }
                newX += dx;
                newY += dy;
            }
        });
        return moves;
    }
}

class King extends Piece {
    getValidMoves(board) {
        const moves = [];
        const directions = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
        const [x, y] = this.position;

        directions.forEach(([dx, dy]) => {
            const newX = x + dx;
            const newY = y + dy;
            if (board.isValidPosition(newX, newY)) {
                const piece = board.getPiece([newX, newY]);
                if (!piece || piece.color !== this.color) {
                    // Check if this move would put king in check
                    if (!this.isSquareUnderAttack(board, [newX, newY])) {
                        moves.push([newX, newY]);
                    }
                }
            }
        });
        return moves;
    }

    isSquareUnderAttack(board, position) {
        const [x, y] = position;
        // Check all enemy pieces to see if they can attack this square
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const piece = board.getPiece([i, j]);
                if (piece && piece.color !== this.color) {
                    const moves = piece.getValidMoves(board);
                    if (moves.some(([mx, my]) => mx === x && my === y)) {
                        return true;
                    }
                }
            }
        }
        return false;
    }
}


// Add module exports after all classes are defined
module.exports = {
    Piece,
    Pawn,
    Rook,
    Knight,
    Bishop,
    Queen,
    King
};
