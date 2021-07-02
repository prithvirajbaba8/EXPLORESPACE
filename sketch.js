var PLAY=1;
var END=0;
var gameState=1;
var space , spaceImg;
var meteor , meteorImg , meteorGroup;
var astronoat , astronoatImg , astronoat_collided;
var invisibleline1,invisibleline2;
var score , star , Death;
var starImg , starGroup;
var gameOver,gameOverImg;
var restart,restartImg;



function preload(){
  spaceImg=loadImage("space.jpg");
  meteorImg=loadImage("meteor.png");
  astronoatImg=loadImage("astronate.png");
  starImg=loadImage("star.png");
  gameOverImg=loadImage("gameOver.png");
  restartImg=loadImage("restart.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight
)
   space=createSprite(width/2,5000);
   space.addImage(spaceImg);
  space.velocityY=1;
  space.scale=0.3
  
  astronoat=createSprite(100,700);
  astronoat.addImage(astronoatImg);
  astronoat.scale=0.2;
  
  invisibleline1=createSprite(-1,400,25,800);
  invisibleline1.visible=false;
  invisibleline2=createSprite(windowWidth,400,25,800)
  invisibleline2.visible=false;
  
  gameOver=createSprite(300,300);
  gameOver.addImage(gameOverImg);
  restart=createSprite(300,450);
  restart.addImage(restartImg);
  restart.scale=0.1
    
   
meteorGroup=new Group();
starGroup=new Group();  
  
  star=0;
  score=0;
  Death=0;
  astronoat.setCollider("rectangle",0,0,950,900);
  astronoat.debug = false;
  
}

function draw() {
 background(0);
 if(gameState===PLAY){ 
  if(space.y>550){
    space.y=450;
  }
   space.velocityY=1;
  score = score + Math.round(getFrameRate()/60);
  gameOver.visible=false;
   restart.visible=false;
  astronoat.x=mouseX;
  if(starGroup.isTouching(astronoat)){
    starGroup.destroyEach();
    star=star+1
  }
  
  spawnMeteor();
       
  astronoat.collide(invisibleline1);
  astronoat.collide(invisibleline2);
 if(astronoat.isTouching(meteorGroup)){
    gameState=END;
   Death=Death+1;
 }
 }
  if(gameState===END){
    gameOver.visible=true;
    space.velocityY=0
    restart.visible=true;
    astronoat.visible=false;
    meteorGroup.destroyEach();
    starGroup.destroyEach();
    score=0;
    star=0;
    reset();
  }
  
  
  
  
  drawSprites();
   textSize(20);
  fill(255);
  text("Star:" + star,500,50);
  text("Score:"+score,50,50);
   text("Death="+Death,250,50);
}
function spawnMeteor(){
  if(frameCount%180===0){
var meteor=createSprite(400,-50);
var star=createSprite(400,50);
    meteor.addImage(meteorImg);
    star.addImage(starImg);
    meteor.scale=0.2;
    star.scale=0.1;
    meteor.x=Math.round(random(50,windowWidth));
     star.x=Math.round(random(50,windowWidth))
    meteor.velocityY=8;
    star.velocityY=5;
    meteor.lifetime=350;
    star.lifetime=280;
    meteorGroup.add(meteor);
    starGroup.add(star);
    meteor.setCollider("rectangle",0,0,700,900);
    meteor.debug=false;
      
  }
  
}
function reset(){
 if(mousePressedOver(restart)){
 gameState=PLAY;
astronoat.visible=true;
   
 } 
  }