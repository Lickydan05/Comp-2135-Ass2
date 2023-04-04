"use strict";

const $ = (selector) => document.querySelector(selector);

const division = () => {
  //Get the value in the text inputs
  let division1 = $("#division_1").value;
  let division2 = $("#division_2").value;

  //Run the raw calculation
  let result = division1 / division2;

  //Converting to an integer use function parseInt(variable)
  //To get a number with decimals... parseFloat also exists...

  $("#division_result").value = result;
  $("#int_division_result").value = parseInt(result);
  $("#floor_division_result").value = Math.floor(result);
  $("#ceiling_division_result").value = Math.ceil(result);
  $("#rounded_division_result").value = Math.round(result);
};

const modulo = () => {
  //The modulo sign is %
  let modulo1 = $("#modulo_1").value;
  let modulo2 = $("#modulo_2").value;

  let result = modulo1 % modulo2;

  $("#modulo_result").value = result;
};

const forLoopIteration = () => {
  let forLimit = $("#for_limit").value;
  let forCounter = parseFloat($("#for_counter").value);
  let forIncrement = parseFloat($("#for_increment").value);
  let forDirection = $("#for_increment_direction").value;

  console.log(forDirection);

  //TODO:: If statement based off increment direction
  if (forDirection === "negative") {
    forIncrement = forIncrement * -1;
  }

  for (let iterator = 0; iterator < forLimit; iterator++) {
    //loop code goes here, IE: the code you want to run multiple times
    forCounter = forCounter + forIncrement;
  }

  //TODO:: update the result with the final value of counter
  $("#for_result").value = forCounter;
};

//Add all calculation functions
document.addEventListener("DOMContentLoaded", () => {
  $("#division_btn").addEventListener("click", division);
  $("#modulo_btn").addEventListener("click", modulo);
  $("#for_loop_btn").addEventListener("click", forLoopIteration);
});
