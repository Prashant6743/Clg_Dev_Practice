// ============================================
// SIMPLE QUIZ APP - Beginner Friendly Version
// ============================================

// ----- 1. OUR QUESTIONS -----
// Each question has: the question text, 4 options, and which option is correct (0, 1, 2, or 3)
var questions = [
    { question: "q1 ", options: ["a", "b", " c", "d"], correctIndex: 1 },
    { question: "q2", options: ["a", "b", " c", "d"], correctIndex: 1 },
    { question: "q3", options: ["a", "b", " c", "d"], correctIndex: 1 },
    { question: "q4", options: ["a", "b", " c", "d"], correctIndex: 1 },
    { question: "q5", options: ["a", "b", " c", "d"], correctIndex: 1}
  ];
  
  
  var currentQuestion = 0;   
  var timeLeft = 90;         
  var myTimer = null;        
  var userChoice = null;     
  var alreadySubmitted = false; 
  var timePerQuestion = 4; 
  
  
  var startScreen = document.getElementById("start-screen");
  var quizScreen = document.getElementById("quiz-screen");
  var resultsScreen = document.getElementById("results-screen");
  var questionBox = document.getElementById("question");
  var optionsBox = document.getElementById("options");
  var timerBox = document.getElementById("timer");
  var progressBar = document.getElementById("progress-bar");
  var nextBtn = document.getElementById("next-btn");
  var finalScoreBox = document.getElementById("final-score");
  var startBtn = document.getElementById("start-btn");
  var restartBtn = document.getElementById("restart-btn");
  
  
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
  

    var questionData = questions[currentQuestion];
  
  
    var questionNumber = currentQuestion + 1;  
    questionBox.innerHTML = questionNumber + ". " + questionData.question;
  
    
    optionsBox.innerHTML = "";
  
  
    for (var i = 0; i < questionData.options.length; i++) {
     
      var label = document.createElement("label");
      label.className = "option";
  
      var radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "answer";   
      radio.value = i;       
  
          radio.onclick = function() {
        userChoice = parseInt(this.value, 10); 
        nextBtn.disabled = false;
      };
  
  
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
  
    var questionData = questions[currentQuestion];
  
    
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
  
  
  