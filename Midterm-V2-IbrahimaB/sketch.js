// Game State variable: "start", "game", "win", or "gameover"
let gameState = "start";

// Game Stats
let score = 0;
let targetScore = 25;
let lives = 5;

// Timer variables (40 seconds)
let totalTime = 40;
let startTime = 0;

// Player (Blue Star) position
let starX, starY;

// --- MULTIPLE ORBS (Arrays) ---
let greenOrbs = []; // Green (+1 point) - Multiple falling vertically
let redOrbs = [];   // Red (-1 life) - Multiple moving horizontally

// --- SINGLE SPECIAL ORBS ---
let purpleOrb = { x: -50, y: -50, speed: 8 }; // Purple (++2 points) - Fast vertical
let orangeOrb = { x: -50, y: -50, speed: 2 }; // Orange (/ -3 points) - Slow horizontal

// --- SPARK PARTICLES ARRAY ---
let sparks = [];

// Background space stars array
let bgStars = [];

function setup() {
  createCanvas(800, 600);
  textAlign(CENTER, CENTER);
  
  // Create background space stars
  for (let i = 0; i < 60; i++) {
    bgStars.push({ x: random(width), y: random(height) });
  }
}

function draw() {
  // 1. START SCREEN (Blue Background)
  if (gameState === "start") {
    background(30, 100, 200);
    
    fill(255);
    textSize(28);
    text("COSMIC PULSE: ORB STORM", width / 2, height / 2 - 80);
    
    textSize(14);
    text("• Collect 25 points in 40 seconds!", width / 2, height / 2 - 35);
    text("• Green Orbs (+): +1 Point", width / 2, height / 2 - 10);
    text("• Purple Orbs (++): +2 Points (Fast!)", width / 2, height / 2 + 10);
    text("• Red Orbs (-): Lose 1 Life (5 Lives total)", width / 2, height / 2 + 30);
    text("• Orange Orbs (/): Lose 3 Points!", width / 2, height / 2 + 50);
    
    textSize(16);
    text("Click anywhere to start game", width / 2, height / 2 + 90);
  }
  
  // 2. MAIN GAME SCREEN (Black Background)
  else if (gameState === "game") {
    background(10, 10, 25);
    
    // Draw Space Stars
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
    
    // Draw Player Star
    fill(100, 200, 255);
    drawStar(starX, starY, 12, 25, 5);
    
    // --- 1. GREEN ORBS (+1 Point, Multiple) ---
    for (let i = 0; i < greenOrbs.length; i++) {
      let g = greenOrbs[i];
      g.y += g.speed;
      if (g.y > height + 20) {
        g.y = -20;
        g.x = random(50, width - 50);
      }
      
      // Draw Green Orb with '+'
      fill(50, 255, 100);
      ellipse(g.x, g.y, 26, 26);
      fill(0);
      textSize(16);
      text("+", g.x, g.y);
      
      // Touch Green Orb
      if (dist(starX, starY, g.x, g.y) < 25) {
        score += 1;
        createSparks(g.x, g.y, color(50, 255, 100)); // Green Sparks
        g.y = -20;
        g.x = random(50, width - 50);
      }
    }
    
    // --- 2. PURPLE ORB (++2 Points, Single, Fast) ---
    purpleOrb.y += purpleOrb.speed;
    if (purpleOrb.y > height + 20) {
      purpleOrb.y = -50;
      purpleOrb.x = random(50, width - 50);
    }
    fill(180, 70, 255);
    ellipse(purpleOrb.x, purpleOrb.y, 28, 28);
    fill(255);
    textSize(14);
    text("++", purpleOrb.x, purpleOrb.y);
    
    // Touch Purple Orb
    if (dist(starX, starY, purpleOrb.x, purpleOrb.y) < 26) {
      score += 2;
      createSparks(purpleOrb.x, purpleOrb.y, color(180, 70, 255)); // Purple Sparks
      purpleOrb.y = -50;
      purpleOrb.x = random(50, width - 50);
    }
    
    // --- 3. RED ORBS (-1 Life, Multiple, Horizontal) ---
    for (let i = 0; i < redOrbs.length; i++) {
      let r = redOrbs[i];
      r.x += r.speed;
      if (r.x > width + 20) {
        r.x = -20;
        r.y = random(50, height - 50);
      }
      
      // Draw Red Orb with '-'
      fill(255, 60, 60);
      ellipse(r.x, r.y, 26, 26);
      fill(255);
      textSize(18);
      text("-", r.x, r.y);
      
      // Touch Red Orb
      if (dist(starX, starY, r.x, r.y) < 25) {
        lives -= 1;
        createSparks(r.x, r.y, color(255, 60, 60)); // Red Sparks
        r.x = -20;
        r.y = random(50, height - 50);
        if (lives <= 0) gameState = "gameover";
      }
    }
    
    // --- 4. ORANGE ORB (-3 Points, Single, Slow Horizontal) ---
    orangeOrb.x += orangeOrb.speed;
    if (orangeOrb.x > width + 20) {
      orangeOrb.x = -50;
      orangeOrb.y = random(50, height - 50);
    }
    fill(255, 140, 0);
    ellipse(orangeOrb.x, orangeOrb.y, 26, 26);
    fill(0);
    textSize(16);
    text("/", orangeOrb.x, orangeOrb.y);
    
    // Touch Orange Orb
    if (dist(starX, starY, orangeOrb.x, orangeOrb.y) < 25) {
      score -= 3;
      if (score < 0) score = 0; // Don't let score drop below 0
      createSparks(orangeOrb.x, orangeOrb.y, color(255, 140, 0)); // Orange Sparks
      orangeOrb.x = -50;
      orangeOrb.y = random(50, height - 50);
    }
    
    // --- DRAW & UPDATE SPARKS ---
    for (let i = sparks.length - 1; i >= 0; i--) {
      let p = sparks[i];
      fill(p.c);
      ellipse(p.x, p.y, p.size, p.size);
      p.x += p.vx;
      p.y += p.vy;
      p.size -= 0.3; // Shrink over time
      if (p.size <= 0) {
        sparks.splice(i, 1); // Remove faded sparks
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
    background(40, 160, 80);
    fill(255);
    textSize(32);
    text("Congratulations, You Win!", width / 2, height / 2 - 30);
    textSize(16);
    text("Click anywhere to play again", width / 2, height / 2 + 30);
  }
  
  // 4. GAME OVER SCREEN (Red Background)
  else if (gameState === "gameover") {
    background(180, 40, 40);
    fill(255);
    textSize(32);
    text("Game Over", width / 2, height / 2 - 30);
    textSize(16);
    text("Click anywhere to play again", width / 2, height / 2 + 30);
  }
}

// --- HELPER FUNCTION: Make spark explosion ---
function createSparks(x, y, sparkColor) {
  for (let i = 0; i < 12; i++) {
    sparks.push({
      x: x,
      y: y,
      vx: random(-4, 4),
      vy: random(-4, 4),
      size: random(6, 10),
      c: sparkColor
    });
  }
}

// --- HELPER FUNCTION: Draw Star ---
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
    sparks = [];
    
    // Create 3 Green Orbs
    greenOrbs = [];
    for (let i = 0; i < 3; i++) {
      greenOrbs.push({
        x: random(50, width - 50),
        y: random(-200, -20),
        speed: random(5, 7)
      });
    }
    
    // Create 3 Red Orbs
    redOrbs = [];
    for (let i = 0; i < 3; i++) {
      redOrbs.push({
        x: random(-200, -20),
        y: random(50, height - 50),
        speed: random(3, 5)
      });
    }
    
    // Reset Special Orbs
    purpleOrb.x = random(50, width - 50);
    purpleOrb.y = -100;
    
    orangeOrb.x = -100;
    orangeOrb.y = random(50, height - 50);
    
    startTime = millis();
    gameState = "game";
  }
}