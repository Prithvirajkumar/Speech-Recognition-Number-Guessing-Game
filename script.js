const msgEl = document.getElementById('msg');

const randomNum = getRandomNumber();

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start microphone
recognition.start();

// Capture user Speech
function onSpeech(e) {
    const msg = e.results[0][0].transcript;
    writeMessage(msg);
    checkNumber(msg);
}

// Write what the user Speaks
function writeMessage(msg) {
    msgEl.innerHTML = `
    <div>You said: </div>
    <span class = "box">${msg}</span>
    `;
}

// check msg against number 
function checkNumber(msg) {
    const num = +msg;

    // check if valid number
    if(Number.isNaN(num)) {
        msgEl.innerHTML += '<div> That is not a valid number';
        return;
    }

    // check range
    if(num > 100 || num < 1) {
        msgEl.innerHTML += '<div>Number must be between 1 and 100</div>';
        return;
    }

    // check number 
    if(num === randomNum) {
        document.body.innerHTML = `
        <h2> Congratulations! You have guessed the number! <br><br> It was ${num}</h2>
        <button class="play-again" id="play-again">Play Again</button>
        `;
    } else if(num > randomNum) {
        msgEl.innerHTML += '<div>GO LOWER<div>';
    } else {
        msgEl.innerHTML += '<div>GO HIGHER</div>';
    }
}

// generate randome number 
function getRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

// spech event listener 
recognition.addEventListener('result', onSpeech);

// end SR service 
recognition.addEventListener('end', () => recognition.start());

// play button
document.body.addEventListener('click', (e) => {
    if(e.target.id === 'play-again'){
        window.location.reload();
    }
})