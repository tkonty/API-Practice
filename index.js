const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random';
const quoteDisplayElement = document.getElementById('quoteDisplay');
const quoteInputElement = document.getElementById('quoteInput');
const timerElement = document.getElementById('timer');
const startButtonElement = document.getElementById('startBtn');
const mainScreenElement = document.getElementById('mainScreen');

quoteInputElement.addEventListener('input', () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll('span');
    const arrayValue = quoteInputElement.value.split('');
    let correct = true;
    arrayQuote.forEach((charSpan, index) => {
        const char = arrayValue[index];
        if (char == null){
            charSpan.classList.remove('correct');
            charSpan.classList.remove('incorrect');
            correct = false;
        } else if (char === charSpan.innerText) {
            charSpan.classList.add('correct');
            charSpan.classList.remove('incorrect');
            correct = true;
        } else {
            charSpan.classList.add('incorrect');
            charSpan.classList.remove('correct');
            correct = false;
        }
    })

    if (correct) renderNewQuote();
})

function getRandomQuote () {
    return fetch(RANDOM_QUOTE_API_URL)
    .then(response => response.json())
    .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote();
    quoteDisplayElement.innerHTML = '';
    quote.split('').forEach(char => {
        const charSpan = document.createElement('span');
        charSpan.innerText = char;
        quoteDisplayElement.appendChild(charSpan);
    });
    quoteInputElement.value = null;
    startTimer();
}


let startTime;
function startTimer() {
    timerElement.innerText = 0;
    startTime = new Date();
    setInterval(() => {
        timerElement.innerText = getTimerTime();
    }, 1000)
}

function getTimerTime () {
    return Math.floor((new Date() - startTime) / 1000);
}

function startGame() {
    mainScreenElement.classList.add('hidden');
    quoteDisplayElement.classList.remove('hidden');
    quoteInputElement.classList.remove('hidden');
    quoteInputElement.focus();
    renderNewQuote();
}

startButtonElement.addEventListener('click', () => {
    startGame();
})