const gameBoard = document.querySelectorAll('.cell');
const message = document.getElementById('message');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X'; // Player is 'X', AI is 'O'
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

// Handle user click on a cell
gameBoard.forEach((cell, index) => {
    cell.addEventListener('click', () => {
        if (board[index] === '' && gameActive) {
            board[index] = currentPlayer;
            cell.textContent = currentPlayer;
            checkResult();
            if (gameActive) {
                switchPlayer();
                if (currentPlayer === 'O') {
                    aiMove();
                }
            }
        }
    });
});

// Switch player
function switchPlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

// Check for a winner or tie
function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        message.textContent = `${currentPlayer} has won!`;
        gameActive = false;
        return;
    }

    if (!board.includes('')) {
        message.textContent = `It's a tie!`;
        gameActive = false;
        return;
    }
}

// AI makes a move
function aiMove() {
    let emptyCells = [];
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            emptyCells.push(i);
        }
    }

    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = 'O';
    gameBoard[randomIndex].textContent = 'O';
    checkResult();
    if (gameActive) {
        switchPlayer();
    }
}

// Reset the game
document.getElementById('resetBtn').addEventListener('click', resetGame);

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    gameBoard.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    message.textContent = '';
    gameActive = true;
}
