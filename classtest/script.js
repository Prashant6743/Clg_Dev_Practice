document.addEventListener("DOMContentLoaded", function () {

    let questions = [
        { question: "q1", options: ["a", "b", "c", "d"], correctIndex: 1 },
        { question: "q2", options: ["a", "b", "c", "d"], correctIndex: 1 },
        { question: "q3", options: ["a", "b", "c", "d"], correctIndex: 1 },
        { question: "q4", options: ["a", "b", "c", "d"], correctIndex: 1 },
        { question: "q5", options: ["a", "b", "c", "d"], correctIndex: 1 }
    ];
    
    let currentQuestion = 0;
    let timePerQuestion = 90;
    let timeLeft;
    let myTimer = null;
    let userChoice = null;
    let alreadySubmitted = false;
    
    let startScreen = document.getElementById("start-screen");
    let quizScreen = document.getElementById("quiz-screen");
    let resultsScreen = document.getElementById("results-screen");
    let questionBox = document.getElementById("question");
    let optionsBox = document.getElementById("options");
    let timerBox = document.getElementById("timer");
    let progressBar = document.getElementById("progress-bar");
    let nextBtn = document.getElementById("next-btn");
    let startBtn = document.getElementById("start-btn");
    let restartBtn = document.getElementById("restart-btn");
    
    startBtn.addEventListener("click", function () {
        startScreen.classList.add("hidden");
        quizScreen.classList.remove("hidden");
        currentQuestion = 0;
        showQuestion();
    });
    
    restartBtn.addEventListener("click", function () {
        resultsScreen.classList.add("hidden");
        startScreen.classList.remove("hidden");
    });
    
    nextBtn.addEventListener("click", function () {
        goToNext(false);
    });
    
    function stopTimer() {
        if (myTimer !== null) {
            clearInterval(myTimer);
            myTimer = null;
        }
    }
    
    function showQuestion() {
        stopTimer();
        userChoice = null;
        alreadySubmitted = false;
        nextBtn.disabled = true;
    
        let questionData = questions[currentQuestion];
        questionBox.textContent =
            (currentQuestion + 1) + ". " + questionData.question;
    
        optionsBox.innerHTML = "";
    
        questionData.options.forEach(function (option, index) {
            let label = document.createElement("label");
    
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.name = "answer";
            radio.value = index;
    
            radio.addEventListener("change", function () {
                userChoice = Number(this.value);
                nextBtn.disabled = false;
            });
    
            label.appendChild(radio);
            label.appendChild(document.createTextNode(option));
            optionsBox.appendChild(label);
        });
    
        startTimer();
    }
    
    function startTimer() {
        timeLeft = timePerQuestion;
        timerBox.textContent = timeLeft + "s";
        progressBar.style.width = "100%";
    
        myTimer = setInterval(function () {
            timeLeft--;
            timerBox.textContent = timeLeft + "s";
            progressBar.style.width =
                (timeLeft / timePerQuestion) * 100 + "%";
    
            if (timeLeft <= 0) {
                stopTimer();
                goToNext(true);
            }
        }, 1000);
    }
    
    function goToNext(timedOut) {
        if (alreadySubmitted) return;
        alreadySubmitted = true;
    
        stopTimer();
    
        currentQuestion++;
    
        if (currentQuestion >= questions.length) {
            showResults();
        } else {
            showQuestion();
        }
    }
    
    function showResults() {
        quizScreen.classList.add("hidden");
        resultsScreen.classList.remove("hidden");
    }
    
    });
    