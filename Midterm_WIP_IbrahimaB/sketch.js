// Game State variable: "start", "game", "win", or "gameover"
let gameState = "start";

// Game Variables
let starX, starY;
let starSize = 40;
let score = 0;
let targetScore = 10;

// Timer variables (30 seconds total)
let totalTime = 30; // 30 seconds
let startTime = 0;

// Falling Green Orb variables
let orbX, orbY;
let orbSize = 25;
let orbSpeed = 3;

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
}

function draw() {
  // 1. START SCREEN (Blue Background)
  if (gameState === "start") {
    background(30, 100, 200); // Blue
    
    fill(255);
    textSize(28);
    text("COSMIC PULSE: STAR COLLECTOR", width / 2, height / 2 - 40);
    
    textSize(16);
    text("Collect 10 green orbs within 30 seconds to win!", width / 2, height / 2 + 10);
    text("Click anywhere to start game", width / 2, height / 2 + 60);
  }
  
  // 2. MAIN GAME SCREEN (Black Background)
  else if (gameState === "game") {
    background(10, 10, 25); // Black
    
    // --- TIMER LOGIC ---
    // Calculate how many seconds have passed since game started
    let elapsedSeconds = (millis() - startTime) / 1000;
    let timeLeft = ceil(totalTime - elapsedSeconds);
    
    // Check if time ran out
    if (timeLeft <= 0) {
      timeLeft = 0;
      gameState = "gameover";
    }
    
    // --- PLAYER (Blue Star) FOLLOWS MOUSE ---
    starX = mouseX;
    starY = mouseY;
    
    // Draw Blue Star
    fill(100, 200, 255);
    noStroke();
    ellipse(starX, starY, starSize, starSize);
    
    // --- FALLING GREEN ORB LOGIC ---
    // Move orb down
    orbY = orbY + orbSpeed;
    
    // If orb goes off the bottom, respawn it at the top at a random X
    if (orbY > height + 20) {
      orbY = -20;
      orbX = random(50, width - 50);
    }
    
    // Draw Green Orb
    fill(50, 255, 100);
    ellipse(orbX, orbY, orbSize, orbSize);
    
    // --- COLLISION DETECTION (Did the star touch the orb?) ---
    let distance = dist(starX, starY, orbX, orbY);
    if (distance < (starSize / 2 + orbSize / 2)) {
      score = score + 1;       // Add 1 to score
      orbY = -20;              // Respawn orb at top
      orbX = random(50, width - 50);
      orbSpeed = orbSpeed + 0.3; // Make it slightly faster each time!
    }
    
    // Check if player reached 10 points (WIN)
    if (score >= targetScore) {
      gameState = "win";
    }
    
    // --- UI DISPLAY ---
    fill(255);
    textSize(16);
    textAlign(LEFT, TOP);
    text("Score: " + score + " / " + targetScore, 20, 20);
    text("Time Left: " + timeLeft + "s", 20, 45);
    textAlign(CENTER, CENTER); // Reset text align
  }
  
  // 3. WIN SCREEN (Green Background)
  else if (gameState === "win") {
    background(40, 160, 80); // Green
    
    fill(255);
    textSize(32);
    text("Congratulations, You Win!", width / 2, height / 2 - 30);
    
    textSize(16);
    text("Click anywhere to play again", width / 2, height / 2 + 30);
  }
  
  // 4. GAME OVER SCREEN (Red Background)
  else if (gameState === "gameover") {
    background(180, 40, 40); // Red
    
    fill(255);
    textSize(32);
    text("Game Over", width / 2, height / 2 - 30);
    
    textSize(16);
    text("Click anywhere to play again", width / 2, height / 2 + 30);
  }
}

// --- MOUSE INPUT TO START / RESTART ---
function mousePressed() {
  // If we are on the start, win, or gameover screen, clicking restarts/starts the game
  if (gameState === "start" || gameState === "win" || gameState === "gameover") {
    score = 0;
    orbSpeed = 3;
    orbX = random(50, width - 50);
    orbY = -20;
    startTime = millis(); // Reset timer clock
    gameState = "game";   // Switch to active gameplay
  }
}