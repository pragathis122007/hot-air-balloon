var balloon;
var database;
var backgroundImg;
var balloonImage2;
var height;

function preload(){
backgroundImg = loadImage("hotairballoon-01.png");
balloonImage1 = loadAnimation("hotairballoon-02.png","hotairballoon-03.png","hotairballoon-04.png")
}

function setup() {
  database = firebase.database();
  createCanvas(1000,600);
  balloon = createSprite(400, 200, 50, 50);
  balloon.shapeColor = "black";
  balloon.addAnimation("hot air balloon",balloonImage1);
  balloon.scale = 0.5;
  var balloonPosition = database.ref(`balloon/position`);
  balloonPosition.on("value",readHeight, showError);
}

function draw() {
  background(backgroundImg);  
  if(keyDown(LEFT_ARROW)){
  updateHeight(-10,0);
  balloon.addAnimation("hotAirBalloon",balloonImage1)
  balloon.scale=balloon.scale -0.01;
    //balloon.x = balloon.x -10;
    //changePosition(-1,0);
}
  if(keyDown(RIGHT_ARROW)){
  updateHeight(+10,0);
  balloon.addAnimation("hotAirBalloon",balloonImage1)
  balloon.scale=balloon.scale -0.01;
  // balloon.x = balloon.x +10;  
  //changePosition(1,0);
}
  if(keyDown(UP_ARROW)){
  updateHeight(0,-10);
  balloon.addAnimation("hotAirBalloon",balloonImage1)
  balloon.scale=balloon.scale -0.01;
  //balloon.y = balloon.y -10;  
  //changePosition(0,-1);
}
  if(keyDown(DOWN_ARROW)){
  updateHeight(0,+10);
  balloon.addAnimation("hotAirBalloon",balloonImage2)
  balloon.scale=balloon.scale -0.01;
  //balloon.y = balloon.y +10;  
  //changePosition(0,+1);
}
  drawSprites();
}

function updateHeight(x,y){
  database.ref(`balloon/position`).set({
    x : height.x + x ,
    y : height.y + y
  })
}

function readHeight(data){
  height = data.val();
  balloon.x = height.x;
  balloon.y = height.y;
}

function showError(){
  console.log("Error in writing to the database");
}