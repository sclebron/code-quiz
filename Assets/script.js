let timeEl = document.querySelector("p.time");
let secondsLeft = 75;
let scoreEl = document.querySelector("#score");

const introEl = document.querySelector("#intro");

const questionsEl = document.querySelector("#questions");

let questionEl = document.querySelector("#question");

let questionCount = 0;

const yaynayEl = document.querySelector("#yaynay");

const finalEl = document.querySelector("#final");

let initialsInput = document.querySelector("#initials");

const highscoresEl = document.querySelector("#highscores");

let scoreListEl = document.querySelector("#score-list");

let scoreList = [];

const startBtn = document.querySelector("#start");

const ansBtn = document.querySelectorAll("button.ansBtn")

const ans1Btn = document.querySelector("#answer1");

const ans2Btn = document.querySelector("#answer2");

const ans3Btn = document.querySelector("#answer3");

const ans4Btn = document.querySelector("#answer4");

const submitScrBtn = document.querySelector("#submit-score");

const goBackBtn = document.querySelector("#goback");

const clearScrBtn = document.querySelector("#clearscores");

const viewScrBtn = document.querySelector("#view-scores");

const questions = [ 
    {
        question: "What is the largest lake in America?",
        answers: ["Lake Michigan", "Lake Superior", "Grand Lake", "Lake Tahoe"],
        correctAnswer: "1"
    },
    {
        question: "What country has the most islands?",
        answers: ["Sweden", "Greece", "Norway", "Canada"],
        correctAnswer: "0"
    },
    {
        question: "What is the highest grossing movie of all time?",
        answers: ["Avatar", "Avengers: Endgame", "Titanic", "Star Wars: The Force Awakens"],
        correctAnswer: "0"
    },
    {
        question: "What state has the largest population?",
        answers: ["New York", "California", "Texas", "Florida"],
        correctAnswer: "1"
    },
    {
        question: "What is the smallest organ in the human body?",
        answers: ["Gall bladder", "Eye", "Parathyroid gland", "Pineal gland"],
        correctAnswer: "3"
    }
];

function setTime() {
    let timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = `Time:${secondsLeft}s`;

        if (secondsLeft === 0 || questionCount === questions.length) {
            clearInterval(timerInterval);
            questionsEl.style.display = "none";
            finalEl.style.display = "block";
            scoreEl.textContent = secondsLeft;
        }
    }, 1000);
}

function startQuiz() {
    introEl.style.display = "none";
    questionsEl.style.display = "block";
    questionCount = 0;

    setTime();
    setQuestion(questionCount);
}

function setQuestion(id) {
    if (id < questions.length) {
        questionEl.textContent = questions[id].question;
        ans1Btn.textContent = questions[id].answers[0];
        ans2Btn.textContent = questions[id].answers[1];
        ans3Btn.textContent = questions[id].answers[2];
        ans4Btn.textContent = questions[id].answers[3];
    }
}

function checkAnswer(event) {
    event.preventDefault();

    yaynayEl.style.display = "block";
    let p = document.createElement("p");
    yaynayEl.appendChild(p);

    setTimeout(function () {
        p.style.display = 'none';
    }, 1000);

    if (questions[questionCount].correctAnswer === event.target.value) {
        p.textContent = "Correct!";
    } else if (questions[questionCount].correctAnswer !== event.target.value) {
        secondsLeft = secondsLeft - 10;
        p.textContent = "Wrong!";
    }

    if (questionCount < questions.length) {
        questionCount++;
    }
    setQuestion(questionCount);
}

function addScore(event) {
    event.preventDefault();

    finalEl.style.display = "none";
    highscoresEl.style.display = "block";

    let init = initialsInput.value.toUpperCase();
    scoreList.push({ initials: init, score: secondsLeft });

    scoreList = scoreList.sort((a, b) => {
        if (a.score < b.score) {
        return 1;
        } else {
        return -1;
        }
    });
    
    scoreListEl.innerHTML="";
    for (let i = 0; i < scoreList.length; i++) {
        let li = document.createElement("li");
        li.textContent = `${scoreList[i].initials}: ${scoreList[i].score}`;
        scoreListEl.append(li);
    }

    storeScores();
    displayScores();
}

function storeScores() {
    localStorage.setItem("scoreList", JSON.stringify(scoreList));
}

function displayScores() {
    let storedScoreList = JSON.parse(localStorage.getItem("scoreList"));

    if (storedScoreList !== null) {
        scoreList = storedScoreList;
    }
}

function clearScores() {
    localStorage.clear();
    scoreListEl.innerHTML="";
}

startBtn.addEventListener("click", startQuiz);

ansBtn.forEach(item => {
    item.addEventListener('click', checkAnswer);
});

submitScrBtn.addEventListener("click", addScore);

goBackBtn.addEventListener("click", function () {
    highscoresEl.style.display = "none";
    introEl.style.display = "block";
    secondsLeft = 75;
    timeEl.textContent = `Time:${secondsLeft}s`;
});

clearScrBtn.addEventListener("click", clearScores);
1   
viewScrBtn.addEventListener("click", function () {
    if (highscoresEl.style.display === "none") {
        highscoresEl.style.display = "block";
    } else if (highscoresEl.style.display === "block") {
        highscoresEl.style.display = "none";
    } else {
        return alert("No scores to show.");
    }
});
