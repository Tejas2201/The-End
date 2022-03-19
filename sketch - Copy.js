var backImage,backgr;
var player, player_running;
var ground,ground_img;

var AmmoGroup, ammoImage;
var obstaclesGroup, obstacle_img;


var gameOver;
var score=0;


function preload(){
  backImage=loadImage("jungle.jpg");
  player_running = loadAnimation("commando_1.png","commando_2.png","commando_3.png","commando_4.png","commando_5.png","commando_6.png");
  
  

  ammoImage = loadImage("ammo.png");
  obstacle_img = loadImage("stone.png"); 
  
}

function setup() {
  createCanvas(800,400);
  
  backgr=createSprite(0,0,800,400);
  backgr.addImage(backImage);
  backgr.scale=1.5;
  backgr.x=backgr.width/2;
  backgr.velocityX=-4;
  
  player = createSprite(100,340,20,50);
  player.addAnimation("Running",player_running);
  player.scale = 0.5;
  

  ground = createSprite(400,350,800,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  ground.visible=false;
  
  AmmoGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
}

function draw() {
  
  background(255);
  
    
  if(ground.x<0) {
    ground.x=ground.width/2;
  }
  if(backgr.x<100){
    backgr.x=backgr.width/2;
  }
  
    if(AmmoGroup.isTouching(player)){
      AmmoGroup.destroyEach();
    score = score + 2;
    }
    switch(score){
        case 10: player.scale=0.12;
                break;
        case 20: player.scale=0.14;
                break;
        case 30: player.scale=0.16;
                break;
        case 40: player.scale=0.18;
                break;
        default: break;
    }
  
    if(keyDown("space") ) {
      player.velocityY = -12;
    }
    player.velocityY = player.velocityY + 0.8;
  
    player.collide(ground);
    spawnAmmo();
    spawnObstacles();
 
    if(obstaclesGroup.isTouching(player)){ 
        player.scale=0.01;
    }
  
  drawSprites();
  
  stroke("white");
  textSize(20);
  fill("white");
  text("Ammo: "+ score, 500,50);
}

function spawnAmmo() {
  if (frameCount % 80 === 0) {
    var ammo = createSprite(600,250,40,10);
    ammo.y = random(120,200);    
    ammo.addImage(ammoImage);
    ammo.scale = 0.2;
    ammo.velocityX = -5;
    ammo.lifetime = 300;
    player.depth = ammo.depth + 1;
    AmmoGroup.add(ammo);
  }
}

function spawnObstacles() {
  if(frameCount % 300 === 0) {
    var obstacle = createSprite(800,350,10,40);
    obstacle.velocityX = -6;
    obstacle.addImage(obstacle_img);
        
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
    
    obstaclesGroup.add(obstacle);
  }
}


  
