let counterElement = document.getElementById("counter");

function timer() {
    let timeLeft;
    document.getElementById("startbutton")
    if (timeLeft === 0) {
        endQuiz()l
    } else {
        counterElement.innerHTML = timeLeft + " seconds left";
    }
}

function timeSubtract () {
    timeLeft = timeLeft - 5;
}

function startQuiz() {
    
}