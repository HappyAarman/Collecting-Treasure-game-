var PLAY = 1;
var END = 0;
var gameState = 1;

var sword, swordImage, fruitGroup,fruit,fruit1,fruit2,fruit3,fruit4;

var enemyGroup,alien1,alien2,alien;

var score = 0;

var knifeSwooshSound,gameOver;

function preload(){
  
  swordImage = loadImage("sword.png");
  alien1=loadAnimation("alien1.png","alien2.png");
  
  fruit1=loadImage("fruit1.png");
  fruit2=loadImage("fruit2.png");
  fruit3=loadImage("fruit3.png");
  fruit4=loadImage("fruit4.png");
  gameOverImage = loadImage("gameover.png");
  knifeSwooshSound = loadSound("knifeSwooshSound.mp3");
  gameOver = loadSound("gameover.mp3");
}


function setup(){
  
createCanvas(550, 470);
  
  sword = createSprite(200,150,20,20);
  sword.addImage(swordImage);
  sword.scale = 0.7;
  
 fruitGroup = createGroup();
 enemyGroup = createGroup();
  
} 
function draw(){
  
  background(180);
  
  if(gameState === PLAY){
    
    
  fruits();
  Enemy();
    
  sword.y= World.mouseY;
  sword.x= World.mouseX;
  
    
  if(fruitGroup.isTouching(sword)){
    fruitGroup.destroyEach();
    
    knifeSwooshSound.play();
    score = score + 2;
  }
    
    else if(enemyGroup.isTouching(sword)){
       gameState = END;
       gameOver.play();
      
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
      
      sword.addImage(gameOverImage);
      sword.y= 200;
      sword.x= 200;
  }
  }

  
  drawSprites();

}

function fruits(){
  if(World.frameCount % 80===0){
    position = Math.round(random(1,2));
    fruit = createSprite(400,200,20,20);
    fruit.scale = 0.2;
    r = Math.round(random(1,4));
    if(r === 1){
      fruit.addImage(fruit1);
    } else if(r === 2){
      fruit.addImage(fruit2);
    } else if(r === 3){
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    } 
    
    fruit.y = Math.round(random(50,340))
    
    fruit.velocityX = -7;
    fruit.setLifeTime = 100;
    
    if(position==1)
    {
      fruit.x = 400;
      fruit.velocityX = -(7+(score/4)); 
    }
    else
    {
      if(position==2){
        fruit.x = 0;
      }
      fruit.velocityX = (7+(score/4));
    
      fruitGroup.add(fruit);
    }
  } 
}

function Enemy(){
  if(World.frameCount % 200 === 0){
    alien = createSprite(400,200,20,20);
    alien.addAnimation("moving",alien1);
    alien.y = Math.round(random(100,300));
    alien.velocityX = -(8+(score/10));
    alien.setLifetime = 50;
    
    enemyGroup.add(alien);
    }
}