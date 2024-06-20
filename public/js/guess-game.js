
// import  {ref,set,db,onValue, update} from './fcm.js';

const guessInput = document.getElementById('guess-input');
const guessButton = document.getElementById('guess-btn');
const statusDiv = document.getElementById('status');
const resetButton = document.getElementById('reset-btn');

let randomNumber;
let attempts;

function initializeGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    statusDiv.innerText = 'Guess a number between 1 and 100';
    guessInput.value = '';
}

function handleGuess() {
    const userGuess = parseInt(guessInput.value);
    attempts++;

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        statusDiv.innerText = 'Please enter a valid number between 1 and 100';
        return;
    }

    if (userGuess === randomNumber) {
        statusDiv.innerText = `Congratulations! You guessed the correct number ${randomNumber} in ${attempts} attempts.`;
    } else if (userGuess < randomNumber) {
        statusDiv.innerText = 'Too low! Try again.';
    } else {
        statusDiv.innerText = 'Too high! Try again.';
    }
}

guessButton.addEventListener('click', handleGuess);
resetButton.addEventListener('click', initializeGame);

// Initialize the game on load
initializeGame();
