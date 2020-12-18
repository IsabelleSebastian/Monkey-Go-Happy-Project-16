
var monkey , monkey_running, monkeyCollide
var bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup
var survivalTime, ground

var gameState = "PLAY"


function preload(){
  
monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png"); 
  
monkeyCollide = loadAnimation("sprite_7.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(400,400);
  foodGroup = new Group();
  obstacleGroup = new Group();
  
  monkey = createSprite(50,320,15,20);
  monkey.addAnimation("run",monkey_running);
  monkey.addAnimation("hitObstacle",monkeyCollide);
  monkey.scale = 0.1;
  
  survivalTime = 0;
 
  ground = createSprite(200,350,405,5);
}


function draw() {
 background("white")
  
  fill("red");
  text("SURVIVAL TIME: " + survivalTime,130,30);
  if(gameState === "PLAY"){
  monkey.collide(ground);
  
  food();
  obstacles();
  
  if(keyDown("space") && monkey.y >= 310){
    monkey.velocityY = -18;
  }
   monkey.velocityY = monkey.velocityY + 0.8;

  survivalTime = Math.ceil(frameCount/frameRate())
  if(foodGroup.isTouching(monkey)){
    foodGroup.setLifetimeEach(0);
  }
  if(obstacleGroup.isTouching(monkey)){
    gameState = "END";
  }
  }
  else if(gameState === "END"){
    foodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    monkey.velocityX = 0;
    monkey.velocityY = 0;
    monkey.collide(ground);
    monkey.changeAnimation("hitObstacle",monkeyCollide);
    stroke("black");
    fill("white");
    textSize(20);
    text("GAMEOVER.YOU SUCK AT GAMING :)",10,150);
    foodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
  drawSprites();
}
function food(){
  if(frameCount % 80 === 0){
    banana = createSprite(370,150,10,7);
 banana.y = Math.round(random(100,230))
    banana.addImage(bananaImage);
  banana.scale = 0.1
    banana.lifetime = 405;
    banana.velocityX = -10;
  
  foodGroup.add(banana);
  }
}

function obstacles(){
  if(frameCount % 300 === 0){
  obstacle = createSprite(360,315,20,50);
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.2;
  obstacle.velocityX = -8;
  obstacle.lifetime = 405;
  obstacleGroup.add(obstacle);
  }
}



