const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
// array of numbers to be shown on the reels
const reel1 = document.getElementById("number1"); // get the element for reel 1
const reel2 = document.getElementById("number2"); // get the element for reel 2
const reel3 = document.getElementById("number3"); // get the element for reel 3
let credits = 100; // starting credits for the player
const creditDisplay = document.getElementById("credits"); // get the element for displaying credits
let jackpot = 1000;
const jackpotAmount = document.getElementById("jackpot"); //Jackpot amount
let playerGuess;

function spin() {
  // check if the player have enough credits
  if (credits < 1) {
    const statusText = document.getElementById("status");
    const newT = document.createElement("p");
    newT.textContent = "Insert credits!";
    statusText.appendChild(newT);
    setTimeout(() => {
      statusText.removeChild(newT);
    }, 1000);
    return;
  }

  jackpot += 1 * 0.08; // 8% of each bet are added to JP pot
  jackpotAmount.textContent = Math.round(jackpot * 100) / 100; //update jackpot rounded to 2 decimals

  // randomly select a number from the array for each reel
  const num1 = numbers[Math.floor(Math.random() * numbers.length)];
  const num2 = numbers[Math.floor(Math.random() * numbers.length)];
  const num3 = numbers[Math.floor(Math.random() * numbers.length)];
  const reelsBet = document.querySelector(
    "input[name='reel-bet']:checked"
  ).value;

  // update the numbers on the reels after the animation finishes
  setTimeout(() => {
    reel1.textContent = num1;
    reel2.textContent = num2;
    reel3.textContent = num3;

    // check if the player has won
    let winAmount = 0;
    if (reelsBet === "1") {
      if (num1 === "8") {
        winAmount = 8.8; //Probability: 1 / 10;
      }
    } else if (reelsBet === "2") {
      if (num1 === "8" && num2 === "8") {
        winAmount = 88; //Probability: 1 / 100;
      }
    } else if (reelsBet === "3") {
      if (num1 === "8" && num2 === "8" && num3 === "8") {
        winAmount = 888; //Probability: 1 / 1000;
        playJackpot();
      }
    }

    // compute the new credits balance based on the outcome of the spin
    if (winAmount > 0) {
      credits += winAmount - 1;
      creditDisplay.textContent = Math.round(credits * 100) / 100;
      creditDisplay.style.color = "green"; //add green color
      setTimeout(() => {
        //remove green color after delay
        creditDisplay.style.color = "black";
      }, 800);
    } else {
      credits -= 1;
      creditDisplay.textContent = Math.round(credits * 100) / 100;
    }
  }, 1000);
}

//Jackpot

let result; //result of random draw for jackpot
function playJackpot() {
  result = Math.floor(Math.random() * 52) + 1; //generate number 1-52
  playerGuess = parseInt(
    prompt("Guess same number as PC and win JackPot! 1-52 ")
  );

  if (result === playerGuess) {
    credits += jackpot;
    creditDisplay.textContent = credits;
    jackpot = 1000;
    jackpotAmount.textContent = jackpot;
  }
}

// Icons & Pop Up

const settingsIcon = document.querySelector(".settings-icon"); //Icon
const settingsPopUp = document.querySelector(".popup-container"); // Pop up window

//show Setiings
settingsIcon.addEventListener("click", () => {
  settingsPopUp.style.display = "flex";
});

// Close Pop-up
const closePopupButtons = document.querySelectorAll(".close-popup");

closePopupButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const popup = button.closest(".popup-container");
    popup.style.display = "none";
  });
});

//Music

const music = document.getElementById("background-music");
const toggleMusicButton = document.getElementById("toggle-music");

toggleMusicButton.addEventListener("click", function () {
  if (music.paused) {
    music.play();
    toggleMusicButton.innerText = "Turn Off Music";
  } else {
    music.pause();
    toggleMusicButton.innerText = "Turn On Music";
  }
});

//Auto spin

var autoSpinInterval = null;

function autoSpin() {
  if (!autoSpinInterval) {
    autoSpinInterval = setInterval(function () {
      spin();
    }, 1000);
  }
}

function stopAutoSpin() {
  clearInterval(autoSpinInterval);
  autoSpinInterval = null;
}

document.querySelector(".auto-spin-btn").addEventListener("click", function () {
  if (autoSpinInterval) {
    stopAutoSpin();
    this.textContent = "AUTO";
  } else {
    autoSpin();
    this.textContent = "STOP";
  }
});
