// Game State variable: "start", "game", "win", or "gameover"
let gameState = "start";

// Game Stats
let score = 0;
let targetScore = 10;
let lives = 5;

// Timer variables (30 seconds)
let totalTime = 30;
let startTime = 0;

// Player (Blue Star) position
let starX, starY;

// Green Orb (Target) variables - Falls vertically and fast
let greenX, greenY;
let greenSize = 25;
let greenSpeed = 6;

// Red Orb (Obstacle) variables - Moves horizontally and slower
let redX, redY;
let redSize = 25;
let redSpeed = 4;

// Background space stars array
let bgStars = [];

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  rectMode(CENTER);
  
  // Create static background stars for space effect
  for (let i = 0; i < 50; i++) {
    bgStars.push({
      x: random(width),
      y: random(height)
    });
  }
}

function draw() {
  // 1. START SCREEN (Blue Background)
  if (gameState === "start") {
    background(30, 100, 200); // Blue
    
    fill(255);
    textSize(28);
    text("COSMIC PULSE: SPACE COLLECTOR", width / 2, height / 2 - 50);
    
    textSize(15);
    text("Collect 10 green orbs in 30 seconds!", width / 2, height / 2 - 10);
    text("Avoid the red orbs (You have 5 lives).", width / 2, height / 2 + 15);
    text("Click anywhere to start game", width / 2, height / 2 + 65);
  }
  
  // 2. MAIN GAME SCREEN (Black Background)
  else if (gameState === "game") {
    background(10, 10, 25); // Black
    
    // --- DRAW BACKGROUND SPACE STARS ---
    fill(255);
    noStroke();
    for (let i = 0; i < bgStars.length; i++) {
      ellipse(bgStars[i].x, bgStars[i].y, 2, 2);
    }
    
    // --- TIMER LOGIC ---
    let elapsedSeconds = (millis() - startTime) / 1000;
    let timeLeft = ceil(totalTime - elapsedSeconds);
    
    if (timeLeft <= 0) {
      timeLeft = 0;
      gameState = "gameover";
    }
    
    // --- PLAYER (Blue Star) FOLLOWS MOUSE ---
    starX = mouseX;
    starY = mouseY;
    
    // Draw the player as a real star shape
    fill(100, 200, 255);
    noStroke();
    drawStar(starX, starY, 12, 25, 5);
    
    // --- GREEN ORB LOGIC (Falls Vertically) ---
    greenY = greenY + greenSpeed;
    if (greenY > height + 20) {
      greenY = -20;
      greenX = random(50, width - 50);
    }
    
    fill(50, 255, 100);
    ellipse(greenX, greenY, greenSize, greenSize);
    
    // --- RED ORB LOGIC (Moves Horizontally) ---
    redX = redX + redSpeed;
    if (redX > width + 20) {
      redX = -20;
      redY = random(50, height - 50);
    }
    
    fill(255, 60, 60);
    ellipse(redX, redY, redSize, redSize);
    
    // --- COLLISION: GREEN ORB (Score point) ---
    if (dist(starX, starY, greenX, greenY) < 25) {
      score = score + 1;
      greenY = -20;
      greenX = random(50, width - 50);
      greenSpeed = greenSpeed + 0.3; // Get slightly faster!
    }
    
    // --- COLLISION: RED ORB (Lose life) ---
    if (dist(starX, starY, redX, redY) < 25) {
      lives = lives - 1;
      redX = -20; // Send red orb back across
      redY = random(50, height - 50);
      
      // Check if out of lives
      if (lives <= 0) {
        gameState = "gameover";
      }
    }
    
    // Check Win Condition
    if (score >= targetScore) {
      gameState = "win";
    }
    
    // --- UI DISPLAY ---
    fill(255);
    textSize(16);
    textAlign(LEFT, TOP);
    text("Score: " + score + " / " + targetScore, 20, 20);
    text("Lives: " + lives, 20, 45);
    text("Time Left: " + timeLeft + "s", 20, 70);
    textAlign(CENTER, CENTER);
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

// --- HELPER FUNCTION: Draws a proper star shape ---
function drawStar(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// --- MOUSE INPUT TO START / RESTART ---
function mousePressed() {
  if (gameState === "start" || gameState === "win" || gameState === "gameover") {
    score = 0;
    lives = 5;
    greenSpeed = 6;
    redSpeed = 4;
    
    greenX = random(50, width - 50);
    greenY = -20;
    redX = -20;
    redY = random(50, height - 50);
    
    startTime = millis();
    gameState = "game";
  }
}