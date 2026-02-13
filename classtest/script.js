
let questions = [
    { question: "q1 ", options: ["a", "b", " c", "d"], correctIndex: 1 },
    { question: "q2", options: ["a", "b", " c", "d"], correctIndex: 1 },
    { question: "q3", options: ["a", "b", " c", "d"], correctIndex: 1 },
    { question: "q4", options: ["a", "b", " c", "d"], correctIndex: 1 },
    { question: "q5", options: ["a", "b", " c", "d"], correctIndex: 1}
  ];
  
  
  let currentQuestion = 0;   
  let timeLeft = 90;         
  let myTimer = null;        
  let userChoice = null;     
  let alreadySubmitted = false; 
  let timePerQuestion = 4; 
  
  
  let startScreen = document.getElementById("start-screen");
  let quizScreen = document.getElementById("quiz-screen");
  let resultsScreen = document.getElementById("results-screen");
  let questionBox = document.getElementById("question");
  let optionsBox = document.getElementById("options");
  let timerBox = document.getElementById("timer");
  let progressBar = document.getElementById("progress-bar");
  let nextBtn = document.getElementById("next-btn");
  let finalScoreBox = document.getElementById("final-score");
  let startBtn = document.getElementById("start-btn");
  let restartBtn = document.getElementById("restart-btn");
  
  
  startBtn.onclick = function() {
    startScreen.style.display = "none";   
    quizScreen.style.display = "flex";    
    currentQuestion = 0;   
    showQuestion();       
  };
  
 
  restartBtn.onclick = function() {
    resultsScreen.style.display = "none";
    startScreen.style.display = "flex";
  };
  
 
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
  
  
    let questionNumber = currentQuestion + 1;  
    questionBox.innerHTML = questionNumber + ". " + questionData.question;
  
    
    optionsBox.innerHTML = "";
  
  
    for (let i = 0; i < questionData.options.length; i++) {
     
      let label = document.createElement("label");
      label.className = "option";
  
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "answer";   
      radio.value = i;       
  
      radio.addEventListener("change", function() {
        userChoice = Number(this.value);
      });
  
      label.appendChild(radio);
      label.appendChild(document.createTextNode(questionData.options[i]));
      optionsBox.appendChild(label);
    }
  
  
    timeLeft = timePerQuestion;
    timerBox.innerHTML = timeLeft + "s";
    progressBar.style.width = "100%";
  
  
    myTimer = setInterval(function() {
      timeLeft = timeLeft - 1;
      timerBox.innerHTML = timeLeft + "s";
      progressBar.style.width = (timeLeft / timePerQuestion) * 100 + "%";
  
     
      if (timeLeft <= 0) {
        stopTimer();
        goToNext(true);
      }
    }, 1000);
  }
  
  
  nextBtn.onclick = function() {
    goToNext(false);   
  };
  
  
  function goToNext(timedOut) {
    if (alreadySubmitted) return;   
    alreadySubmitted = true;
    stopTimer();
  
    let questionData = questions[currentQuestion];
  
    
    currentQuestion = currentQuestion + 1;
  
    
    if (currentQuestion >= questions.length) {
      showResults();
    } else {
      showQuestion();
    }
  }
  

  function showResults() {
    quizScreen.style.display = "none";
    resultsScreen.style.display = "block";
  
    finalScoreBox.innerHTML = "Quiz complete!";
  }
  
  
  