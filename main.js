'use strict';

const btnAgain = document.querySelector('.again');
const btnCheck = document.querySelector('.check');
const guessNumber = document.querySelector('.guess');
const highscoreNumber = document.querySelector('.highscore');
const correctNumber = document.querySelector('.number');
const message = document.querySelector('.message');
const score = document.querySelector('.score');

let numberOfTries = 10;
let record = 10;

const randomNumber = () => Math.trunc(Math.random() * 30) + 1;
let secretNumber = randomNumber();
console.log(secretNumber);

const displayMessage = (text) => {
    message.textContent = text;
}

btnCheck.addEventListener('click', gameFunctionality);

btnAgain.addEventListener('click', () => {
    secretNumber = randomNumber();
    numberOfTries = 10;
    displayMessage('Start guessing...');
    document.body.style.backgroundColor = '#222';
    score.textContent = numberOfTries;
    correctNumber.textContent = '?';
    guessNumber.value = '';
    guessNumber.removeAttribute('readonly');
    correctNumber.style.width = '15rem';
    correctNumber.style.padding = '3rem 0rem';
    btnCheck.addEventListener('click', gameFunctionality);
    console.log(secretNumber);
})

function gameFunctionality() {
    let guess = Number(guessNumber.value);
    if (guess === secretNumber) {
        displayMessage('Congratulation you have correct number');
        document.body.style.backgroundColor = 'green';
        score.textContent = `${numberOfTries -= 1}`
        if (record >= (10 - numberOfTries)) {
            record = 10 - numberOfTries;
            highscoreNumber.textContent = `${record}`;
        };
        if (record < (10 - numberOfTries)) {
            highscoreNumber.textContent = `${record}`;
        };
        correctNumber.textContent = secretNumber;
        guessNumber.setAttribute('readonly', 'true');
        btnCheck.removeEventListener('click', gameFunctionality)
    } else if (guess !== secretNumber) {
        if (numberOfTries > 1) {
            if (guess > secretNumber && guess <= 30) {
                displayMessage('Wrong. Your number is high.');
                score.textContent = `${numberOfTries -= 1}`
            } else if (guess < secretNumber && guess > 0) {
                displayMessage('Wrong. Your number is low.');
                score.textContent = `${numberOfTries -= 1}`
            } else {
                displayMessage('Your number must be between 1 and 30 (include both).');
                score.textContent = `${numberOfTries -= 1}`;
            }
        } else {
            correctNumber.textContent = 'GAME OVER';
            correctNumber.style.width = '30rem';
            correctNumber.style.padding = '5px';
            guessNumber.setAttribute('readonly', 'true');
            btnCheck.removeEventListener('click', gameFunctionality);
            score.textContent = `${numberOfTries -= 1}`
        }
    }
}