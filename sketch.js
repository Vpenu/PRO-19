var spaceImg, space;
var rocketImg, rocket;
var meteorImg, meteor, meteorsGroup;
var starImg, star, starsGroup;
var PLAY=1;
var END=0;
var gameState=1;
var starCollection = 0;

function preload(){
    spaceImg = loadImage("space.jpeg");
    rocketImg = loadImage("rocket.png");
    meteorImg = loadImage("meteor.jpeg");
    starImg = loadImage("star.png");
}

function setup() {
    createCanvas(600,600);
    space = createSprite(300,300);
    space.addImage("space",spaceImg);
    space.velocityY = 1;

    meteorsGroup = new Group();
    starsGroup = new Group();

    rocket = createSprite(300,285,50,50);
    rocket.addImage("rocket",rocketImg);
    rocket.scale = 0.8;
}

function draw() {
    background(200);

    textSize(50);
    fill(255);
    text("Score: "+ starCollection,900,30);
    
  if(gameState === PLAY){
    if(keyDown("right_arrow")){
        rocket.x = rocket.x + 5;
    }

    if(keyDown("left_arrow")){
        rocket.x = rocket.x - 5;
    }

    if(keyDown("up_arrow")){
        rocket.y = rocket.y - 5;
    }

    if(keyDown("down_arrow")){
        rocket.y = rocket.y + 5;
    }

    if(space.y>400){
        space.y = 300;
    }

//call star and meteor functions
    createMeteors();
    createStars();

    if (starsGroup.isTouching(rocket)){
        starsGroup.destroyEach();
        starCollection=starCollection+100;
    }
    if(meteorsGroup.isTouching(rocket)){
        gameState = END;
    }
  }

  if(gameState ===END){
    space.velocityY = 0;
    meteor.velocityY = 0;
    star.velocityY = 0;
    text("Game Over",200,200);
  }
 
 
drawSprites();

}

function createMeteors(){
    if(frameCount%240===0){
        meteor = createSprite(200,-50);
        meteor.addImage("meteor",meteorImg);
        meteor.addImage(meteorImg);
        meteor.x = Math.round(random(120,400));
        meteor.scale = 0.3;
        meteor.velocityY = 1;
        meteor.lifetime = 300;
        meteorsGroup.add(meteor);
    }
}

function createStars(){
    if(frameCount%240===0){
        star = createSprite(200,-50);
        star.addImage("star",starImg);
        star.addImage(starImg);
        star.x = Math.round(random(120,400));
        star.scale = 0.3;
        star.velocityY = 1;
        star.lifetime = 300;
        starsGroup.add(star);
    }
}