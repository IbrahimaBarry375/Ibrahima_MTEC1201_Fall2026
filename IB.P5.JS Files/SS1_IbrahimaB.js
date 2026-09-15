//Ibrahima B.
//This is my making of a house

function setup() {
  createCanvas(500, 600);
    // Sky blue background
  background(135, 206, 435); 
 
  // Sun
  fill(255, 223, 0);
  noStroke();

  circle(420, 80, 60);

  // Grass
  fill(34, 139, 34);

  rect(0, 300, 400, 100);
  
  // House Body
  fill(222, 184, 135);
  stroke(0);
  strokeWeight(2);

  rect(100, 180, 200, 120);

  // Roof
  fill(165, 42, 42); 
  
  triangle(100, 180, 200, 100, 300, 180);

  // Door
  fill(128, 0, 0);

  rect(180, 230, 40, 70);

  // Doorknob
  fill(255, 215, 0);
  noStroke();

  circle(212, 265, 6);

  //Window
  stroke(0);
  fill(255, 255, 255);

  rect(125, 210, 35, 35);
}

function draw() {





}
