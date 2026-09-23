//Ibrahima's Cosmic Dance//

//I used some arithmetic operators and system variables to create a dynamic cosmic dance effect. 
//The elements respond to mouse movements and clicks, creating an interactive experience.

let starSize = 25; // Declared variable 1: Base size for our cosmic elements
let angle = 0;     // Declared variable 2: Used to animate over time

function setup() {
  createCanvas(800, 800);
  background(15, 15, 35); // Deep space background
  noStroke();
}

function draw() {
  // Semi-transparent background creates a fading motion trail
  background(15, 15, 35, 30);

  // Value incrementing over time
  angle = angle + 0.05;

  // Using arithmetic operators (+, *, /) and system variables (mouseX, mouseY)
  let pulseOffset = sin(angle) * 15;
  let dynamicSize = starSize + pulseOffset; 
  let mirrorX = width - mouseX; // Arithmetic operator (-)
  let mirrorY = height - mouseY; // Arithmetic operator (-)

  // Primary interactive element following the mouse
  fill(120, 220, 255, 180);
  ellipse(mouseX, mouseY, dynamicSize * 1.5, dynamicSize * 1.5);

  // Secondary mirrored element moving in tandem
  fill(255, 140, 200, 140);
  ellipse(mirrorX, mirrorY, dynamicSize, dynamicSize);
}

// Event function: Change base star size randomly when mouse is clicked
function mousePressed() {
  starSize = random(15, 60);
}

// Event function: Clear or reset background when any key is pressed
function keyPressed() {
  background(15, 15, 35);
}


// Event function: Clears the canvas when any key is pressed
function keyPressed() {
  background(15, 15, 30, 30);
}
    
