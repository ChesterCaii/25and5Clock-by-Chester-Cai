let breakIncrementButton = document.getElementById('break-increment');
let breakDecrementButton = document.getElementById('break-decrement');
let sessionIncrementButton = document.getElementById('session-increment');
let sessionDecrementButton = document.getElementById('session-decrement');
let startStopButton = document.getElementById('start_stop');
let resetButton = document.getElementById('reset');

let breakLength = document.getElementById('break-length');
let sessionLength = document.getElementById('session-length');
let timeLeft = document.getElementById('time-left');
let timerLabel = document.getElementById('timer-label');
let audio = document.getElementById('beep');

let timer;
let timerStatus = "begin"; // "begin", "counting", "stopped", "session", "break"

startStopButton.addEventListener("click", () => {
  if (timerStatus === "begin" || timerStatus === "stopped") {
    // Start the timer
    timerStatus = "counting";
    timer = setInterval(() => {
      timeLeft.innerText = decrementTime(timeLeft.innerText);
    }, 1000);
  } else if (timerStatus === "counting") {
    // Stop the timer
    timerStatus = "stopped";
    clearInterval(timer);
  }
});

resetButton.addEventListener("click", () => {
  if (timer) {
    clearInterval(timer); // Stop the timer if running
    timerStatus = "begin"; // Reset timer status
    audio.pause(); // Pause the audio
    audio.currentTime = 0; // Rewind audio to the beginning
    timeLeft.innerText = "25:00"; // Reset time display
    breakLength.innerText = "5"; // Reset break length
    sessionLength.innerText = "25"; // Reset session length
    timerLabel.innerText = "Session"; // Reset timer label
  }
});

function decrementTime(time) {
  const [minutes, seconds] = time.split(":").map(Number);

  if (minutes === 0 && seconds === 0) {
    // Timer reached zero
    audio.play(); // Play the audio
    if (timerStatus === "counting") {
      timerStatus = "break";
      timeLeft.innerText = formatTime(breakLength.innerText, 0);
      timerLabel.innerText = "Break";
    } else {
      timerStatus = "session";
      timeLeft.innerText = formatTime(sessionLength.innerText, 0);
      timerLabel.innerText = "Session";
    }
  } else if (seconds === 0) {
    return formatTime(minutes - 1, 59);
  } else {
    return formatTime(minutes, seconds - 1);
  }
}

function formatTime(minutes, seconds) {
  return (
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds
  );
}

breakIncrementButton.addEventListener("click", () => {
  if (timerStatus === "begin" || timerStatus === "stopped") {
    let newBreakLength = parseInt(breakLength.innerText) + 1;
    if (newBreakLength <= 60) {
      breakLength.innerText = newBreakLength.toString();
    }
  }
});

breakDecrementButton.addEventListener("click", () => {
  if (timerStatus === "begin" || timerStatus === "stopped") {
    let newBreakLength = parseInt(breakLength.innerText) - 1;
    if (newBreakLength >= 1) {
      breakLength.innerText = newBreakLength.toString();
    }
  }
});

sessionIncrementButton.addEventListener("click", () => {
  if (timerStatus === "begin" || timerStatus === "stopped") {
    let newSessionLength = parseInt(sessionLength.innerText) + 1;
    if (newSessionLength <= 60) {
      sessionLength.innerText = newSessionLength.toString();
      timeLeft.innerText = formatTime(newSessionLength, 0);
    }
  }
});

sessionDecrementButton.addEventListener("click", () => {
  if (timerStatus === "begin" || timerStatus === "stopped") {
    let newSessionLength = parseInt(sessionLength.innerText) - 1;
    if (newSessionLength >= 1) {
      sessionLength.innerText = newSessionLength.toString();
      timeLeft.innerText = formatTime(newSessionLength, 0);
    }
  }
});
