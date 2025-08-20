const quotes = [
    "The quick brown fox jumps over the lazy dog multiple times just to keep itself entertained during a long and boring afternoon.",
    "Typing fast is not only a useful skill for programmers but also an incredible advantage in school, work, and everyday communication with people.",
    "JavaScript makes websites dynamic, interactive, and engaging, transforming static pages into powerful applications that people use daily without even realizing it.",
    "GitHub is your developer portfolio for interviews and an essential tool for contributing to open source, learning from others, and collaborating on real-world projects.",
    "Consistency is the key to becoming a great developer, whether you are learning to code, practicing typing, or improving any skill in your personal or professional life."
  ];
  
  const quoteEl = document.getElementById("quote");
  const inputEl = document.getElementById("input");
  const timerEl = document.getElementById("timer");
  const wpmEl = document.getElementById("wpm");
  const accuracyEl = document.getElementById("accuracy");
  const restartBtn = document.getElementById("restart");
  
  let timeLeft = 30;
  let timerInterval;
  let timerStarted = false;
  let currentQuote = "";
  let typedCharacters = 0;
  let errors = 0;
  
  function startGame() {
    currentQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteEl.textContent = currentQuote;
    inputEl.value = "";
    typedCharacters = 0;
    errors = 0;
    timeLeft = 30;
    timerEl.textContent = timeLeft;
    wpmEl.textContent = 0;
    accuracyEl.textContent = 100;
  
    clearInterval(timerInterval);
    timerStarted = false;
  }
  
  function startTimer() {
    if (timerStarted) return; // prevent multiple intervals
    timerStarted = true;
  
    timerInterval = setInterval(() => {
      timeLeft--;
      timerEl.textContent = timeLeft;
  
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        inputEl.disabled = true; // stop typing
        showResults();
      } else {
        updateStats();
      }
    }, 1000);
  }
  
  function updateStats() {
    let elapsedTime = 30 - timeLeft;
  
    let wordsTyped = inputEl.value.trim().split(/\s+/).filter(word => word.length > 0).length;
    let wpm = Math.round((wordsTyped / elapsedTime) * 60);
    wpmEl.textContent = isNaN(wpm) || !isFinite(wpm) ? 0 : wpm;
  
    let inputText = inputEl.value;
    typedCharacters = inputText.length;
  
    let correctChars = 0;
    for (let i = 0; i < inputText.length; i++) {
      if (inputText[i] === currentQuote[i]) {
        correctChars++;
      } else {
        errors++;
      }
    }
    let accuracy = Math.round((correctChars / typedCharacters) * 100);
    accuracyEl.textContent = isNaN(accuracy) ? 100 : accuracy;
  }
  
  function showResults() {
    quoteEl.textContent = "⏱ Time’s up! Check your results below.";
  }
  
  restartBtn.addEventListener("click", () => {
    inputEl.disabled = false;
    startGame();
  });
  
  inputEl.addEventListener("input", () => {
    startTimer();
    updateStats();
  });
  
  // Start first game
  startGame();
  