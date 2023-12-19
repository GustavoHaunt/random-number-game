//priority var
let numberList = [];
let maxNumber = 100;
let secretNumber = getRandomNumber();
let attempts = 1;

//functions screen texts
function showScreenText(tag, text) {
    let campo = document.querySelector(tag);
    campo.innerHTML = text;
    responsiveVoice.speak(text, 'Brazilian Portuguese Female', {rate:1.2});
}

function titleConfig() {
    showScreenText('h1', 'secret number game');
    showScreenText('p', 'choose a number between 1 a ' + maxNumber);
}

titleConfig();

//verification config
function verifyGuess() {
    let guess = document.querySelector('input').value;
    if (guess == secretNumber) {
        showScreenText('h1', 'you nailed it!');
        let wordAttempt = attempts > 1 ? ' attempts' : ' attempt';
        let phraseAttempt = 'voce acertou corretamente com ' + attempts + wordAttempt;
        showScreenText('p', phraseAttempt);
        document.getElementById('restart').removeAttribute('disabled');
    } else {
        if (guess > secretNumber) {
            showScreenText('p', 'the secret number is smaller');

        } else {
            showScreenText('p', 'the secret number is higher');

        }
        attempts++;
        cleanCampo();
    }
}

//clear config
function cleanCampo() {
    campo = document.querySelector('input');
    campo.value = '';
}

//random number config
function getRandomNumber() {
    let drawnNumber = parseInt(Math.random() * maxNumber + 1);
    let maxNumbersInList = numberList.length;
    
    if (maxNumbersInList == maxNumber) {
        numberList = [];
    }

    if (numberList.includes(drawnNumber)) {
        return getRandomNumber();
    }
    else {
        numberList.push(drawnNumber);
        console.log(numberList);
        return drawnNumber;
    }
}

//restart config
function gameRestart() {
    secretNumber = getRandomNumber();
    cleanCampo();
    attempts = 1;
    titleConfig();
    document.getElementById('restart').setAttribute('disabled', true);
}
