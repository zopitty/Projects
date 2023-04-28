# Project 1: Mastermind

## Technologies used

- For loop is used to generate the grids for the guessing area and hints

- IDs are assigned to each cell to be used in the nextRow function

- Math floor and Math random are used to generate random colours in an array of objects

- click event listeners are used to for selecting the colours from the colour pricker and also for placing guesses

- a function is used to move where the player is able to input their guess through a mathematical calculation. This is combined with a function to check if the area where the player is trying to input their guess is valid with an isValid function which checks for the IDs of the cells

- checkWin function is used to check for the win. getComputedStyle is used retrieve the rgb value of the player's guesses which is then compared with the rgb values of the generated colours

- giveHints function makes use of empty arrays and if statements. if statements check the player's guess and then .push() is used to push the hint colour into the empty array. after checking through the player's guess the giveHints array will be used to assign hint pegs to the player

### Extras

- drag and drop function also introduced for more options to input guesses. draggable attribute of divs to be dragged are set to true. ondragstart is set (in HTML) to execute the function drag(e) (in javascript). Drop function calls for 'isValid' function to ensure players only start from the bottom row. On-drag the value of the chosen property is retrieved and on-drop the value is transferred to the selected cell. However, for the case in line 253, I added in colours to pull the data from the object declared in line 20 as I used colours with specific rgb values. (Eg. colours[purple] will give me the values of the property purple in the colours object.)

- restart button is a reload button. It reloads the entire page.

## General approach

Features were added to the game through a step-by-step process as to how the game is played. First, players are to pick out of 6 colours and are only allowed to start from the bottom row of the game. After which the computer is supposed to check on the player's guess and generate hints based on the hidden code. Codes that are in the correct position and of correct colour will give the player a red hint peg. Codes that are of the correct colour will give the player a white hint peg. PLayers will then try to make another guess with the hints given. The game will display a win if the players gets all the correct colours in correct positions. A loss is displayed when the player uses up all 10 tries. The hidden code is then revealed to the player for both scenarios.

## Link to the application

- not yet deployed

## Description of unsolved problems

At the time of writing, users are allowed to submit blank guesses but the computer will not generate blank codes. In the future, a function will be introduced to prevent submitting of blanks guesses or the computer will start generating blank hidden codes
