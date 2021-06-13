const startBtn = document.querySelector("#start");
const screens = document.querySelectorAll(".screen");
const timeList = document.querySelector("#time-list");
const timeEl = document.querySelector("#time");
const scoreEl = document.querySelector("#score");
const board = document.querySelector("#board");
let interval;
let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("mousedown", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    setScore(score);
    event.target.style.transform = "scale(0)";
    setTimeout(() => {
      event.target.remove();
    }, 70);
    createRandomCircle();
  }
});

function startGame() {
  clearInterval(interval);
  timeEl.parentElement.classList.remove("hide");
  scoreEl.parentElement.classList.remove("hide");
  board.innerHTML = "";

  interval = setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
  setScore(score);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    setTime(current);
  }
}

function setTime(value) {
  if (value < 10) {
    value = `0${value}`;
  }
  timeEl.innerHTML = `00:${value}`;
}

function setScore(value) {
  scoreEl.innerHTML = value;
}

function finishGame() {
  const retryButton = document.createElement("button");
  retryButton.innerText = "Retry";
  retryButton.classList.add("time-btn");
  retryButton.addEventListener("click", retry);
  board.innerHTML = `<div><h1>Счет: <span class="primary">${score}</span></h1></div>`;
  board.querySelector("div").append(retryButton);
  timeEl.parentElement.classList.add("hide");
  scoreEl.parentElement.classList.add("hide");
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  const rad = getRandomNumber(0, 360);

  circle.classList.add("circle");
  circle.style.background = `linear-gradient(${rad}deg, ${getRandomColor()} 0%, ${getRandomColor()} 100%)`;
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;

  board.append(circle);
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function retry() {
  screens[1].classList.remove("up");
  score = 0;
}

function getRandomColor() {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
