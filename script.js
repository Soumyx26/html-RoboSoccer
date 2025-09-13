let scores = { team1: 0, team2: 0 };
let matchTime = 0;
let timerInterval = null;
let isTimerRunning = false;
let matchDuration = 0;

function changeScore(team, change) {
  scores[team] = Math.max(0, scores[team] + change);
  document.getElementById('score' + (team === 'team1' ? '1' : '2')).textContent = scores[team];
  if (change > 0) showGoalAnimation();
}

function resetMatch() {
  scores = { team1: 0, team2: 0 };
  document.getElementById('score1').textContent = '0';
  document.getElementById('score2').textContent = '0';
  matchTime = 0;
  matchDuration = 0;
  updateTimer();
  clearInterval(timerInterval);
  timerInterval = null;
  isTimerRunning = false;
  document.getElementById('timerBtn').textContent = 'Start Timer';
}

function toggleTimer() {
  const btn = document.getElementById('timerBtn');
  
  if (isTimerRunning) {
    // Pause timer
    clearInterval(timerInterval);
    isTimerRunning = false;
    btn.textContent = 'Start Timer';
  } else {
    // If no duration set or match finished, ask for new duration
    if (matchDuration === 0 || matchTime >= matchDuration) {
      let mins = prompt("Enter match duration in minutes:", "5");
      if (mins === null) return;
      matchDuration = parseInt(mins) * 60;
      matchTime = 0;
      updateTimer();

      // ✅ don’t auto-start after setting duration
      btn.textContent = 'Start Timer';
      return;
    }

    // Start the timer
    timerInterval = setInterval(() => {
      matchTime++;
      updateTimer();
      if (matchTime >= matchDuration) {
        clearInterval(timerInterval);
        isTimerRunning = false;
        btn.textContent = 'Start Timer';
        showOverlay('timeUpOverlay');
      }
    }, 1000);

    isTimerRunning = true;
    btn.textContent = 'Pause Timer';
  }
}

function updateTimer() {
  const minutes = Math.floor(matchTime / 60);
  const seconds = matchTime % 60;
  document.getElementById('timer').textContent =
    `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function showOverlay(id) {
  const overlay = document.getElementById(id);
  overlay.classList.add('show');
  setTimeout(() => overlay.classList.remove('show'), 2000);
}

function showGoalAnimation() {
  const overlay = document.getElementById('goalOverlay');
  overlay.innerHTML = '<div class="football"></div><div class="goal-text">GOAL!</div>';
  overlay.classList.add('show');
  setTimeout(() => {
    overlay.classList.remove('show');
    overlay.innerHTML = '';
  }, 2500);
}
