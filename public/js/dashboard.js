"use strict";

let enable = true

const $ = (selector) => document.querySelector(selector);

const postalRegEx =
  /^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z][ -]?\d[ABCEGHJ-NPRSTV-Z]\d$/i;

const onReset = (evt) => {
  resetErrors();

  $("#notifications").checked = true;

  $("#eco").checked = true;
  $("#temperature").value = 21;
  $("#location").value = "L7W 4T8";

  evt.preventDefault();
};

const resetErrors = () => {
  $("#temperature_error").textContent = "";
  $("#location_error").textContent = "";
  console.error("Fields Reset");
};

const onSubmit = (evt) => {
  resetErrors();

  let notificationsOn = $("#notifications").checked;

  $("#setting_notifications").textContent = notificationsOn ? "On" : "Off";

  let lightingModeOptions = document.querySelectorAll("[name='lighting_mode']");

  for (let i = 0; i < lightingModeOptions.length; i++) {
    if (lightingModeOptions[i].checked) {
      $("#setting_lighting_mode").textContent = lightingModeOptions[i].value;
    }
  }

  let location = $("#location").value;

  if (postalRegEx.test(location)) {
    $("#setting_location").textContent = location;
  } else {
    $("#location_error").textContent =
      "The postal code did not match the format required.";
  }


  let temperature = $("#temperature").value;
  let temperatureError = $("#temperature_error");

  if (isNaN(temperature) || temperature == "") {
    temperatureError.textContent = "This is not a valid temperature selection.";
  } else if (temperature > 25) {
    temperatureError.textContent =
      "Max temperature is 25C, setting temperature to Max";
    $("#setting_temperature").textContent = 25;
  } else if (temperature < 10) {
    temperatureError.textContent =
      "Min temperature is 10C, setting temperature to Min";
    $("#setting_temperature").textContent = 10;
  } else {
    $("#setting_temperature").textContent = temperature;
  }

  evt.preventDefault();
};

//Called from eventlistener bc of some issues with onclick
function TempTimer() {
  // Gets the time value
  const timeInput = document.getElementById("time");
  //Makes sure time is set correctly
  const timeRegex = /^([0-9]{1,2}):([0-9]{2})$/;
  //gets value of input and puts it into variable inputTime
  const inputTime = timeInput.value;
  //gets value of element with id of temp and stores in variable "temp"
  let temp = $("#temp").value;
  let temp_error = $("#temp_error"); //Temp error to be written over when needed
  let tempErrorValue = 0; //To make the code only work when there is no temp error
  
  if (isNaN(temp) || temp == "") {
    temp_error.textContent = "Do not leave temperature blank, or use something other than a number";
    tempErrorValue = 0
  } else if (temp > 25) {
    temp_error.textContent = "Max temperature is 25C";
    tempErrorValue = 0
  } else if (temp < 10) {
    temp_error.textContent = "Min temperature is 10C";
    tempErrorValue = 0
  } else {
    temp_error.textContent = "";
    tempErrorValue = 1 //Makes it run if there is no errors
  }

  //Checks if both timer and temp are valid with no errors
  if (timeRegex.test(inputTime) && tempErrorValue == 1) {
    
    
    $("#setting_temperature").textContent = temp; //changes setting temp to input temp
    const [hours, minutes] = inputTime.split(":"); //Reads the diff between hr & mins
    const minTotal = parseInt(hours) * 60 + parseInt(minutes); 
    
    // Converts from mins and hr's to milliseconds
    const setTime = minTotal * 60 * 1000;
    const now = new Date().getTime();
    const countDown = now + setTime;
    
    // Updates the countdown timer every second
    const timer = setInterval(function() {
      const currentDate = new Date().getTime();
      let distance = countDown - currentDate;

      
      // Calculates what time is left on the countdown
      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      // Display the remaining time
      $("#timerTemp").innerHTML = `${hours}h ${minutes}m ${seconds}s`;
      
      if (distance > 0) {
        $("#temp_button").disabled = true;
      };

      if (distance <= 0) {
        clearInterval(timer);
        $("#setting_temperature").textContent = $("#temperature").value;
        $("timerTemp").innerHTML = "Countdown finished!";
        $("#temp_button").disabled = false;
      };
      //Resets the interval
      $("#reset_temp").onclick = function func(){
        clearInterval(timer);
        $("#timerTemp").innerHTML = ""
        distance = 0
        console.log(distance)
        $("#setting_temperature").textContent = $("#temperature").value;
        $("#time").value = $("#time").placeholder;
        $("#temp").value = $("#temp").placeholder;
      
      // Clear the interval and display a message when the countdown is finished
      if (distance <= 0) {
        clearInterval(timer);
        $("#setting_temperature").textContent = $("#temperature").value;
        $("timerTemp").innerHTML = "Countdown finished!";
        $("#temp_button").disabled = false;
      };
    };
      
      $("#timer_error").textContent = ""
   }, 1000);
  } else if (timeRegex.test(inputTime) != true) { //error for timer
    $("#timer_error").textContent = "Please select valid numbers for the timer"
  }
}


document.addEventListener("DOMContentLoaded", () => {
  //Listeners for the rest of the code
  $("#date_display").textContent = new Date().toDateString();
  $("#reset_form").addEventListener("click", onReset);
  $("#update_settings").addEventListener("click", onSubmit);
  $("#temp_button").addEventListener("click", TempTimer);
});