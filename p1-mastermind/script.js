//Creating grid for guesses 10x4
const guessArea = document.querySelector(".guessArea");
for (let i = 0; i < 40; i++) {
  const guessCell = document.createElement("div");
  guessCell.classList.add("guessCell");
  guessArea.append(guessCell);
}

//creating grid for hints 20x2
const hintsArea = document.querySelector(".hintsArea");
for (let i = 0; i < 40; i++) {
  const hintsCell = document.createElement("div");
  hintsCell.classList.add("hintsCell");
  hintsArea.append(hintsCell);
}