//Creating grid for guesses 10x4
const guessArea = document.querySelector(".guessArea");
for (let i = 0; i < 40; i++) {
  const guessCell = document.createElement("div");
  guessCell.classList.add("guessCell");
  guessCell.id = "guess" + i;
  guessArea.append(guessCell);
}
//creating grid for hints 20x2
const hintArea = document.querySelector(".hintArea");
for (let i = 0; i < 40; i++) {
  const hintCell = document.createElement("div");
  hintCell.classList.add("hintCell");
  hintCell.id = "hint" + i;
  hintArea.append(hintCell);
}

//initialise
let selectedColour = "white";
let currentGuessCells = ["guess39", "guess38", "guess37", "guess36"];
let currentHintCells = ["hint36", "hint37", "hint38", "hint39"];
let currentRow = 10; //start from the back
let possibleColours = ["blue", "green", "red", "yellow", "orange", "pink"];

let cell1, cell2, cell3, cell4;

let randomColourGenerator = [
  possibleColours[Math.floor(Math.random() * 6)],
  possibleColours[Math.floor(Math.random() * 6)],
  possibleColours[Math.floor(Math.random() * 6)],
  possibleColours[Math.floor(Math.random() * 6)],
];

const yourSelectedColour = document.querySelector(".yourSelectedColour");
const colourPicker = document.querySelector(".colourPicker");
colourPicker.addEventListener("click", (e) => {
  yourSelectedColour.setAttribute("id", e.target.id);
});
let guessCell = document.querySelectorAll(".guessCell");
for (const eachItem of guessCell) {
  eachItem.addEventListener("click", (e) => {
    e.target.setAttribute("id", yourSelectedColour.id);
  });
}
