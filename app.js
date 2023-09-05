const root = document.getElementById('root');
const dice = document.getElementById('dice');
const playerMove = document.getElementById('player-move');
const player1Score = document.getElementById('player1-score');
const player2Score = document.getElementById('player2-score');
const player1Button = document.getElementById('player1-button');
const player2Button = document.getElementById('player2-button');

// const diceFaces = [
//     'image/1.jpg',
//     'image/2.jpg',
//     'image/3.jpg',
//     'image/4.jpg',
//     'image/5.jpg', 'image/6.jpg'
// ]

const handleStart = () => {
    const playerStart = Math.floor((Math.random()*2) + 1);
    updateMoves(playerStart === 1? 'Player-1': 'Player-2');
}

const updateMoves = (player) => {
    playerMove.innerText = `${player} To Play`;
    if(player === 'Player-1') {
        player1Button.disabled = false;
        player2Button.disabled = true;
    } else {
        player1Button.disabled = true;
        player2Button.disabled = false;
    }
}

const updateScore = (player, score, playerScore) => {
    const currentScore = playerScore.innerText;
    const totalScore = Number(currentScore) + score;
    playerScore.innerText = totalScore;
    checkIsGameOver(totalScore, player);
}

const handleDiceRoll = (player) => {
    dice.classList.add('rotate');
    setTimeout(() => {
        dice.classList.remove('rotate');
        const score = Math.floor((Math.random() * 6) + 1);
        dice.src = `images/${score}.jpg`;
        if(player === 'Player-1') {
            updateMoves('Player-2');
            updateScore(player, score, player1Score);
        } else {
            updateMoves('Player-1');
            updateScore(player, score, player2Score);
        }
    }, 1000);
}

const checkIsGameOver = (totalScore, player) => {
    if(totalScore >= 30) {
        player1Button.disabled = true;
        player2Button.disabled = true;
        playerMove.innerText = `${player} Won The Game!🎉`;
    }
}

const handleReset = () => {
    player1Score.innerText = 0;
    player2Score.innerText = 0;
    dice.src = 'images/1.jpg';
    handleStart();
}