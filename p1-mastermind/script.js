//Creating grid for guesses 10x4
const guessArea = document.querySelector(".guessArea");
for (let i = 0; i < 40; i++) {
  const guessCell = document.createElement("div");
  guessCell.classList.add("guessCell");
  // guessCell.classList.add("guess" + i);
  guessCell.id = "guess" + i;
  guessArea.append(guessCell);
}
//creating grid for hints 20x2
const hintArea = document.querySelector(".hintArea");
for (let i = 0; i < 40; i++) {
  const hintCell = document.createElement("div");
  hintCell.classList.add("hintCell");
  // hintCell.classList.add("hint" + i);
  hintCell.id = "hint" + i;
  hintArea.append(hintCell);
}
//colour library (for selecting cells)
colours = {
  red: "rgb(237, 105, 84)",
  blue: "rgb(91, 127, 189)",
  green: "rgb(59, 99, 72)",
  yellow: "rgb(233, 252, 136)",
  orange: "rgb(254, 181, 140)",
  purple: "rgb(211, 189, 236)",
};

//initialise
let selectedColour;
let currentGuessCells = ["guess36", "guess37", "guess38", "guess39"];
let currentHintCells = ["hint36", "hint37", "hint38", "hint39"];
let currentRow = 10; //start from the bottom
let possibleColours = [
  colours.blue,
  colours.green,
  colours.red,
  colours.yellow,
  colours.orange,
  colours.purple,
];
let hasWon = false;

let cell1, cell2, cell3, cell4;
let submittedCells = [];

//math.random give 0-0.999, *6 and math floor will give 0-5
let randomColourGenerator = [
  possibleColours[Math.floor(Math.random() * 6)],
  possibleColours[Math.floor(Math.random() * 6)],
  possibleColours[Math.floor(Math.random() * 6)],
  possibleColours[Math.floor(Math.random() * 6)],
];
//answer

//for displaying colour picked
const yourSelectedColour = document.querySelector(".yourSelectedColour");
const colourPicker = document.querySelector(".colourPicker");
colourPicker.addEventListener("click", (e) => {
  yourSelectedColour.setAttribute("id", e.target.id);
  console.log(yourSelectedColour.id);
  return yourSelectedColour.id;
});

//for selecting colours
let guessCell = document.querySelectorAll(".guessCell");
for (const eachItem of guessCell) {
  eachItem.addEventListener("click", (e) => {
    object = e.target.id;
    if (isValid(object)) {
      console.log(e.target.id);
      console.log(yourSelectedColour.id);
      let currentColour = yourSelectedColour.id;
      e.target.style.backgroundColor = colours[currentColour];
    }
  });
}

//submitting guess
const submitBtn = document.querySelector(".submitBtn");
submitBtn.addEventListener("click", () => {
  giveHints();
  checkWin();
  nextRow();
});

//move to next row
function nextRow() {
  currentRow -= 1;
  currentGuessCells = [
    "guess" + (currentRow * 4 - 4),
    "guess" + (currentRow * 4 - 3),
    "guess" + (currentRow * 4 - 2),
    "guess" + (currentRow * 4 - 1),
  ];
  currentHintCells = [
    "hint" + (currentRow * 4 - 4),
    "hint" + (currentRow * 4 - 3),
    "hint" + (currentRow * 4 - 2),
    "hint" + (currentRow * 4 - 1),
  ];
}

//can only start from the bottom & prevent selection when game has ended
function isValid(id) {
  if (currentGuessCells.includes(id) && hasWon === false) {
    return true;
  }
  return false;
}

//winning logic
const randomColour1 = document.getElementById("randomColour1");
const randomColour2 = document.getElementById("randomColour2");
const randomColour3 = document.getElementById("randomColour3");
const randomColour4 = document.getElementById("randomColour4");
function checkWin() {
  if (
    randomColourGenerator[0] === cell1 &&
    randomColourGenerator[1] === cell2 &&
    randomColourGenerator[2] === cell3 &&
    randomColourGenerator[3] === cell4
  ) {
    hasWon = true;
    alert("you won, displaying hidden code");
    // randomColour1.style.backgroundColour = randomColourGenerator[0];
    // randomColour2.style.backgroundColour = randomColourGenerator[1];
    // randomColour3.style.backgroundColour = randomColourGenerator[2];
    // randomColour4.style.backgroundColour = randomColourGenerator[3];
  }
  // console.log(submittedCells);
  console.log(randomColourGenerator);
  return hasWon;
}

//hints
function giveHints() {
  const currentCell0 = document.getElementById(currentGuessCells[0]);
  cell1 = getComputedStyle(currentCell0).backgroundColor;
  const currentCell1 = document.getElementById(currentGuessCells[1]);
  cell2 = getComputedStyle(currentCell1).backgroundColor;
  const currentCell2 = document.getElementById(currentGuessCells[2]);
  cell3 = getComputedStyle(currentCell2).backgroundColor;
  const currentCell3 = document.getElementById(currentGuessCells[3]);
  cell4 = getComputedStyle(currentCell3).backgroundColor;
  // submittedCells = [cell1, cell2, cell3, cell4];
  // return submittedCells;
  return cell1, cell2, cell3, cell4;
}
