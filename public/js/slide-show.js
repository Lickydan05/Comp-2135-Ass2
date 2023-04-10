"use strict";

const $ = (selector) => document.querySelector(selector);

let imageCounter = 0; //counter to make the images cycle

const caption = $("#caption");
const mainImage = $("#main_image");
let imageCache = [];

//Takes counter, adds 1 to the max of the % of how many images there are, and then changes the main img to whatever the array's current value's image is.
const swapImage = ()=>{ 
    imageCounter = (imageCounter +1) % imageCache.length;
    
    mainImage.src = imageCache[imageCounter].src;
    mainImage.alt = imageCache[imageCounter].alt;
    
    caption.textContent = imageCache[imageCounter].alt;
}

document.addEventListener("DOMContentLoaded", () => {
    //changed from "a" b/c it was taking from the menu/footer and I couldn't figure out the :not function so I just used the classes instead
    const links= document.querySelectorAll(".workplz"); 
    let image;    
    
    for (let link of links){ //loops for the length of whatever is inside the "links"
        image = new Image();
        
        image.src = link.href;//Change image to the link's 'link' to get the image from it
        image.alt = link.title;//Same thing but with the alt
        
        //pushes the image back to the array to be displayed and counted
        imageCache.push(image); 
    }
    //allows the buttons to be clicked and do functions
    $(".previous").addEventListener("click", prev); 
    $(".next").addEventListener("click", nxt);
    $(".start").addEventListener("click", start);
    $(".stop").addEventListener("click", stop);
});
var timer = setInterval(swapImage,1000); //Timer starts automatically

function start(){ //Manual timer start
    timer = setInterval(swapImage,4000);
}

function stop(){ //Manual timer stop
    clearInterval(timer);
}

function prev(){  //Manual timer stop + changes the image to the previous image
   clearInterval(timer);
   if (imageCounter <= 0) {
    imageCounter = imageCache.length;
   }; //Stops the shit from breaking and resets it back to the end img

   imageCounter = (imageCounter - 1) % imageCache.length;
    
   mainImage.src = imageCache[imageCounter].src;
   mainImage.alt = imageCache[imageCounter].alt;
   
   caption.textContent = imageCache[imageCounter].alt;
}

function nxt(){ //Manual timer stop + changes the image to the next image
    clearInterval(timer);
    imageCounter = (imageCounter + 1) % imageCache.length;
    
    mainImage.src = imageCache[imageCounter].src;
    mainImage.alt = imageCache[imageCounter].alt;
    
    caption.textContent = imageCache[imageCounter].alt;
}
