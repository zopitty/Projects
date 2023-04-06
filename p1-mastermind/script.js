//Creating grid for guesses 10x4
const guessArea = document.querySelector(".guessArea");
for (let i = 0; i < 40; i++) {
  const guessCell = document.createElement("div");
  guessCell.classList.add("guessCell");
  guessCell.id = "guess" + i;
  guessCell.setAttribute("ondrop", "drop(event)");
  guessCell.setAttribute("ondragover", "dragOver(event)");
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

//math.random give 0-0.999, *6 and math floor will give 0-5
let generatedColours = [
  possibleColours[Math.floor(Math.random() * 6)],
  possibleColours[Math.floor(Math.random() * 6)],
  possibleColours[Math.floor(Math.random() * 6)],
  possibleColours[Math.floor(Math.random() * 6)],
];
//answer
console.log(generatedColours);

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
      console.log(object);
      let currentColour = yourSelectedColour.id;
      e.target.style.backgroundColor = colours[currentColour];
    }
  });
}

//submitting guess
const submitBtn = document.querySelector(".submitBtn");
submitBtn.addEventListener("click", () => {
  if (currentRow >= 1 && hasWon === false) {
    giveHints();
    checkWin();
    nextRow();
    message.innerText = "TRIES LEFT: " + currentRow;
  }
  if (currentRow === 0 && hasWon === false) {
    winningMessage.innerText = "YOU LOST";
    message.innerText = "TRIES LEFT: " + currentRow;
    randomColour1.style.backgroundColor = generatedColours[0];
    randomColour2.style.backgroundColor = generatedColours[1];
    randomColour3.style.backgroundColor = generatedColours[2];
    randomColour4.style.backgroundColor = generatedColours[3];
  }
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
function checkWin() {
  if (
    generatedColours[0] === cell1 &&
    generatedColours[1] === cell2 &&
    generatedColours[2] === cell3 &&
    generatedColours[3] === cell4
  ) {
    hasWon = true;
    randomColour1.style.backgroundColor = generatedColours[0];
    randomColour2.style.backgroundColor = generatedColours[1];
    randomColour3.style.backgroundColor = generatedColours[2];
    randomColour4.style.backgroundColor = generatedColours[3];
    winningMessage.innerText = "YOU WON";
  }
  return hasWon;
}

//submit + hints
function giveHints() {
  //for checkWin function
  const currentCell0 = document.getElementById(currentGuessCells[0]);
  cell1 = getComputedStyle(currentCell0).backgroundColor;
  const currentCell1 = document.getElementById(currentGuessCells[1]);
  cell2 = getComputedStyle(currentCell1).backgroundColor;
  const currentCell2 = document.getElementById(currentGuessCells[2]);
  cell3 = getComputedStyle(currentCell2).backgroundColor;
  const currentCell3 = document.getElementById(currentGuessCells[3]);
  cell4 = getComputedStyle(currentCell3).backgroundColor;

  const hintCell1 = document.getElementById(currentHintCells[0]);
  const hintCell2 = document.getElementById(currentHintCells[1]);
  const hintCell3 = document.getElementById(currentHintCells[2]);
  const hintCell4 = document.getElementById(currentHintCells[3]);

  let fillHints = []; //to gather hints
  let accountedCell = []; //to account for cells so no repeat when scanning white hints
  let generatedColoursCopy = [...generatedColours]; //to remove cells that are already accounted for

  //Check for correct position and colour
  if (cell1 === generatedColours[0]) {
    fillHints.push("red");
    let index = generatedColoursCopy.indexOf(cell1);
    if (index !== -1) {
      generatedColoursCopy.splice(index, 1);
    }
    accountedCell.push("accountedCell1");
  }
  if (cell2 === generatedColours[1]) {
    fillHints.push("red");
    let index = generatedColoursCopy.indexOf(cell2);
    if (index !== -1) {
      generatedColoursCopy.splice(index, 1);
    }
    accountedCell.push("accountedCell2");
  }
  if (cell3 === generatedColours[2]) {
    fillHints.push("red");
    let index = generatedColoursCopy.indexOf(cell3);
    if (index !== -1) {
      generatedColoursCopy.splice(index, 1);
    }
    accountedCell.push("accountedCell3");
  }
  if (cell4 === generatedColours[3]) {
    fillHints.push("red");
    let index = generatedColoursCopy.indexOf(cell4);
    if (index !== -1) {
      generatedColoursCopy.splice(index, 1);
    }
    accountedCell.push("accountedCell4");
  }

  //check for correct colour
  if (
    generatedColoursCopy.includes(cell1) &&
    !accountedCell.includes("accountedCell1")
  ) {
    fillHints.push("white");
    let index = generatedColoursCopy.indexOf(cell1);
    if (index !== -1) {
      generatedColoursCopy.splice(index, 1);
    }
  }
  if (
    generatedColoursCopy.includes(cell2) &&
    !accountedCell.includes("accountedCell2")
  ) {
    fillHints.push("white");
    let index = generatedColoursCopy.indexOf(cell2);
    if (index !== -1) {
      generatedColoursCopy.splice(index, 1);
    }
  }
  if (
    generatedColoursCopy.includes(cell3) &&
    !accountedCell.includes("accountedCell3")
  ) {
    let index = generatedColoursCopy.indexOf(cell3);
    if (index !== -1) {
      generatedColoursCopy.splice(index, 1);
    }
    fillHints.push("white");
  }
  if (
    generatedColoursCopy.includes(cell4) &&
    !accountedCell.includes("accountedCell4")
  ) {
    let index = generatedColoursCopy.indexOf(cell4);
    if (index !== -1) {
      generatedColoursCopy.splice(index, 1);
    }
    fillHints.push("white");
  }

  hintCell1.style.backgroundColor = fillHints[0];
  hintCell2.style.backgroundColor = fillHints[1];
  hintCell3.style.backgroundColor = fillHints[2];
  hintCell4.style.backgroundColor = fillHints[3];
  console.log(accountedCell);
  console.log(fillHints);
  console.log(generatedColoursCopy);

  return cell1, cell2, cell3, cell4;
}

//EXTRAS do for fun
//dragging and dropping
function drop(e) {
  object = e.target.id;
  if (isValid(object)) {
    e.preventDefault();
    let data = e.dataTransfer.getData("data");
    e.target.style.backgroundColor = colours[data];
  }
}

function drag(e) {
  yourSelectedColour.setAttribute("id", e.target.id);
  e.dataTransfer.setData("data", e.target.id);
}

function dragOver(e) {
  e.preventDefault();
}

//winning message
const winningMessage = document.querySelector(".winningMessage");
const message = document.querySelector(".message");
message.innerText = "TRIES LEFT: " + currentRow;

//restart game
const restartBtn = document.querySelector(".restartBtn");
restartBtn.addEventListener("click", () => {
  location.reload();
});
