import { Board } from './board.js';

class Game {
    constructor() {
        this.board = new Board();
        this.currentPlayer = 'black'; // Amendment #2: Black moves first
        this.selectedPiece = null;
        this.setupEventListeners();
    }

    setupEventListeners() {
        const boardElement = document.getElementById('board');
        this.renderBoard();

        boardElement.addEventListener('click', (e) => {
            const square = e.target.closest('.square');
            if (!square) return;

            const x = parseInt(square.dataset.x);
            const y = parseInt(square.dataset.y);
            this.handleSquareClick([x, y]);
        });

        // Setup special moves buttons
        document.getElementById('special-moves').addEventListener('click', () => {
            const menu = document.getElementById('special-moves-menu');
            menu.classList.toggle('hidden');
        });

        // Add event listeners for special moves buttons
        this.setupSpecialMoves();
    }

    renderBoard() {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = '';

        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                const square = document.createElement('div');
                square.className = `square ${(i + j) % 2 === 0 ? 'white' : 'black'}`;
                square.dataset.x = i;
                square.dataset.y = j;

                const piece = this.board.getPiece([i, j]);
                if (piece) {
                    const pieceElement = document.createElement('div');
                    pieceElement.className = `piece ${piece.color} ${piece.constructor.name.toLowerCase()}`;
                    // Add Unicode chess symbols
                    const symbol = this.getPieceSymbol(piece);
                    pieceElement.textContent = symbol;
                    square.appendChild(pieceElement);
                }

                boardElement.appendChild(square);
            }
        }
    }

    isValidMove(from, to) {
        const piece = this.board.getPiece(from);
        if (!piece) return false;
        
        const validMoves = piece.getValidMoves(this.board);
        return validMoves.some(([x, y]) => x === to[0] && y === to[1]);
    }

    highlightValidMoves(piece) {
        const validMoves = piece.getValidMoves(this.board);
        const squares = document.querySelectorAll('.square');
        
        squares.forEach(square => {
            const x = parseInt(square.dataset.x);
            const y = parseInt(square.dataset.y);
            if (validMoves.some(([mx, my]) => mx === x && my === y)) {
                square.classList.add('highlighted');
            }
        });
    }

    handleSquareClick(position) {
        const piece = this.board.getPiece(position);
        
        // Clear previous highlights
        document.querySelectorAll('.square').forEach(square => {
            square.classList.remove('highlighted');
        });

        if (this.selectedPiece) {
            // Try to move the selected piece
            if (this.isValidMove(this.selectedPiece.position, position)) {
                this.board.movePiece(this.selectedPiece.position, position);
                this.currentPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
                document.getElementById('turn-display').textContent = `${this.currentPlayer}'s Turn`;
            }
            this.selectedPiece = null;
            this.renderBoard();
        } else if (piece && piece.color === this.currentPlayer) {
            this.selectedPiece = piece;
            this.highlightValidMoves(piece);
        }
    }

    getPieceSymbol(piece) {
        const symbols = {
            'white': {
                'King': '♔',
                'Queen': '♕',
                'Rook': '♖',
                'Bishop': '♗',
                'Knight': '♘',
                'Pawn': '♙'
            },
            'black': {
                'King': '♚',
                'Queen': '♛',
                'Rook': '♜',
                'Bishop': '♝',
                'Knight': '♞',
                'Pawn': '♟'
            }
        };
        return symbols[piece.color][piece.constructor.name];
    }

    setupSpecialMoves() {
        // Implement special moves according to amendments
        // Add event listeners for each special move button
    }
}

// Start the game
new Game();
