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
//colour library
colours = {
  red: "#ed6954",
  blue: "#5b7fbd",
  green: "#3b6348",
  yellow: "#e9fc88",
  orange: "#feb58c",
  purple: "#d3bdec",
};

//initialise
let selectedColour;
let currentGuessCells = ["guess36", "guess37", "guess38", "guess39"];
let currentHintCells = ["hint36", "hint37", "hint38", "hint39"];
let currentRow = 10; //start from the bottom
let possibleColours = ["blue", "green", "red", "yellow", "orange", "purple"];
let hasWon = false;

let cell1, cell2, cell3, cell4;

//math.random give 0-0.999, *6 and math floor will give 0-5
let randomColourGenerator = [
  possibleColours[Math.floor(Math.random() * 6)],
  possibleColours[Math.floor(Math.random() * 6)],
  possibleColours[Math.floor(Math.random() * 6)],
  possibleColours[Math.floor(Math.random() * 6)],
];
console.log(randomColourGenerator);

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
function checkWin() {
  if (
    randomColourGenerator[0] === cell1 &&
    randomColourGenerator[1] === cell2 &&
    randomColourGenerator[2] === cell3 &&
    randomColourGenerator[3] === cell4
  ) {
    hasWon = true;
    alert("you won");
    randomColour1.id = randomColourGenerator[0];
    randomColour2.id = randomColourGenerator[1];
    randomColour3.id = randomColourGenerator[2];
    randomColour4.id = randomColourGenerator[3];
  }
  return hasWon;
}
