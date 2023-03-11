const inputEl = document.querySelector("input");
const buttonEl = document.querySelector("button");
const timerEl = document.querySelector("span");

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
const createTimerAnimator = () => {
  let timer;
  let timerSeconds;

  const clearTimerData = (seconds = 0) => {
    clearInterval(timer);
    timerSeconds = seconds;
    timerEl.innerHTML = "hh:mm:ss";
  };

  return (seconds) => {
    clearTimerData(seconds);

    timer = setInterval(() => {
      if (timerSeconds === 0) {
        clearTimerData();

        return;
      }

      const format = (value) => {
        return value < 10 ? "0" + value : value;
      };

      const displayedHours = format(Math.floor(timerSeconds / 3600));
      const displayedSeconds = format(timerSeconds % 60);
      const displayedMinutes = format(
        Math.floor(
          (timerSeconds - (displayedHours * 3600 + displayedSeconds)) / 60
        )
      );

      timerEl.innerHTML = `${displayedHours}:${displayedMinutes}:${displayedSeconds}`;
      timerSeconds--;
    }, 1000);
  };
};

const animateTimer = createTimerAnimator();

inputEl.addEventListener("input", () => {
  // Очистите input так, чтобы в значении
  // оставались только числа

  inputEl.value = inputEl.value
    .split("")
    .filter((char) => !isNaN(Number(char)))
    .join("");
});

buttonEl.addEventListener("click", () => {
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = "";
});
