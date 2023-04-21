const $ = (selector) => document.querySelector(selector);

document.addEventListener("DOMContentLoaded", () => {
  $("#startGame").addEventListener("click", main);
  //$("#startGameHard").addEventListener("click", main2, hard);
});

const board_border = 'black';
const board_background = "white";
const snake_col = 'lightblue';
const snake_border = 'darkblue';

let snake = [  {x: 400, y: 400},  {x: 390, y: 400},  {x: 380, y: 400},  {x: 370, y: 400},  {x: 360, y: 400},];

let score = 0;
// True if changing direction
let changing_direction = false;
// Horizontal velocity
let food_x;
let food_y;
let enemy_x;
let enemy_y;
let dx = 10;
// Vertical velocity
let dy = 0;
//let hardmode = 0;

 /*function hard(){
  hardmode = 1;
 };*/

// Get the canvas element
const snakeboard = document.getElementById("snakeboard");
// Return a two dimensional drawing context
const snakeboard_ctx = snakeboard.getContext("2d");

gen_food();
gen_enemy();

document.addEventListener("keydown", change_direction);

// main function called repeatedly to keep the game running
function main() {

    $("#startGame").style.display = "none";
    //$("#startGameHard").style.display = "none";

    if (has_game_ended()) return;

    changing_direction = false;

  const runTimer = () => {
    timer = setTimeout(
      () => {
        clear_board();
        drawFood();
        drawEnemy();
        move_snake();
        drawSnake();
        // Repeat
        main();
      }, 100);
  }

  runTimer();

  $("#restart").onclick = function funky(){

    console.log("help me dear god");
    clearTimeout(runTimer);
    runTimer();
    snake = [  {x: 400, y: 400},  {x: 390, y: 400},  {x: 380, y: 400},  {x: 370, y: 400},  {x: 360, y: 400},];
    $("#gameOver").classList.toggle("hide");
    score = 0;
    document.getElementById('score').innerHTML = score;
  }
}


/*function main2() {
  
  console.log(hardmode)
  
  $("#startGame").style.display = "none";
  $("#startGameHard").style.display = "none";
  
  if (has_game_ended()) return;
  
  changing_direction = false;
  
  const runTimer = () => {
    timer = setTimeout(
      () => {
      clear_board();
      drawFood();
      drawEnemy();
      move_snake();
      drawSnake();
      // Repeat
      main();
    }, 100);
}

runTimer();

$("#restart").onclick = function funky(){

  console.log("help me dear god");
  clearTimeout(runTimer);
  runTimer();
  snake = [  {x: 400, y: 400},  {x: 390, y: 400},  {x: 380, y: 400},  {x: 370, y: 400},  {x: 360, y: 400},];
  $("#gameOver").classList.toggle("hide");
  score = 0;
  document.getElementById('score').innerHTML = score;
}
} */

// draw a border around the canvas
function clear_board() {
  //  Select the colour to fill the drawing
  snakeboard_ctx.fillStyle = board_background;
  //  Select the colour for the border of the canvas
  snakeboard_ctx.strokestyle = board_border;
  // Draw a "filled" rectangle to cover the entire canvas
  snakeboard_ctx.fillRect(0, 0, snakeboard.width, snakeboard.height);
  // Draw a "border" around the entire canvas
  snakeboard_ctx.strokeRect(0, 0, snakeboard.width, snakeboard.height);
}

// Draw the snake on the canvas
function drawSnake() {
  // Draw each part
  snake.forEach(drawSnakePart)
}

function drawFood() {
  snakeboard_ctx.fillStyle = 'lightgreen';
  snakeboard_ctx.strokestyle = 'darkgreen';
  snakeboard_ctx.fillRect(food_x, food_y, 10, 10);
  snakeboard_ctx.strokeRect(food_x, food_y, 10, 10);
};

function drawEnemy() {
  //if (hardmode == 1){
 snakeboard_ctx.fillStyle = '#FF0000';
 snakeboard_ctx.strokestyle = 'darkred';
 snakeboard_ctx.fillRect(enemy_x, enemy_y, 10, 10);
 snakeboard_ctx.strokeRect(enemy_x, enemy_y, 10, 10);
  //};
};

// Draw one snake part
function drawSnakePart(snakePart) {

  // Set the colour of the snake part
  snakeboard_ctx.fillStyle = snake_col;
  // Set the border colour of the snake part
  snakeboard_ctx.strokestyle = snake_border;
  // Draw a "filled" rectangle to represent the snake part at the coordinates
  // the part is located
  snakeboard_ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  // Draw a border around the snake part
  snakeboard_ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

function has_game_ended() {
  for (let i = 4; i < snake.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
  }
  const hitLeftWall = snake[0].x < 0;
  const hitRightWall = snake[0].x > snakeboard.width - 10;
  const hitTopWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > snakeboard.height - 10;

  if (hitLeftWall || hitRightWall || hitTopWall || hitBottomWall){
   $("#gameOver").classList.toggle("hide");
  };   
  return hitLeftWall || hitRightWall || hitTopWall || hitBottomWall

}

function random_food(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function random_enemy(min, max) {
  return Math.round((Math.random() * (max-min) + min) / 10) * 10;
}

function gen_food() {
  // Generate a random number the food x-coordinate
  food_x = random_food(0, snakeboard.width - 10);
  // Generate a random number for the food y-coordinate
  food_y = random_food(0, snakeboard.height - 10);
  // if the new food location is where the snake currently is, generate a new food location
  snake.forEach(function has_snake_eaten_food(part) {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) gen_food();
  });
}

function gen_enemy() {
  enemy_x = random_enemy(0, snakeboard.width - 10);
  enemy_y = random_enemy(0, snakeboard.height - 10);
  snake.forEach(function has_snake_eaten_enemy(part) {
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) gen_enemy();
  });
}

function change_direction(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;
  const Up = 87;
  const Down = 83;
  const Left = 65;
  const Right = 68;
  
// Prevent the snake from reversing

  if (changing_direction) return;
  changing_direction = true;
  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;
  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === DOWN_KEY && !goingUp) {
    dx = 0;
    dy = 10;
  }

  if (keyPressed === Left && !goingRight) {
    dx = -10;
    dy = 0;
  }
  if (keyPressed === Up && !goingDown) {
    dx = 0;
    dy = -10;
  }
  if (keyPressed === Right && !goingLeft) {
    dx = 10;
    dy = 0;
  }
  if (keyPressed === Down && !goingUp) {
    dx = 0;
    dy = 10;
  }
}

function move_snake() {
  // Create the new Snake's head
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  // Add the new head to the beginning of snake body
  snake.unshift(head);
  const has_eaten_enemy = snake[0].x === enemy_x && snake[0].y === enemy_y;
   if (has_eaten_enemy) {
    $("#gameOver").classList.toggle("hide");
    clearTimeout(runTimer);
   } 

  const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
  if (has_eaten_food) {
    // Increase score
    score += 10;
    // Display score on screen
    document.getElementById('score').innerHTML = score;
    // Generate new food location
    gen_food();
  } else {
    // Remove the last part of snake body
    snake.pop();
  }
}