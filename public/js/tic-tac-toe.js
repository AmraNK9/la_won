
import  {ref,set,db,onValue, update, roomId} from './fcm.js';
const cells = document.querySelectorAll('[data-cell]');
const statusDiv = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');

let currentPlayer = 'X';
let gameOver = false;

const gameRef = ref(db, roomId+'tic-tac-toe/game');

// Initialize game state in the database
function initializeGame() {
  
  set(gameRef, {
    board: Array(9).fill(''),
    currentPlayer: 'X',
    gameOver: false,
    winner: null,
  });
}

// Check for win or draw
function checkGameStatus(board) {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }

  return board.includes('') ? null : 'draw';
}

// Handle cell click
function handleCellClick(e) {
  if (gameOver) return;
  const index = Array.from(cells).indexOf(e.target);
  
  onValue(gameRef, (snapshot) => {
    const gameState = snapshot.val();
    const board = gameState.board;
    if (board[index] === '' && gameState.currentPlayer === currentPlayer) {
      board[index] = currentPlayer;
      const winner = checkGameStatus(board);
      update(gameRef, {
        board: board,
        currentPlayer: currentPlayer === 'X' ? 'O' : 'X',
        gameOver: !!winner,
        winner: winner
      });
    }
  }, { onlyOnce: true });
}

// Update UI based on game state
function updateUI(gameState) {
  gameState.board.forEach((mark, index) => {
    cells[index].innerText = mark;
  });

  if (gameState.gameOver) {
    statusDiv.innerText = gameState.winner === 'draw' ? "It's a draw!" : `${gameState.winner} wins!`;
    gameOver = true;
  } else {
    statusDiv.innerText = `${gameState.currentPlayer}'s turn`;
  }

  currentPlayer = gameState.currentPlayer;
  gameOver = gameState.gameOver;
}

// Listen for game state changes
onValue(gameRef, (snapshot) => {
  const gameState = snapshot.val();
  updateUI(gameState);
});

cells.forEach(cell => {
  cell.addEventListener('click', handleCellClick);
});

resetButton.addEventListener('click', initializeGame);

// Initialize the game on load
initializeGame();
