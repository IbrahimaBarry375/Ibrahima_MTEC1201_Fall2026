let baseSize = 20;
let pulseSpeed = 0.05;
let angle = 0;

function setup() {
  createCanvas(800, 700);
  background(20, 20, 40);
}

function draw() {
  // Semi-transparent background creates a fading motion trail
  background(20, 20, 40, 40);

  // Value incrementing over time
  angle += pulseSpeed;
  let currentSize = baseSize + sin(angle) * 10;

  // Conditional statement using if, else if, and else based on mouseX position
  let r, g, b;
  if (mouseX < width / 3) {
    // Left sector: Cyber Blue energy
    r = 50;
    g = 150;
    b = random(200, 255); // Using random() function
  } else if (mouseX < (width * 2) / 3) {
    // Middle sector: Neon Purple nebula
    r = random(150, 200);
    g = 50;
    b = 200;
  } else {
    // Right sector: Solar Gold flare
    r = 255;
    g = random(150, 220);
    b = 50;
  }

  // User input: Draw random scattered star dust when mouse is held down
  if (mouseIsPressed) {
    fill(r, g, b, 150);
    noStroke();
    let rx = mouseX + random(-40, 40);
    let ry = mouseY + random(-40, 40);
    ellipse(rx, ry, random(3, 9), random(3, 9));
  }

  // Main pulsing cosmic core following the mouse
  fill(r, g, b, 220);
  noStroke();
  ellipse(mouseX, mouseY, currentSize * 2, currentSize * 2);
  
  // Secondary mirrored element across the canvas center
  fill(255 - r, 255 - g, 255 - b, 100);
  ellipse(width - mouseX, height - mouseY, currentSize, currentSize);
}

// Keyboard input: Press the spacebar to randomize pulse speed
function keyPressed() {
  if (key === ' ') {
    pulseSpeed = random(0.02, 0.15);
    background(20, 20, 40); // Clear canvas
  }
}